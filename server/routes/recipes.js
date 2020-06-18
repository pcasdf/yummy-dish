

const { Router } = require('express')
const recipesController = require('../controllers/recipes')

const router = Router()

router.post('/', recipesController.saveRecipe)
router.get('/', recipesController.getRecipes)
// router.get('/:id', recipesController.getRecipe)
// router.put('/:id', recipesController.updateRecipe)
// router.delete('/:id', recipesController.deleteRecipe)

module.exports = router