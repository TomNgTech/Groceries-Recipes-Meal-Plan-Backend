const express = require("express");
const Recipe = require("../models/recipes");
const router = express.Router();

//GET all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.scan().exec();
    if (!recipes) {
      return res.status(404).json({ error: "Recipes not found" });
    }
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//GET a specific recipe by id
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.get(parseInt(req.params.id));
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//POST a new recipe
router.post("/", async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//PUT an existing recipe
router.put("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.update(parseInt(req.params.id), req.body);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//DELETE a recipe
router.delete("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.delete(parseInt(req.params.id));
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
