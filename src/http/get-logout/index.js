let begin = require('@architect/functions')

exports.handler = async function http() {
  let status = 302
  let location = '/'
  let cookie = await begin.http.session.write({})
  return {
    status, location, cookie
  }
}
