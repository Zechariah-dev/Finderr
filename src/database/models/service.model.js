const { model, Schema } = require('mongoose');

const ServiceSchema = new Schema({
  name: {
    type: String,
    requried: true,
    trim: true,
    maxlength: 50
  },
  slug: {
    type: String
  },
  description: {
    type: String,
    trim: true,
    maxlength: 240
  },
  image_url: String,
  shop: {
    type: Schema.Types.ObjectId,
    ref: 'business'
  },
  tags: [String],
  categories: [String]
}, {
  timestamps: true
});

module.exports = model('service', ServiceSchema);
