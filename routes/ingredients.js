const express = require('express')
const Ingredient = require('../models/ingredient')
const router = express.Router()
const crypto = require('crypto')
// GET all ingredients
router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.scan().exec()
    if (!ingredients) {
      return res.status(404).json({ error: 'Ingredients not found' })
    }
    res.status(200).json(ingredients)
  } catch (error) {
    res.status(500).json({ error })
  }
})

// GET a specific ingredient by id
router.get('/:id', async (req, res) => {
  try {
    const ingredient = await Ingredient.get(req.params.id)
    if (!ingredient) {
      return res.status(404).json({ error: 'Ingredient not found' })
    }
    res.status(200).json(ingredient)
  } catch (error) {
    res.status(500).json({ error })
  }
})

// POST a new ingredient
router.post('/', async (req, res) => {
  try {
    let randomID = crypto.randomUUID()
    let existsInDB = await Ingredient.get(randomID)
    while (existsInDB) {
      randomID = crypto.randomUUID()
      existsInDB = await Ingredient.get(randomID)
    }
    req.body.id = randomID
    const ingredient = await Ingredient.create(req.body)
    res.status(200).json(ingredient)
  } catch (error) {
    res.status(500).json({ error })
  }
})

// PUT an existing ingredient
router.put('/:id', async (req, res) => {
  try {
    const ingredient = await Ingredient.update(req.params.id, req.body)
    if (!ingredient) {
      return res.status(404).json({ error: 'Ingredient not found' })
    }
    res.status(200).json(ingredient)
  } catch (error) {
    res.status(500).json({ error })
  }
})

// DELETE an ingredient
router.delete('/:id', async (req, res) => {
  try {
    const IngredientToDelete = await Ingredient.get(req.body.id)
    if (IngredientToDelete == null) {
      return res.status(404).json({ error: 'Does not exists' })
    } else {
      const ingredient = await Ingredient.delete(req.params.id)
      res.status(200).json(ingredient)
    }
  } catch (error) {
    res.status(500).json({ error })
  }
})

//------------------ CSV EXPORT SUMMARY  ---------------------
router.get('/export/ingr', async function (req, res) {


  const csvFormat = [['Id', 'Name', 'Measurement Type']]
  try {
    const list = await Ingredient.scan().exec()
    if (list != null) {
      list.forEach(element => {
        const record = [element.id, element.name, element.measurementType];
        csvFormat.push(record);
      })
      let csvContent = ''
      csvFormat.forEach(row => {
        csvContent += row.join(',') + '\n'
      })
      res.status(200)
      res.attachment('Ingrediants Summary.csv').send(csvContent)
    } else {
      return res.status(404).json({ error: "No Ingrediants Found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});
module.exports = router
