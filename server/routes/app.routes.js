const express = require('express');
const router = express.Router();
const appController = require('../controllers/app.controller');

// --- Public Routes ---

// @route   GET api/apps
// @desc    Get all apps, sorted by order. Can also be used for search via query param.
// @access  Public
router.get('/', appController.getAllApps);

// @route   GET api/apps/trending
// @desc    Get all trending apps
// @access  Public
router.get('/trending', appController.getTrendingApps);

// @route   GET api/apps/:id
// @desc    Get a single app by its ID
// @access  Public
router.get('/:id', appController.getAppById);


// --- Admin Routes ---

// @route   POST api/apps
// @desc    Create a new app
// @access  Private (Admin)
router.post('/', appController.createApp);

// @route   PUT api/apps/:id
// @desc    Update an existing app
// @access  Private (Admin)
router.put('/:id', appController.updateApp);

// @route   DELETE api/apps/:id
// @desc    Delete an app
// @access  Private (Admin)
router.delete('/:id', appController.deleteApp);


module.exports = router;
