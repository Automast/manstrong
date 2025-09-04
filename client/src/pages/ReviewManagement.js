import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './ReviewManagement.css';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchPendingReviews();
  }, []);

  const fetchPendingReviews = async () => {
    try {
      const response = await api.getPendingReviews();
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching pending reviews:', error);
      alert('Failed to fetch pending reviews.');
    }
  };

  const handleApprove = async (reviewId) => {
    try {
      await api.approveReview(reviewId);
      setReviews(reviews.filter((review) => review._id !== reviewId));
      alert('Review approved!');
    } catch (error) {
      console.error('Error approving review:', error);
      alert('Failed to approve review.');
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await api.deleteReview(reviewId);
        setReviews(reviews.filter((review) => review._id !== reviewId));
        alert('Review deleted!');
      } catch (error) {
        console.error('Error deleting review:', error);
        alert('Failed to delete review.');
      }
    }
  };

  return (
    <div className="review-management">
      <h1>Pending Reviews</h1>
      <p>Here you can approve or delete user-submitted reviews before they become public.</p>

      <div className="review-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="review-card">
              <h3>Review for "{review.appId ? review.appId.name : 'Unknown App'}"</h3>
              <p className="review-author">By: {review.name} | Rating: {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</p>
              <p className="review-text">"{review.text}"</p>
              <div className="review-actions">
                <button onClick={() => handleApprove(review._id)} className="btn btn-primary">Approve</button>
                <button onClick={() => handleDelete(review._id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No pending reviews.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewManagement;
