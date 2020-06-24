const { Router } = require('express');
const reviewsController = require('../controllers/reviews');

const router = Router();

router.get('/', reviewsController.getReviews);
router.post('/', reviewsController.createReview);
router.delete('/', reviewsController.deleteReview);

module.exports = router;
