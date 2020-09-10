const server = require('express').Router()
const { Op } = require('sequelize')
const { Order, Product, User, Order_product} = require('../db.js')

// Si el req tiene un query Search filtra las ordenes que coincidan con el estado
// Valores validos para el state: 'carrito', 'creada', 'cancelada', 'procesando', 'completa'


server.get('/admin', (req, res) => {
    if (req.query.search){
        Order.findAll({
            where: {
                
                state: req.query.search 
            },
            include: [{
                model: Product
              },
              {
                model: User,
              }]
        }).then( orders => res.send(orders))
    } else {
        Order.findAll()
        .then( orders => res.send(orders) )
    }
})

// Busca el producto por ID y devulve el Producto con sus categorias
server.get('/:id', (req, res) => {
	Order.findOne({
         where: { id: req.params.id }, 
         include: [{
            model: Product
          },
          {
            model: User,
          }]
        })
		.then((order) => {
			if (!order) return res.status(404).send('Id no válido')
			res.status(200).json(order)
		})
		.catch((err) => res.status(404).send(err))
})



// crear orden completa
server.post('/:userId', async (req, res) => {
  const {state, productId, price, quantity} = req.body;
	const order = await Order.findOrCreate({
		where: {
				userId: req.params.userId,
				state
				}
	})
	 await Order_product.findOrCreate({
		where: {
			orderId: order[0].id,
			productId: productId,
            price: price,
            quantity: quantity
		}
    })

	const product = await Order.findOne({
		where: { userId: req.params.userId, state },
		include: [Product],
	})

	res.send(product)
})


server.get('/:userId/completa', (req, res) => {
	Order.findAll({
		where: { userId: req.params.userId, state: 'completa' },
		include: { model: Product },
  }).then((order) => res.send(order))
  .catch(() => res.status(400).send("error"))
})


module.exports = server