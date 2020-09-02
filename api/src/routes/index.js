const { Router } = require('express')
// importa todas las rutas
// const productRouter = require('./product.js')
// const categoryRouter = require('./category.js')
// const testRouter = require('./test.js')
// const userRouter = require('./user.js')
// const imageRouter = require('./image.js')
// const orderRouter = require('./order.js')
// const adminRouter = require('./admin.js')
// const userAdminRouter = require("./userAdmin")
const searchRouter = require("./search")


const router = Router()

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
// router.use('/products', productRouter)
router.use('/search', searchRouter)
// router.use('/category', categoryRouter)
// router.use('/user', userRouter)
// router.use('/test', testRouter)
// router.use('/images', imageRouter)
// router.use('/orders', orderRouter)
// router.use('/admin', adminRouter)
// router.use("/userAdmin", userAdminRouter)




module.exports = router
