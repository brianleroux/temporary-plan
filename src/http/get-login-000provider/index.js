let tiny = require('tiny-json-http')

exports.handler = async function http(req) {
  let result = await tiny.post({
    url: 'https://github.com/login/oauth/access_token', 
    data: {
      code: req.query.code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      redirect_uri: process.env.GITHUB_REDIRECT,
    }
  })
  return {
    type: 'text/html; charset=utf8',
    body: '<pre>'+JSON.stringify(result)
  }
}
