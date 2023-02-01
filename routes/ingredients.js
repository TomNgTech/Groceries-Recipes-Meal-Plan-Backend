const express = require("express");
const Ingredient = require("./ingredientModel");
const router = express.Router();

//GET all ingredients
router.get("/ingredients", async (req, res) => {
    try {
      const ingredients = await Ingredient.scan().exec();
      if (!ingredients) {
        return res.status(404).json({ error: "Ingredients not found" });
      }
      res.status(200).json(ingredients);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  
  //GET a specific ingredient by id
  router.get("/ingredients/:id", async (req, res) => {
    try {
      const ingredient = await Ingredient.get(req.params.id);
      if (!ingredient) {
        return res.status(404).json({ error: "Ingredient not found" });
      }
      res.status(200).json(ingredient);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  
  //POST a new ingredient
  router.post("/ingredients", async (req, res) => {
    try {
      const ingredient = await Ingredient.create(req.body);
      res.status(200).json(ingredient);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  
  //PUT an existing ingredient
  router.put("/ingredients/:id", async (req, res) => {
    try {
      const ingredient = await Ingredient.update(req.params.id, req.body);
      if (!ingredient) {
        return res.status(404).json({ error: "Ingredient not found" });
      }
      res.status(200).json(ingredient);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  
  //DELETE an ingredient
  router.delete("/ingredients/:id", async (req, res) => {
    try {
      const ingredient = await Ingredient.delete(req.params.id);
      if (!ingredient) {
        return res.status(404).json({ error: "Ingredient not found" });
      }
      res.status(200).json(ingredient);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

module.exports = router;
