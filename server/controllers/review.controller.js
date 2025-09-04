const Review = require('../models/review.model');
const App = require('../models/app.model');

// @desc    Create a new review
exports.createReview = async (req, res) => {
  try {
    const { name, rating, text } = req.body;
    const { appId } = req.params;

    // Check if the app exists
    const appExists = await App.findById(appId);
    if (!appExists) {
      return res.status(404).json({ message: 'App not found' });
    }

    const newReview = new Review({
      appId,
      name,
      rating,
      text,
      isApproved: false // All reviews start as not approved
    });

    const savedReview = await newReview.save();
    res.status(201).json({ message: 'Review submitted successfully. It will be visible after approval.', review: savedReview });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting review', error: error.message });
  }
};

// @desc    Get all pending reviews
exports.getPendingReviews = async (req, res) => {
  try {
    const pendingReviews = await Review.find({ isApproved: false }).populate('appId', 'name'); // Show which app the review is for
    res.status(200).json(pendingReviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending reviews', error: error.message });
  }
};

// @desc    Approve a review
exports.approveReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.isApproved) {
      return res.status(400).json({ message: 'Review has already been approved' });
    }

    // Update the review
    review.isApproved = true;
    await review.save();

    // Add the review's ID to the corresponding app's reviews array
    await App.findByIdAndUpdate(review.appId, {
      $push: { reviews: review._id }
    });

    res.status(200).json({ message: 'Review approved successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Error approving review', error: error.message });
  }
};

// @desc    Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // If the review was already approved, we should also remove it from the app's review array
    if (review.isApproved) {
        await App.findByIdAndUpdate(review.appId, {
            $pull: { reviews: review._id }
        });
    }

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
};
