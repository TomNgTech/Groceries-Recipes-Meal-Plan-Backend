var express = require("express");
var router = express.Router();
var RecipeModel = require("../models/recipes");

/* GET home page. */
router.get("/", async function (req, res, next) {
    // This line of code was used to create a new record of Recipe
    // I (Tung) already did it so I comment out this line
    // RecipeModel.create({"id": 1, "dishName": "Dish 1"});
    
    const recipe = await RecipeModel.get(1);
    res.json(recipe);
});

module.exports = router;
