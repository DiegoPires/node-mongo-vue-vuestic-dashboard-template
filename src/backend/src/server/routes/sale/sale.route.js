import express from 'express'
import validate from 'express-validation'
import paramValidation from './sale.validations'
import saleCtrl from '../../controllers/sale.controller'
import authCtrl from '../../controllers/auth.controller'
import statsCtrl from '../../controllers/stats.controller'

const router = express.Router() // eslint-disable-line new-cap

router
  .route('/')
  .get(authCtrl.checkAuth, saleCtrl.list)
  .post(authCtrl.checkAuth, validate(paramValidation.insert), saleCtrl.insert)

router.route('/bulk').post(authCtrl.checkAuth, saleCtrl.bulkInsert)

router.route('/stats').get(authCtrl.checkAuth, statsCtrl.getStats)

export default router
