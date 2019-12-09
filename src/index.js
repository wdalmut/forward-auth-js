const request = require('request')

function authenticate({endpoint, auth_header}) {
  return new Promise((resolve, reject) => {
    request({
      url: endpoint,
      headers: {
        authorization: auth_header,
        'content-type': 'application/json',
        'accept': 'application/json',
      },
      json: true,
    }, (err, response) => {
      if (err) {
        return reject({message: err, err})
      }

      if (response.statusCode >=300) {
        return reject({message: response.body})
      }

      return resolve(response.body)
    })
  })
}

module.exports = (endpoint = 'http://localhost/v1/me') => (req) => {
  return authenticate({endpoint, auth_header: req.headers.authorization})
}

