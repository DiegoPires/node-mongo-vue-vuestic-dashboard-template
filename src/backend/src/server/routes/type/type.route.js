import express from 'express'
import validate from 'express-validation'
import typeCtrl from '../../controllers/type.controller'
import authCtrl from '../../controllers/auth.controller'
// import config from '../../config/env'

// const expressJwt = require('express-jwt');
// const authenticate = expressJwt({secret : config.passportSecret });

const router = express.Router() // eslint-disable-line new-cap

router.route('/').get(authCtrl.checkAuth, typeCtrl.list)

export default router
