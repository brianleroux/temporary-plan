// Learn how to use secure sessions, middleware, and more:
// https://docs.begin.com/en/functions/http/

let begin = require('@architect/functions')

function render(session) { 
  return `
<!doctype html>
<html lang=en>
  <head>
    <meta charset=utf-8>
    <title>Tmp Plan</title>
    <link href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" rel="icon" type="image/x-icon">
  </head>
  <body>

<a href=https://github.com/login/oauth/authorize?redirect_url=${process.env.GITHUB_REDIRECT}&client_id=${process.env.GITHUB_CLIENT_ID}>login with github</a>

<pre>${JSON.stringify(session, null, 2)}</pre>
  </body>
</html>
`
}

exports.handler = async function http(req) {
  let session = await begin.http.session.read(req)
  return {
    type: 'text/html; charset=utf8',
    body: render(session)
  }
}
