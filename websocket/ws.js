
const { EventEmitter } = require('events')
const crypto = require('crypto')
const http = require('http')

const OPCODES = {
  CONTINUE: 0,
  TEXT: 1, // 文本
  BINARY: 2, // 二进制
  CLOSE: 8,
  PING: 9,
  PONG: 10,
};

class TinyWebSocket extends EventEmitter {
  constructor(options) {
    super(options)
    const server = http.createServer()
    server.listen(options.port || 8080)
    // 当 upgrade 事件发生，
    // 收到 Connection: upgrade 的 header 的时候，返回切换协议的 header
    //? 对 sec-websocket-key进行处理
    server.on('upgrade', (req, socket) => {
      this.socket = socket
      socket.setKeepAlive(true)
      //? 拿到 socket，返回header
      const resHeader = [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        'Sec-WebSocket-Accept: ' + hashKey(req.headers['sec-websocket-key']),
        '',
        ''//* resHeader最后需要以\r\n结尾
      ].join('\r\n')

      socket.write(resHeader)

      socket.on('data', (data) => this.processData(data))
      socket.on('close', (err) => this.emit('close'))
    })
  }
  handleRealData(opcode, realDataBuffer) {
    // 只处理文本和二进制
    switch (opcode) {
      case OPCODES.TEXT:
        this.emit('data', realDataBuffer.toString('utf-8'))
        break
      case OPCODES.BINARY:
        this.emit('data', bufferData)
        break
      default:
        this.emit('close')
        break
    }
  }

  //? 获取data
  processData(bufferData) {
    //* 获取 opcode
    const byte1 = bufferData.readUInt8(0)// 第一个字节
    let opcode = byte1 & 0x0f
    //* 获取 MASK
    const byte2 = bufferData.readUInt8(1)// 第二个字节
    const str = byte2.toString(2)// 转成二进制字符串
    const MASK = str[0]// 第一位就是MASK
    //* 获取 payload长度
    let curByteIndex = 2//当前处理的字节的下标

    let payloadLength = parseInt(str.substring(1), 2)// 字符串的剩下7位转为int就是payload长度(<=125)
    if (payloadLength === 126) {
      // 从第三个字节读16位
      payloadLength = bufferData.readUInt16BE(2)
      curByteIndex += 2
    } else if (payloadLength === 127) {
      // 从第三个字节读64位
      payloadLength = bufferData.readUInt64BE(2)
      curByteIndex += 8
    }
    // 解密后的payloadData(依然是二进制)
    let realData = null
    if (MASK) {
      //* 获取 maskKey
      // payload长度 往后读 4 个字节，就是 mask-key
      const maskKey = bufferData.slice(curByteIndex, curByteIndex + 4)
      curByteIndex += 4
      //* 获取 payloadData
      //maskKey往后就是payload 用payloadLength截取
      const payloadData = bufferData.slice(curByteIndex, curByteIndex + payloadLength)
      // 使用payload解密
      realData = handleMask(maskKey, payloadData)
    }
    this.handleRealData(opcode, realData)
  }
  send(data) {
    let opcode
    let buffer
    if (Buffer.isBuffer(data)) {//判断是否是Buffer(二进制)
      opcode = OPCODES.BINARY
      buffer = data
    } else if (typeof data === 'string') {
      opcode = OPCODES.TEXT
      buffer = Buffer.from(data, 'utf8') //从其他格式转为buffer
    } else {
      console.error('不支持的类型');
    }
    this.doSend(opcode, buffer)
  }
  doSend(opcode, buffer) {
    this.socket.write(encodeMessage(opcode, buffer))
  }
}
/**
 * 生成 Sec-WebSocket-Accept
 * @param {String} key 
 * @returns  Sec-WebSocket-Accept
 */
function hashKey(key) {
  const sha1 = crypto.createHash('sha1');
  sha1.update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
  return sha1.digest('base64');
}
/**
 * 解密payload
 * @param {Buffer} maskKey 4个字节的maskKey
 * @param {Buffer} data payloadData
 * @returns  解密后的二进制payload
 */
function handleMask(maskKey, data) {
  // 将 每个字节的maskKey与 数据的每一位 按位异或
  const payload = Buffer.alloc(data.length)
  for (let i = 0; i < data.length; i++) {
    payload[i] = maskKey[i % 4] ^ data[i] //maskKey[0123]
  }
  return payload
}
/**
 * 对要发送的数据进行编码
 * @param {*} opcode 
 * @param {Buffer} payload 需要发送的数据
 * @returns 处理好的发生帧
 */
function encodeMessage(opcode, payload) {
  //只处理数据长度小于 125的情况
  let bufferData = Buffer.alloc(payload.length + 2 + 0)
  //? 按位或|
  let byte1 = parseInt('10000000', 2) | opcode// 按位或 设置 FIN 为 1
  let byte2 = payload.length //payload的长度
  //第一个字节 FIN 1
  bufferData.writeUInt8(byte1, 0)
  //服务端给客户端回消息不需要 mask 第二个字节就是 payload 长度
  bufferData.writeUInt8(byte2, 1)
  //第三个字节开始就是payload数据
  payload.copy(bufferData, 2);//copy
  return bufferData
}

module.exports = TinyWebSocket
