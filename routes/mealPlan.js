const express = require("express");
const MealPlan = require("../models/mealPlan");
const router = express.Router();
const mockData = [
    {
        id: '1',
        month: '01',
        weekInfo: [
            { weekNum: '1' },
            { dishId: '1' },
            { dishName: 'Baja Pork Tacos' }
        ]
    },
    {
        id: '2',
        month: '01',
        weekInfo: [
            { weekNum: '1' },
            { dishId: '3' },
            { dishName: 'Ranch Pork Roast' }
        ]
    },
    {
        id: '3',
        month: '02',
        weekInfo: [
            { weekNum: '2' },
            { dishId: '2' },
            { dishName: 'Skillet Mac & Cheese' }
        ]
    },
    {
        id: '4',
        month: '07',
        weekInfo: [
            { weekNum: '3' },
            { dishId: '7' },
            { dishName: 'Garlic Beef Enchiladas' }
        ]
    },
    {
        id: '5',
        month: '07',
        weekInfo: [
            { weekNum: '2' },
            { dishId: '4' },
            { dishName: 'Classic Beef Stew' }
        ]
    },
    {
        id: '6',
        month: '04',
        weekInfo: [
            { weekNum: '2' },
            { dishId: '8' },
            { dishName: 'Zucchini Pizza Casserole' }
        ]
    },
    {
        id: '7',
        month: '04',
        weekInfo: [
            { weekNum: '4' },
            { dishId: '12' },
            { dishName: 'Garlic Herbed Beef Tenderloin' }
        ]
    },
    {
        id: '8',
        month: '02',
        weekInfo: [
            { weekNum: '4' },
            { dishId: '6' },
            { dishName: 'Dutch Oven Red Beans and Rice' }
        ]
    },
    {
        id: '9',
        month: '02',
        weekInfo: [
            { weekNum: '1' },
            { dishId: '9' },
            { dishName: 'Black Bean and Cheese Enchiladas' }
        ]
    },
    {
        id: '10',
        month: '03',
        weekInfo: [
            { weekNum: '3' },
            { dishId: '15' },
            { dishName: 'Pasta Napolitana' }
        ]
    },
    {
        id: '11',
        month: '03',
        weekInfo: [
            { weekNum: '4' },
            { dishId: '13' },
            { dishName: 'Chicken Potpie Casserole' }
        ]
    }];

//---------------- GET ALL MEAL PLANS -------------------
router.get('/', async function (req, res) {
    try {
        const plan = await MealPlan.scan().exec()
        if (plan != null) {
            res.json(plan)
        } else {
            return res.status(404).json({ error: "No Meal plans returned" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});
//---------------- GET ALL MEAL PLANS FOR REQ MONTH -------------------
router.get('/month/:num', async function (req, res) {
    const monthly = [];
    try {
        const plan = await MealPlan.scan().exec()
        console.log(plan);
        if (plan != null) {
            plan.forEach(element => {
                console.log(element);
                if (element.month == req.params.num) {
                    monthly.push(element);
                }
                if (monthly.length == 0) {
                    return res.status(404).json({ error: "No Meal plans where created for month: " + req.params.num });
                }
            });
            res.json(monthly);
        } else {
            return res.status(404).json({ error: "No Meal plans created" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

//---------------- GET MEAL PLANS FOR REQ ID -------------------

router.get('/:id', async function (req, res) {
    try {
        const plan = await MealPlan.get(req.params.id);
        if (plan != null) {
            res.json(plan);
        } else {
            return res.status(404).json({ error: "No Meal plans created ID" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

//---------------- ADD MEAL PLANS -------------------
router.post("/", async (req, res) => {
    try {
        const plan = await MealPlan.create(req.body)
        res.status(200).json(plan);
    } catch (error) {
        res.status(500).json({ error })
    }
})
//---------------- UPDATE MEAL PLANS -------------------
router.put("/:id", async (req, res) => {
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
//---------------- DELETE MEAL PLANS -------------------
router.delete("/:id", async (req, res) => {
    try {
        const plan = await MealPlan.get(req.params.id)
        if (plan != null) {
            res.status(200).json(plan)
            MealPlan.delete(req.params.id)
        }
        return res.status(404).json({ error: 'Meal plan not found' })
    } catch (error) {
        res.status(500).json({ error })
    }
})
module.exports = router
