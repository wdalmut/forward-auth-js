const nock = require('nock')
const forward = require('../src')

describe("Forward", () => {
  it ("should forward my auth successfully", (done) => {
    const scope = nock('https://user.somewhere.walterdalmut.com', {
        reqheaders: {
          authorization: 'Bearer deadbeef',
          'content-type': 'application/json',
          'accept': 'application/json',
        },
      })
      .get('/v1/me')
      .reply(200, {
        id: 1,
        role: "SUPERADMIN"
      })

    forward('https://user.somewhere.walterdalmut.com/v1/me')({ headers: { authorization: 'Bearer deadbeef' } })
      .then(data => {
        expect(data.id).toBe(1)
        expect(data.role).toBe("SUPERADMIN")
        done()
      })
      .catch((err) => {
        throw new Error(err)
        done()
      })
  })

  it ("should fail on forward my auth wrongly", (done) => {
    const scope = nock('https://user.somewhere.walterdalmut.com', {
        reqheaders: {
          authorization: 'Bearer deadbeef',
          'content-type': 'application/json',
          'accept': 'application/json',
        },
      })
      .get('/v1/me')
      .reply(401, {
        err: "Error message here"
      })

    forward('https://user.somewhere.walterdalmut.com/v1/me')({ headers: { authorization: 'Bearer deadbeef' } })
      .then(data => {
        console.log(data)
        done(new Error("Impossible good condition"))
      })
      .catch((err) => {
        done()
      })
  })
})
