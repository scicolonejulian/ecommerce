const server = require('express').Router()

const { Category, Product } = require('../db.js')

// Busca la categoria por su Nombre y la devuelve con Todos sus Productos asociados
server.get('/:name', (req, res) => {
	const capName =
		req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1)

	Category.findOne({
		include: [Product],
		where: {
			name: capName,
		},
	})
		.then((cat) =>
			!cat
				? res.status(404).send('No se encontro la categoria')
				: res.send(cat)
		)
		.catch((err) => res.status(404).send(err))
})

// Trae TODAS las categorias
server.get('/', (req, res) => {
	Category.findAll().then((categories) => res.send(categories))
})

// Crea una nueva categoria con su Nombre Capitalizado
server.post('/', (req, res) => {
	const { name, description } = req.body

	if (!name || !description) {
		res.status(400).send('Debe enviar los campos requeridos')
		return
	}
	const capName = name.charAt(0).toUpperCase() + name.slice(1)
	Category.create({
		name: capName,
		description,
	}).then((cat) => res.status(201).send('Categoria creada'))
})

// Actualiza la categoria segun su ID
server.put('/:id', (req, res) => {
	const { name, description } = req.body
	const capName = name.charAt(0).toUpperCase() + name.slice(1)
	Category.findByPk(req.params.id)
		.then((cat) => {
			cat.name = capName || cat.name
			cat.description = description || cat.description

			cat.save().then((cat) => {
				res.status(201).send(cat)
			})
		})
		.catch((err) => res.status(400).send('Id no valido'))
})

// Borra la categoria en base a su ID
server.delete('/:id', (req, res) => {
	Category.findByPk(req.params.id)
		.then((cat) => {
			cat.destroy()
			res.status(200).send('Categoria eliminada')
		})
		.catch((err) => res.status(404).send('Categoria NO encontrada'))
})

module.exports = server