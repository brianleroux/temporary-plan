exports.handler = async function http(req) {
  return {
    type: 'text/html; charset=utf8',
    body: '<pre>'+JSON.stringify(req)
  }
}
