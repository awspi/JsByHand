type MessageData = any; // 根据实际情况定义消息数据类型

class MockHelper {
  private messageHandlers: MessageHandler[];

  constructor() {
    this.messageHandlers = [];
    this.mock = new Mock();

    this.mock.onmessage = (data: MessageData) => {
      let fusing = false;
      const fused = (): void => {
        fusing = true;
      };

      for (let i = 0; i < this.messageHandlers.length; i++) {
        const handler = this.messageHandlers[i];
        try {
          // 传入消息数据和熔断函数
          handler.handle(data, fused);
        } catch (e) {
          if (handler && handler.reject) {
            handler.reject(e);
          }
          this.messageHandlers.splice(i, 1);
          i--;
        }

        if (fusing) {
          this.messageHandlers.splice(i, 1);
          break;
        }
      }
    };
  }

  private mock: Mock; // 根据实际情况定义 Mock 类型

  send(data: MessageData, handler: (data: MessageData, fused: () => void) => any): Promise<any> {
    return new Promise((resolve, reject) => {
      const messageHandler = new MessageHandler();
      messageHandler.callback = handler;
      messageHandler.resolve = resolve;
      messageHandler.reject = reject;
      messageHandler.data = data;
      // 超时处理
      messageHandler.timer = setTimeout(() => {
        if (!messageHandler.reject) return
        messageHandler.reject(new Error('timeout'));
        const index = this.messageHandlers.indexOf(messageHandler);
        if (index !== -1) {
          this.messageHandlers.splice(index, 1);
        }
      }, 3000);

      this.messageHandlers.push(messageHandler);
      this.mock.send(data);
    });
  }
}

class MessageHandler {
  callback: ((data: MessageData, fused: () => void) => any) | null;
  timer: NodeJS.Timeout | null;
  resolve: ((value?: any) => void) | null;
  reject: ((reason?: any) => void) | null;
  data: MessageData | null;

  constructor() {
    this.callback = null;
    this.timer = null;
    this.resolve = null;
    this.reject = null;
    this.data = null;
  }

  handle(data: MessageData, fused: () => void): void {
    let result = {
      sendData: this.data,
      receiveData: data,
      handleData: null,
    };

    const _fused = (): void => {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      fused();

      if (this.resolve) {
        Promise.resolve().then(() => {
          this && this.resolve && this.resolve(result);
          this.resolve = null;
        });
      }
    };

    if (typeof this.callback === 'function') {
      try {
        result.handleData = this.callback(data, _fused);
      } catch (e) {
        if (this.reject) {
          this.reject(e);
        }
        throw e;
      }
    }
  }
}
