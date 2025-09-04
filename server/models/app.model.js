const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrls: {
    type: [String],
    required: true
  },
  appLink: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    required: true,
    default: 'Get'
  },
  order: {
    type: Number,
    default: 0
  },
  isTrending: {
    type: Boolean,
    default: false
  },
  showSteps: {
    type: Boolean,
    default: false
  },
  steps: {
    type: [String],
    // Only required if showSteps is true, but we'll handle this in the controller/frontend
    default: []
  },
  stepInterval: {
    type: Number,
    default: 1500 // Default interval in milliseconds (1.5 seconds)
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

const App = mongoose.model('App', AppSchema);

module.exports = App;
