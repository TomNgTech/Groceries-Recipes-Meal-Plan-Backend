var express = require("express");
var router = express.Router();
var mealPlanModel = require("../models/mealPlan");

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
        month: '01',
        weekInfo: [
            { weekNum: '2' },
            { dishId: '2' },
            { dishName: 'Skillet Mac & Cheese' }
        ]
    },
    {
        id: '4',
        month: '01',
        weekInfo: [
            { weekNum: '3' },
            { dishId: '7' },
            { dishName: 'Garlic Beef Enchiladas' }
        ]
    },
    {
        id: '5',
        month: '01',
        weekInfo: [
            { weekNum: '2' },
            { dishId: '4' },
            { dishName: 'Classic Beef Stew' }
        ]
    },
    {
        id: '6',
        month: '01',
        weekInfo: [
            { weekNum: '2' },
            { dishId: '8' },
            { dishName: 'Zucchini Pizza Casserole' }
        ]
    },
    {
        id: '7',
        month: '01',
        weekInfo: [
            { weekNum: '4' },
            { dishId: '12' },
            { dishName: 'Garlic Herbed Beef Tenderloin' }
        ]
    },
    {
        id: '8',
        month: '01',
        weekInfo: [
            { weekNum: '4' },
            { dishId: '6' },
            { dishName: 'Dutch Oven Red Beans and Rice' }
        ]
    },
    {
        id: '9',
        month: '01',
        weekInfo: [
            { weekNum: '1' },
            { dishId: '9' },
            { dishName: 'Black Bean and Cheese Enchiladas' }
        ]
    },
    {
        id: '10',
        month: '01',
        weekInfo: [
            { weekNum: '3' },
            { dishId: '15' },
            { dishName: 'Pasta Napolitana' }
        ]
    },
    {
        id: '11',
        month: '01',
        weekInfo: [
            { weekNum: '4' },
            { dishId: '13' },
            { dishName: 'Chicken Potpie Casserole' }
        ]
    }];




//Further work needs to be done to finish /mealPlan route
router.get('/mealPlan', async function (req, res, next) {
    //const plan = await mealPlanModel.get(1);
    res.json(plan);
});


module.exports = router;