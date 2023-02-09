const express = require("express");
const MealPlan = require("../models/mealPlan");
const router = express.Router();

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
                if (element.month === req.params.num) {
                    monthly.push(element);
                }
                if (monthly.length === 0) {
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
