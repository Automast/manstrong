const App = require('../models/app.model');

// @desc    Create a new app
exports.createApp = async (req, res) => {
  try {
    // The 'steps' might come as a comma-separated string from a simple form
    if (req.body.steps && typeof req.body.steps === 'string') {
      req.body.steps = req.body.steps.split(',').map(step => step.trim());
    }
    const newApp = new App(req.body);
    const savedApp = await newApp.save();
    res.status(201).json(savedApp);
  } catch (error) {
    res.status(400).json({ message: 'Error creating app', error: error.message });
  }
};

// @desc    Get all apps, with optional search
exports.getAllApps = async (req, res) => {
  try {
    const { q } = req.query; // q is the search query parameter
    let filter = {};
    if (q) {
      filter.name = { $regex: q, $options: 'i' }; // Case-insensitive search on the name field
    }
    const apps = await App.find(filter).sort({ order: 'asc' }); // Sort by the 'order' field
    res.status(200).json(apps);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching apps', error: error.message });
  }
};

// @desc    Get trending apps
exports.getTrendingApps = async (req, res) => {
  try {
    const trendingApps = await App.find({ isTrending: true }).sort({ order: 'asc' });
    res.status(200).json(trendingApps);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trending apps', error: error.message });
  }
};

// @desc    Get a single app by ID, with approved reviews
exports.getAppById = async (req, res) => {
  try {
    const app = await App.findById(req.params.id).populate({
        path: 'reviews',
        match: { isApproved: true } // Only populate reviews that are approved
    });
    if (!app) {
      return res.status(404).json({ message: 'App not found' });
    }
    res.status(200).json(app);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching app details', error: error.message });
  }
};

// @desc    Update an existing app
exports.updateApp = async (req, res) => {
  try {
    // The 'steps' might come as a comma-separated string from a simple form
    if (req.body.steps && typeof req.body.steps === 'string') {
        req.body.steps = req.body.steps.split(',').map(step => step.trim());
    }
    const updatedApp = await App.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedApp) {
      return res.status(404).json({ message: 'App not found' });
    }
    res.status(200).json(updatedApp);
  } catch (error) {
    res.status(400).json({ message: 'Error updating app', error: error.message });
  }
};

// @desc    Delete an app
exports.deleteApp = async (req, res) => {
  try {
    const deletedApp = await App.findByIdAndDelete(req.params.id);
    if (!deletedApp) {
      return res.status(404).json({ message: 'App not found' });
    }
    // Optional: Also delete all associated reviews to keep DB clean
    // await Review.deleteMany({ appId: req.params.id });
    res.status(200).json({ message: 'App deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting app', error: error.message });
  }
};
