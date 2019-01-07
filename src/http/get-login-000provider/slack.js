let tiny = require('tiny-json-http')

module.exports = async function slack(req) {
  
  // trade the code for an access token
  let result = await tiny.get({
    url: `https://slack.com/api/oauth.access`
    data: {
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      code: req.query.code,
    }
  })
  
  let token = result.body.access_token
  
  // get the user account 
  let account = await tiny.get({
    url: 'https://slack.com/api/users.identity'
    data: {token}
  })
  
  return {token, ...account.body.user}
}
