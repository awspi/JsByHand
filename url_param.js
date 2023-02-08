const url =
  "https://www.baidu.com/s?wd=%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%BC%80%E9%A2%98%E6%8A%A5%E5%91%8A&rsv_spt=1&rsv_iqid=0xa3f5eb180001d272&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_dl=ib&rsv_sug3=2&rsv_n=2";

const getParams = (url) => {
  const obj = {}
  const params = url.split('?')[1]
  const paramsArr = params.split('&')
  for (const param of paramsArr) {
    const arr = param.split('=')
    obj[arr[0]] = arr[1]
  }
  return obj
}

console.log(getParams(url));
