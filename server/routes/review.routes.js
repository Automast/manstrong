const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');

// --- Public Route ---

// @route   POST api/reviews/:appId
// @desc    Create a new review for an app
// @access  Public
router.post('/:appId', reviewController.createReview);


// --- Admin Routes ---

// @route   GET api/reviews/pending
// @desc    Get all reviews that are not yet approved
// @access  Private (Admin)
router.get('/pending', reviewController.getPendingReviews);

// @route   PUT api/reviews/approve/:reviewId
// @desc    Approve a review
// @access  Private (Admin)
router.put('/approve/:reviewId', reviewController.approveReview);

// @route   DELETE api/reviews/:reviewId
// @desc    Delete a review
// @access  Private (Admin)
router.delete('/:reviewId', reviewController.deleteReview);


module.exports = router;
