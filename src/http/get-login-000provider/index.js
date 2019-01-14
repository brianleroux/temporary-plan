let begin = require('@architect/functions')
let github = require('./github')
let slack = require('./slack')

exports.handler = async function http(req) {
  
  let providers = {github, slack}
  let provider = providers[req.params.provider]
  let account = await provider(req)
  let session = await begin.http.session.read(req)
  session.account = account
  
  // write it to the session
  let cookie = await begin.http.session.write(session)
  
  return {
    cookie,
    status: 302,
    location: '/'
  }
}
