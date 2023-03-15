const express = require('express')
const MealPlan = require('../models/mealPlan')
const Recipe = require("../models/recipes")
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
        console.log(element)
        const record = [element.id, element.name, element.measurementType];
        csvFormat.push(record);
      })
      let csvContent = ''
      csvFormat.forEach(row => {
        csvContent += row.join(',') + '\n'
      })
      res.status(200)
      res.attachment('Ingredients Summary.csv').send(csvContent)
    } else {
      return res.status(404).json({ error: "No Ingredient Found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/export/:month', async function (req, res) {
  let month = '';
  let monthIngredients = []
  try {
    const plan = await MealPlan.scan().exec()
    const recipes = await Recipe.scan().exec()
    switch (req.params.month) {
      case '1':
        month = 'January'
        break;
      case '2':
        month = 'Febuary'
        break;
      case '3':
        month = 'March'
        break;
      case '4':
        month = 'April'
        break;
      case '5':
        month = 'May'
        break;
      case '6':
        month = 'June'
        break;
      case '7':
        month = 'July'
        break;
      case '8':
        month = 'August'
        break;
      case '9':
        month = 'September'
        break;
      case '10':
        month = 'October'
        break;
      case '11':
        month = 'November'
        break;
      case '12':
        month = 'December'
        break;

    }
    const csvFormat = [[month + '\'s Ingredients']]
    let headers = ['Ingredient', ' Measurement  Type', ' Quantity']
    csvFormat.push(headers);
    if (plan != null) {
      plan.forEach(elementMonth => {
        if (elementMonth.month === parseInt(req.params.month)) {
          let dishes = elementMonth.weekInfo
          dishes.forEach(dish => {
            const dishId = dish.dishId;
            recipes.forEach(elementRecipe => {
              if (elementRecipe.id === dishId) {
                elementRecipe.ingredients.forEach(ingredient => {
                  if (monthIngredients.length == 0) {
                    monthIngredients.push([[ingredient.name], [ingredient.measurementType], [ingredient.quantity]])

                  } else {
                    for (let j = 0; j < monthIngredients.length; j++) {
                      if (ingredient.name === monthIngredients[j][0].toString()) {
                        monthIngredients[j][2] = Number(monthIngredients[j][2]) + Number(ingredient.quantity)
                      }
                      else if (j === monthIngredients.length - 1) {
                        monthIngredients.push([[ingredient.name], [ingredient.measurementType], [ingredient.quantity]])
                        j = monthIngredients.length

                      }
                    }
                  }
                })
              }
            })
          })
        }
      })
      monthIngredients.forEach(dish => {
        let record = []
        record = [dish[0], dish[1], dish[2]];
        csvFormat.push(record);
      })
      let csvContent = ''
      csvFormat.forEach(row => {
        csvContent += row.join(',') + '\n'
      })
      res.status(200)
      res.attachment('Ingredients.csv').send(csvContent)
    } else {
      return res.status(404).json({ error: "No Ingredients plans for month of:" + month });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
})

module.exports = router
