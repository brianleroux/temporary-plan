let begin = require('@architect/functions')

function render(session) { 
  let slack = `<li><a href="https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=${process.env.SLACK_CLIENT_ID}"><img alt="Sign in with Slack" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcset="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" /></a>`
  let login = `<li><a href=https://github.com/login/oauth/authorize?redirect_uri=${process.env.GITHUB_REDIRECT}&client_id=${process.env.GITHUB_CLIENT_ID}>login with github</a>`
  let logout = `<a href=/logout>logout</a>`
  return `
<!doctype html>
<html lang=en>
  <head>
    <meta charset=utf-8>
    <title>Tmp Plan</title>
    <link href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" rel="icon" type="image/x-icon">
  </head>
  <body>
${session.hasOwnProperty('account')? logout : login + slack}
<pre>${JSON.stringify(session, null, 2)}</pre>
  </body>
</html>`
}

exports.handler = async function http(req) {
  let session = await begin.http.session.read(req)
  return {
    type: 'text/html; charset=utf8',
    body: render(session)
  }
}
