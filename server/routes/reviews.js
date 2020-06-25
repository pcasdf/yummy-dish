const { Router } = require('express');
const reviewsController = require('../controllers/reviews');

const router = Router();

router.get('/recipe/:id', reviewsController.getReviews);
router.get('/:id', reviewsController.getReview);
router.post('/', reviewsController.createReview);
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;
