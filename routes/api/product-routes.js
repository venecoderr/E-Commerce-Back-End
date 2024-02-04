import { Router } from 'express'
import { Category } from '../../models/Category.js'
import { Product } from '../../models/Product.js'
import { Tag } from '../../models/Tag.js'
import { ProductTag } from '../../models/ProductTag.js'

export const productRoutes = Router()

productRoutes.get('/', async (req, res) => {
  //Gets all products
  try {
    const productData = await Product.findAll({include: [
      {
        model: Category,
        attributes: ['category_name'],
      },
      {
        model: Tag,
        attributes: ['tag_name'],
        through: { attributes: [] },
        as: 'tags',
      },
    ]})

    res.status(200).json(productData)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

productRoutes.get('/:id', async (req, res) => {
  //Gets one product by ID
  try {
    const productData = await Product.findByPk(req.params.id, {include: [
      {
        model: Category,
        attributes: ['category_name'],
      },
      {
        model: Tag,
        attributes: ['tag_name'],
        through: { attributes: [] },
        as: 'tags',
      },
    ]})

    if (!productData) {
      res.status(404).json({ message: 'No Product found with this id!' });
      return;
    }

    res.status(200).json(productData)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

productRoutes.post('/', (req, res) => {
  // create new product
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          }
        })
        return ProductTag.bulkCreate(productTagIdArr)
      }
      
      res.status(200).json(product)
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err)
      res.status(400).json(err)
    })
})

// update product
productRoutes.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id)
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            }
          })

            // figure out which ones to remove
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id)
                  // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ])
        })
      }

      return res.json(product)
    })
    .catch((err) => {
      // console.log(err)
      res.status(400).json(err)
    })
})

productRoutes.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    await ProductTag.destroy({
      where: {
        product_id: req.params.id
      }
    })
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id
      }
    }) 

    if (!deletedProduct) {
      res.status(404).json({ message: 'No Product found with this id!' });
      return;
    }

    res.status(200).json(`${deletedProduct} product deleted`)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

