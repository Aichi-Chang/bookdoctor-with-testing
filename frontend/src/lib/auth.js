import jwt from 'jsonwebtoken'

class Auth {
  static setToken(token) {
    localStorage.setItem('token', token)
  }

  static getToken() {
    return localStorage.getItem('token')
  }

  static setUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }
 
  static getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  static logOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  //in order for users to access the content, they must sign in:
  static getPayload() {
    return jwt.decode(this.getToken())
  }

  static isAuthenticated() {
    const payload = this.getPayload()
    const now = Math.round(Date.now() / 1000)
    return payload && now < payload.exp
  }
}

export default Auth

/* Alternatively we could have used an object, like so:

export default {
  setToken(token) {
    localStorage.setItem('token', token)
  },
  getToken() {
    return localStorage.getItem('token')
  }
}
*/