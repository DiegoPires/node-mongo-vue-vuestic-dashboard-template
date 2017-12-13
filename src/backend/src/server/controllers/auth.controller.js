import httpStatus from 'http-status'
import passport from 'passport'
import APIError from '../helpers/APIError'
import User from '../models/user.model'
import config from '../../config/env'

const crypto = require('crypto')
const jwt = require('jsonwebtoken')
/**
 * Returns passport login response (cookie) when valid username and password is provided
 * @param req
 * @param res
 * @returns {*}
 */
function login(req, res) {
  //return res.json(req.user)

  const authFn = passport.authenticate('local', (err, user, info) => {
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err)
      return
    }

    // If a user is found
    if (user) {
      const token = user.generateJwt()
      res.status(200).json({ token })
    } else {
      // If user is not found
      res.status(401).json(info)
    }
  })
  authFn(req, res)
}

/**
 * Returns User when succesfully registered
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function register(req, res, next) {
  User.register(new User({ email: req.body.email }), req.body.password, (err, user) => {
    if (err) {
      const error = new APIError('Authentication error' + err, httpStatus.INTERNAL_SERVER_ERROR)
      next(error)
    }

    passport.authenticate('local')(req, res, () => {
      //res.json({ user })
      const token = user.generateJwt()
      res.status(200).json({ token })
    })
  })
}

/**
 * Returns User if user session is still open
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function me(req, res, next) {
  if (!req.user) {
    const error = new APIError('Authentication error', httpStatus.UNAUTHORIZED)
    next(error)
  }

  res.json(req.user)
}

/**
 * Middleware to check user is authorised to access endpoint.
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function checkAuth(req, res, next) {
  // if (!req.user) {
  //   const error = new APIError('Authentication error', httpStatus.UNAUTHORIZED)
  //   next(error)
  // }

  const r = req
  // check header or url parameters or post parameters for token
  // const token = req.body.token || req.query.token || req.headers['x-access-token'];
  const token = req.body.token || req.query.token || req.headers.authorization
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.passportSecret, (err, decoded) => {
      if (err) {
        // res.json({ success: false, message: 'Failed to authenticate token.' });
        return res.status(401).send({
          success: false,
          message: 'Failed to authenticate token.',
        })
      } else {
        // if everything is good, save to request for use in other routes
        r.decoded = decoded
        next()
        // console.log(decoded);
      }
      // return {};
    })
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.',
    })
  }
}

export default { login, register, me, checkAuth } //
