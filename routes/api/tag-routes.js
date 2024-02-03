import { Router } from 'express'
import { Product } from '../../models/Product.js'
import { Tag } from '../../models/Tag.js'
import { ProductTag } from '../../models/ProductTag.js'

export const tagRoutes = Router()

tagRoutes.get('/', async (req, res) => {
  try {
    
    const tagData = await ProductTag.findAll({include: [
      {
        model: Tag,
        attributes: ['tag_name'],
      },
      {
        model: Product,
        attributes: ['product_name'],
      },
    ]})

    res.status(200).json(tagData)

  } catch (err) {

    res.status(500).json(err.message)

  }
})

tagRoutes.get('/:id', async (req, res) => {
  try {
    
    const tagData = await ProductTag.findByPk(req.params.id, {include: [
      {
        model: Tag,
        attributes: ['tag_name'],
      },
      {
        model: Product,
        attributes: ['product_name'],
      },
    ]})

    res.status(200).json(tagData)

  } catch (err) {

    res.status(500).json(err.message)

  }
})

tagRoutes.post('/', (req, res) => {
  // create a new tag
})

tagRoutes.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
})

tagRoutes.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
})
