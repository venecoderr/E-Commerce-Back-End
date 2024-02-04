import { Router } from 'express'
import { Category } from '../../models/Category.js'
import { Product } from '../../models/Product.js'
import { ProductTag } from '../../models/ProductTag.js'

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

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData)

  } catch (err) {

    res.status(500).json(err.message)

  }
})

categoryRoutes.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((newCat) => {
    res.status(200).json(newCat)
  })
  .catch((err) => {
    console.log(err)
    res.status(400).json(err)
  })
})

categoryRoutes.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    })
    
    if (!updatedCategory) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(updatedCategory)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  } 
})

categoryRoutes.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    await Product.destroy({
      where: {
        category_id: req.params.id
      }
    }) 
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!deletedCategory) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(`${deletedCategory} product deleted`)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

