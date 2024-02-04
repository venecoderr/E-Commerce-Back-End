import { Router } from 'express'
import { Tag } from '../../models/Tag.js'
import { ProductTag } from '../../models/ProductTag.js'

export const tagRoutes = Router()

tagRoutes.get('/', async (req, res) => {
  //Gets all tags
  try {
    const tagData = await Tag.findAll()

    res.status(200).json(tagData)

  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

tagRoutes.get('/:id', async (req, res) => {
  //Gets one Tag by ID
  try {
    const tagData = await Tag.findByPk(req.params.id)

    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }

    res.status(200).json(tagData)

  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

tagRoutes.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body)

    res.status(200).json(newTag)

  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

tagRoutes.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    })

    if (!updatedTag) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }
    
    res.status(200).json(updatedTag)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }  
})

tagRoutes.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTagPairs = await ProductTag.destroy({
      where: {
        tag_id: req.params.id
      }
    })

    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!deletedTag) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }

    res.status(200).json(`${deletedTag} Tag deleted and ${deleteTagPairs} products updated`)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})
