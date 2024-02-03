import { Router } from 'express'
import { Category } from '../../models/Category.js'
import { Product } from '../../models/Product.js'

export const categoryRoutes = Router()

categoryRoutes.get('/', async (req, res) => {
  try {
    
    const categoryData = await Category.findAll({include: [
      {
        model: Product,
        attributes: ['product_name'],
      },
    ]})

    res.status(200).json(categoryData)

  } catch (err) {

    res.status(500).json(err.message)

  }
})

categoryRoutes.get('/:id', async (req, res) => {
  try {
    
    const categoryData = await Category.findByPk(req.params.id, {include: [
      {
        model: Product,
        attributes: ['product_name'],
      },
    ]})

    res.status(200).json(categoryData)

  } catch (err) {

    res.status(500).json(err.message)

  }
})

categoryRoutes.post('/', (req, res) => {
  // create a new category
})

categoryRoutes.put('/:id', (req, res) => {
  // update a category by its `id` value
})

categoryRoutes.delete('/:id', (req, res) => {
  // delete a category by its `id` value
})

