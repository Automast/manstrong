import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './AppForm.css';

const AppForm = ({ app, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrls: '', // Will be handled as a comma-separated string
    appLink: '',
    buttonText: 'Get',
    order: 0,
    isTrending: false,
    showSteps: false,
    steps: '', // Comma-separated string
    stepInterval: 1500,
  });

  useEffect(() => {
    if (app) {
      // If we are editing, populate the form with the app's data
      setFormData({
        name: app.name || '',
        description: app.description || '',
        imageUrls: Array.isArray(app.imageUrls) ? app.imageUrls.join(', ') : '',
        appLink: app.appLink || '',
        buttonText: app.buttonText || 'Get',
        order: app.order || 0,
        isTrending: app.isTrending || false,
        showSteps: app.showSteps || false,
        steps: Array.isArray(app.steps) ? app.steps.join(', ') : '',
        stepInterval: app.stepInterval || 1500,
      });
    } else {
      // If we are adding, reset to default state
      setFormData({
        name: '',
        description: '',
        imageUrls: '',
        appLink: '',
        buttonText: 'Get',
        order: 0,
        isTrending: false,
        showSteps: false,
        steps: '',
        stepInterval: 1500,
      });
    }
  }, [app]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for the API
    const submissionData = {
      ...formData,
      imageUrls: formData.imageUrls.split(',').map(url => url.trim()).filter(url => url),
      steps: formData.steps.split(',').map(step => step.trim()).filter(step => step)
    };

    try {
      if (app) {
        // Update existing app
        await api.updateApp(app._id, submissionData);
        alert('App updated successfully!');
      } else {
        // Create new app
        await api.createApp(submissionData);
        alert('App created successfully!');
      }
      onSuccess(); // Notify parent component (AdminDashboard)
    } catch (error) {
      console.error('Error saving app:', error);
      alert('Failed to save app. Check console for details.');
    }
  };

  return (
    <div className="app-form-container">
      <form onSubmit={handleSubmit} className="app-form">
        <h2>{app ? 'Edit App' : 'Add New App'}</h2>

        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Image URLs (comma-separated)</label>
          <textarea name="imageUrls" value={formData.imageUrls} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>App Link (Redirect URL)</label>
          <input type="url" name="appLink" value={formData.appLink} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Button Text</label>
          <input type="text" name="buttonText" value={formData.buttonText} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Display Order</label>
          <input type="number" name="order" value={formData.order} onChange={handleChange} required />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input type="checkbox" name="isTrending" checked={formData.isTrending} onChange={handleChange} />
            Is Trending?
          </label>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input type="checkbox" name="showSteps" checked={formData.showSteps} onChange={handleChange} />
            Show installation steps on click?
          </label>
        </div>

        {formData.showSteps && (
          <div className="conditional-fields">
            <h3>Installation Steps Settings</h3>
            <div className="form-group">
              <label>Steps (comma-separated)</label>
              <input type="text" name="steps" value={formData.steps} onChange={handleChange} placeholder="e.g., Initializing..., Checking..., Installing..." />
            </div>
            <div className="form-group">
              <label>Interval between steps (in ms)</label>
              <input type="number" name="stepInterval" value={formData.stepInterval} onChange={handleChange} />
            </div>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">{app ? 'Update App' : 'Create App'}</button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AppForm;
