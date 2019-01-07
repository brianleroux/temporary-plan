let tiny = require('tiny-json-http')

exports.handler = async function http(req) {
  
  // trade the code for an access token
  let result = await tiny.post({
    url: 'https://github.com/login/oauth/access_token', 
    headers: {Accept: 'application/json'},
    data: {
      code: req.query.code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      redirect_uri: process.env.GITHUB_REDIRECT,
    }
  })
  
  let access_token = result.body.access_token
  
  // use the access token to get the user account
  let account = await tiny.get({
    url: `https://api.github.com/user?access_token=${access_token}`,
    headers: {Accept: 'application/json'},
  })
  
  return {
    type: 'text/html; charset=utf8',
    body: '<pre>'+JSON.stringify(account, null ,2)+'</pre>'
  }
}
