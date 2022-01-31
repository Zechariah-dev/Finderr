const fs = require('fs');
const ProductRepository = require('../../database/repositories/product.repo');
const ProductService = require('./product.serv');
const BusinessRepository = require('../../database/repositories/business.repo');
const cloudinary = require('../../middlewares/cloudinary');
const { generateSlug } = require('../../utils')
const { createProductValidation, updateProductValidation } = require('./product.validation');

const ProductController = {
  async create(req, res) {
    try {
      const business = await BusinessRepository.findOne({ slug: req.params.slug, owner: req.user._id });
      if (!business) {
        return res.status(404).json({ message: 'Business not found'});
      }

      let product = await ProductRepository.findOne({ name: req.body.name, shop: business._id })
      if (product) {
        return res.status(400).json({ message: 'Product already exists'})
      }

      const { errors } = createProductValidation(req.body);
      if (errors) {
        return res.status(400).json({ errors })
      }

      let payload = { ...req.body};

      payload.slug = generateSlug(req.body.name);

      if (files) {
        const { path } = files[0];
        const newPath = await cloudinary.uploader.upload(path);
        payload.image_url = newPath.secure_url;
        fs.unlinkSync(path);
      }

      product = await ProductService.createProduct(payload);

      return res.status(201).json({ product })
    } catch(err) {
      global.logger.error(err);
      return res.status(500).json({ message: 'An Error Occured'})
    }
  },
  async fetch(req, res) {
    try {
      const products = await ProductService.fetchProduct(req.query);

      if (products) {
        return res.status(404).json({ message: 'No products found'});
      }

      return res.status(200).json({ products })
    } catch(err) {
      global.logger.error(err);
      return res.status(500).json({ message: 'An Error Occured'})
    }
  },
  async fetchOne(req, res) {
    try {
      const product = await ProductRepository.findOne({ slug: req.params.slug });

      if (product) {
        return res.status(404).json({ message: 'No product found'});
      }

      return res.status(200).json({ product })
    } catch(err) {
      global.logger.error(err);
      return res.status(500).json({ message: 'An Error Occured'})
    }
  },
  async delete(req, res) {
    try {
      const business = await BusinessRepository.findOne({ _id: req.params.id, owner: req.user._id});
      if (!business) {
        return res.status(404).json({ message: 'No business found'});
      }

      let product = await ProductRepository.findOne({ slug: req.params.slug, shop: business._id});
      if (!product) {
        return res.status(404).json({ message: 'No product found'});
      }

      product = await product.remove()

      return res.status(200).json({ product })
    } catch(err) {
      global.logger.error(err);
      return res.status(500).json({ message: 'An Error Occured'})
    }
  },
  async update(req, res) {
    try{
      const business = await BusinessRepository.findOne({ _id: req.params.id, owner: req.user>_id});
      if (!business) {
        return res.status(404).json({ message: 'No business found'});
      }

      let product = await ProductRepository.findOne({ slug: req.params.slug, shop: business._id});
      if (!product) {
        return res.status(404).json({ message: 'No product found'});
      }

      const { errors } = updateProductValidation(req.body);
      if (errors) {
        return res.status(400).json({ errors })
      }

      product = await ProductRepository.updateOne({ slug: req.params.slug}, req.body);

      return res.status(200).json({ product });
    } catch(err) {
      global.logger.error(err);
      return res.status(500).json({ message:'An Error Occured'})
    }
  },
};

module.exports = ProductController;
