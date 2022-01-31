const BusinessRepository = require('../../database/repositories/business.repo');
const BusinessService = require('./business.serv');
const { createBusinessValidation, updateBusinessValidation } = require('./business.validation')

const BusinessController = {
    async create(req, res) {
        try {
            const { errors } = await createBusinessValidation(req.body);

            if (errors) {
                return res.status(400).json({ errors })
            }

            const existing_business = await BusinessRepository.findOne({ name: req.body.name });

            if (existing_business) {
                return res.status(400).json({ message: 'A Business with the provided name already exists' });
            }

            const new_business = await BusinessService.createBusiness({ owner: req.user._id, ...req.body })

            return res.status(201).json({ business: new_business});
        } catch(err) {
            global.logger.error(err);
            return res.status(500).json({ message: "An Error Occured"})
        }
    },
    async update(req, res) {
        try {
            let business = await BusinessRepository.findOne({ slug: req.params.slug, owner: req.user._id})

            if (!business) {
                return res.status(404).json({ message: 'Business not found'});
            }

            const { errors } = await updateBusinessValidation(req.body);

            if (errors) {
                return res.status(400).json({ errors });
            }

            business = await BusinessRepository.updateOne({ slug: req.params.slug}, req.body);
            
            return res.status(200).json({ business });
        } catch(err) {
            global.logger.error(err);
            return res.status(500).json({ message: "An Error Occured"})
        }
    },
    async delete(req, res) {
        try {
            let business = await BusinessRepository.findOne({ slug: req.params.slug, owner: req.user._id})

            if (!business) {
                return res.status(404).json({ message: 'Business not found'});
            }
         
            business = await business.remove();

            return res.status(200).json({ business })
        } catch(err) {
            global.logger.error(err);
            return res.status(500).json({ messsage: 'An Error Occured'})
        }
    },
    async fetch(req, res) {
        try {
            const businesses = await BusinessRepository.all();

            if (!businesses) {
                return res.status(404).json({ message: 'No business found'})
            }

            return res.status(200).json({ businesses })
        } catch (err) {
            global.logger.error(err);
            return res.status(500).json({ messsage: 'An Error Occured'})
        }
    },
    async fetchOne(req, res) {
        try{
            const business = await BusinessRepository.findOne({ slug: req.params.slug })

            if (!business) {
                return res.status(404).json({ message: 'Business not found'});
            }
         
            return res.status(200).json({ business })
        } catch (err) {
            global.logger.error(err);
            return res.status(500).json({ messsage: 'An Error Occured'})
        }
    },
    async fetchPrivateBusiness(req, res) {
        try {
           const businesses = await BusinessRepository.findOne({ owner: req.user._id})

            if (!businesses) {
                return res.status(404).json({ message: 'Business not found'});
            }
         
            return res.status(200).json({ businesses })
        } catch(err) {
            global.logger.error(err);
            return res.status(500).json({ messsage: 'An Error Occured'})
        }
    },
    async delete(req, res) {
        try {
            let business = await BusinessRepository.findOne({ slug: req.params.slug, owner: req.user._id });

            if (!business) {
                return res.status(404).json({ message: 'Business not found'});
            }
            
            //TODO: delete all business product and service

            business = await business.remove();

            return res.status(200).json({ business })
        } catch(err) {
            global.logger.error(err);
            return res.status(500).json({ message: 'An Error Occured'});
        }
    }
}

module.exports = BusinessController;