const { model, Schema } = require('mongoose');

const ProductSchema = new Schema({
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
  details: {
    color: String,
    manufacturer: String,
    model: String,
    size: Number
  },
  pricing: {
    type: Number,
  },
  categories: [String]
}, {
  timestamps: true
});

module.exports = model('product', ProductSchema);
