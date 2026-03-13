const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: String,
    fullDescription: String,

    hsnCode: String,

    applications: [String],

    specifications: {
      purity: String,
      appearance: String,
      packaging: String,
      storage: String
    },

    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);