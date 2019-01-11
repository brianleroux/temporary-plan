@app
meadow-x0f

@http
get /
get /login/:provider
get /logout
get /t

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
