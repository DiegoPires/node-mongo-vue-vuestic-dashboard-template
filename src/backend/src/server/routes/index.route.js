import express from 'express'
import userRoutes from './user/user.route'
import authRoutes from './auth/auth.route'
import saleRoutes from './sale/sale.route'
import typeRoutes from './type/type.route'

const router = express.Router() // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'))

// define api routes
router.use('/users', userRoutes)
router.use('/auth', authRoutes)
router.use('/sales', saleRoutes)
router.use('/types', typeRoutes)

export default router
