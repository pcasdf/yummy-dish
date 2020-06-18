const Recipe = require('../models/recipe');
const { isValidObjectId } = require('mongoose');

const saveRecipe = async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(201).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    let recipe;
    if (isValidObjectId(id)) {
      recipe = await Recipe.findById(id);
      res.json(recipe);
    } else res.status(404).json({ message: 'Could not find saved recipes.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRecipeCollection = async (req, res) => {
  const { id } = req.params;
  await Recipe.findByIdAndUpdate(
    id,
    req.body,
    { new: true },
    (error, recipe) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (!recipe) {
        return res.status(404).json({ message: 'recipe not found' });
      }
      res.status(200).json(recipe);
    }
  );
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Recipe.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send('Recipe deleted!');
    }
    res.status(404).json({ message: 'Could not find recipe!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  saveRecipe,
  getRecipes,
  getRecipe,
  updateRecipeCollection,
  deleteRecipe
};
