const fs = require("fs");
const BusinessRepository = require('../../database/repositories/business.repo');
const ServiceRepository = require('../../database/repositories/service.repo');
const ServiceService = require('./service.serv');
const cloudinary = require('../../middlewares/cloudinary');
const { generateSlug } = require('../../utils');
const { createServiceValidation, updateServiceValidation } = require('./service.validation');

const ServiceController = {
    async create(req, res) {
        try {
            const business = await BusinessRepository.findOne({ slug: req.params.slug, owner: req.user._id });
            if (!business) {
                return res.status(404).json({ message: 'Business not found'});
            }

            let service = await ServiceRepository.findOne({ name: req.body.name, shop: business._id});
            if (service) {
                return res.status(400).json({ message: 'Service already exists'})
            }

            const { errors } = createServiceValidation(req.body);
            if (errors) {
                return res.status(400).json({ errors });
            }

            let payload = { ...req.body};

            payload.slug = generateSlug(req.body.name);

            if (files) {
                const { path } = files[0];
                const newPath = await cloudinary.uploader.upload(path);
                payload.image_url = newPath.secure_url;
                fs.unlinkSync(path);
            }

            service = await ServiceService.createProduct(payload);

            return res.status(201).json({ service });
        } catch (err) {
            global.logger.error(err);
            return res.status(500).json({ message: 'An Error Occured' })
        }
    },
    async fetchOne(req, res) {
        try {
            const service = await ServiceRepository.findOne({ slug: req.params.slug })

            if (!service) {
                return re.status(404).json({ message: 'Service not found' });
            }

            return res.status(200).jsn({ service });
        } catch (err) {
            global.logger.error(err);
            return res.status(500).json({ message: 'An Error Occured' })
        }
    },
    async fetch(req, res) {
        try {
            const services = await ServiceService.fetchService(req.query);
            if (!services) {
                return res.status(404).json({ message: 'No services found' })
            }

            return res.status(200).json({ services });
        } catch (err) {
            global.logger.error(err);
            return res.status(500).json({ message: 'An Error Occured' })
        }
    },
    async delete(req, res) {
        try {
            const business = await BusinessRepository.findOne({ _id: req.params.id, owner: req.user._id  })
            if (business) {
                return res.status(404).json({ message: 'No business found'})
            }

            let service = await ServiceRepository.findOne({ slug: req.params.slug, shop: business._id })
            if (!service) {
                return res.status(404).json({ message: 'No product found' })
            }

            service = await service.remove();

            return res.status(200).json({ service });
        } catch (err) {
            global.logger.error(err);
            return res.status(500).json({ message: 'An Error Occured' });
        }
    },
    async update(req, res) {
        try {
            const business = await BusinessRepository.findOne({ _id: req.params.id, owner: req.user>_id});
      if (!business) {
        return res.status(404).json({ message: 'No business found'});
      }

      let service = await ServiceRepository.findOne({ slug: req.params.slug, shop: business._id});
      if (!service) {
        return res.status(404).json({ message: 'No product found'});
      }

      const { errors } = updateServiceValidation(req.body);
      if (errors) {
        return res.status(400).json({ errors })
      }

      service = await ServiceRepository.updateOne({ slug: req.params.slug}, req.body);

      return res.status(200).json({ service });
        } catch (err) {
            global.logger.error(err);
            return res.status(500).json({ messaage: 'An Error Occured' });
        }
    }
};

module.exports = ServiceController;