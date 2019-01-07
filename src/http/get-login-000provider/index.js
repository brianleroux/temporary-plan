let begin = require('@architect/functions')
let tiny = require('tiny-json-http')
let github = require('./github')
let slack = require('./slack')

exports.handler = async function http(req) {
  
  let providers = {github, slack}
  let provider = providers[req.params.provider]
  let account = await provider(req)
  
  // write it to the session
  let cookie = await begin.http.session.write({account})
  
  return {
    cookie,
    status: 302,
    location: '/'
  }
}
