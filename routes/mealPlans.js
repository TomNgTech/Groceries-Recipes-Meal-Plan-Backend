const express = require('express')
const MealPlan = require('../models/mealPlan')
const router = express.Router()
const crypto = require('crypto')

// ---------------- GET ALL MEAL PLANS -------------------
router.get('/', async function (req, res) {
  try {
    const plan = await MealPlan.scan().exec()
    if (plan != null) {
      res.json(plan)
    } else {
      return res.status(404).json({ error: 'No Meal plans returned' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
})
// ---------------- GET ALL MEAL PLANS FOR REQ MONTH -------------------
router.get('/month/:num', async function (req, res) {
  const monthly = []
  try {
    const plan = await MealPlan.scan().exec()
    console.log(plan)
    if (plan != null) {
      plan.forEach((element) => {
        console.log(element)
        if (element.month === parseInt(req.params.num)) {
          monthly.push(element)
        }
        if (monthly.length === 0) {
          return res
            .status(404)
            .json({
              error: 'No Meal plans where created for month: ' + req.params.num
            })
        }
      })
      res.json(monthly)
    } else {
      return res.status(404).json({ error: 'No Meal plans created' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
})

// ---------------- GET MEAL PLANS FOR REQ ID -------------------

router.get('/:id', async function (req, res) {
  try {
    const plan = await MealPlan.get(req.params.id)
    if (plan != null) {
      res.json(plan)
    } else {
      return res.status(404).json({ error: 'No Meal plans created ID' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
})

// ---------------- ADD MEAL PLANS -------------------
router.post("/:dishId", async (req, res) => {
  try {
    let randomID = crypto.randomUUID()
    let existsInDB = await MealPlan.get(randomID)

    while (existsInDB) {
      randomID = crypto.randomUUID()
      existsInDB = await MealPlan.get(randomID)
    }
  } catch (error) {
    res.status(500).json({ error })
  }
  const body = {
    id: req.body.id = randomID,
    month: req.body.month,
    weekInfo: [{
      weekNum: req.body.weekInfo[0].weekNum,
      dishId: req.params.dishId,
      dishName: req.body.weekInfo[0].dishName
    }]
  }
  try {

    const plan = await MealPlan.create(body)
    console.log(plan)
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ error })
  }
})
// ---------------- UPDATE MEAL PLANS -------------------
router.put('/:id', async (req, res) => {
  try {
    const plan = await MealPlan.get(req.params.id)
    if (plan != null) {
      await MealPlan.update(req.params.id, req.body)
      const updatedPlan = await MealPlan.get(req.params.id)
      res.status(200).json(updatedPlan)
    } else {
      return res.status(404).json({ error: 'Meal plan not found' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
})
// ---------------- DELETE MEAL PLANS -------------------
router.delete("/:id", async (req, res) => {
  try {
    const plan = await MealPlan.get(req.params.id)
    if (plan != null) {
      res.status(200).json(plan)
      MealPlan.delete(req.params.id)
    } else {
      return res.status(404).json({ error: 'Meal plan not found' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
})

//------------------ CSV EXPORT SUMMARY  ---------------------
router.get('/export/month', async function (req, res) {


  const csvFormat = [['Id', 'Month', 'Week Number', 'Dish name', 'Dish Id']]
  try {
    const plan = await MealPlan.scan().exec()
    if (plan != null) {
      plan.forEach(element => {
        const record = [element.id, element.month, element.weekInfo[0].weekNum, element.weekInfo[0].dishName, element.weekInfo[0].dishId];
        csvFormat.push(record);
      })
      let csvContent = ''
      csvFormat.forEach(row => {
        csvContent += row.join(',') + '\n'
      })
      res.status(200)
      res.attachment('Meal Plan Summary.csv').send(csvContent)
    } else {
      return res.status(404).json({ error: "No Meal plans created CSV" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});
//------------------ CSV EXPORT DETAILS  ---------------------
router.get('/export/:monthNum', async function (req, res) {

  //_______________________________________________________
  //  January's Recipes                                   |
  //  Recipes Name: Dish Name                             |   
  //  Recipe Id 6283ceed-5d17-4204-ba6c-4b30790c2b9b      |
  //  Ingrediants |         MeasurmentType |     Quantity |
  //  Brown Sugar |            Cup         |      1       |
  //  Olive Oil   |            Teaspoon    |      2       |
  //  Recipes Name: Dish Name                             |
  //  Recipe Id 356b3669-941f-40df-a3f3-86f8a5c817ba      |
  //  Brown Sugar |            Cup         |      1       |
  //  Olive Oil   |            Teaspoon    |      2       |
  //______________________________________________________|
  let month = '';
  try {
    const plan = await MealPlan.scan().exec()
    const recipes = await Recipe.scan().exec()
    switch (req.params.monthNum) {
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
    const csvFormat = [[month + '\'s Recipes']]

    if (plan != null) {
      plan.forEach(elementMonth => {
        if (elementMonth.month === parseInt(req.params.monthNum)) {
          const dishId = elementMonth.weekInfo[0].dishId;
          const dishName = elementMonth.weekInfo[0].dishName;
          recipes.forEach(elementRecipe => {
            if (elementRecipe.id === dishId) {
              let headers = ['Recipe Name: ' + dishName]
              csvFormat.push(headers);
              headers = ['Recipe Id: ' + dishId]
              csvFormat.push(headers);
              headers = ['Ingrediants', ' Measurment Type', ' Quantity']
              csvFormat.push(headers);
              elementRecipe.ingredients.forEach(ingrediant => {
                let record = [ingrediant.name, ingrediant.measurementType, ingrediant.quantity];
                csvFormat.push(record);
              })
              record = ['\n']
              csvFormat.push(record);
            }
          })
        }
      })
      let csvContent = ''
      csvFormat.forEach(row => {
        csvContent += row.join(',') + '\n'
      })
      res.status(200)
      res.attachment('Detailed Meal Plan by Month.csv').send(csvContent)
    } else {
      return res.status(404).json({ error: "No Meal plans for month of:" + month });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router
