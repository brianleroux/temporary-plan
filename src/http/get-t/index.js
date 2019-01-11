exports.handler = async function http(req) {
  console.log(req)
  return {
    type: 'applicatoin/json; charset=utf8',
    body: JSON.stringify({
    "text": "It's 80 degrees right now.",
    "attachments": [
        {
            "text":"Partly cloudy today and tomorrow"
        }
      ]
    })
  }
}
