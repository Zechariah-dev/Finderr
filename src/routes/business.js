const { Router } = require('express');
const BusinessController = require('../components//business/business.ctrl');
const { isAuth } = require('../middlewares/authorization');

const router = Router();

/**
 * @swagger
 * /api/business:
 *   post:
 *     summary: Create new business
 *     tags: ['Business']
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - tags
 *               - contact
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                  type: string
 *               tags:
 *                  type: array
 *                  items:
 *                     type: string
 *               contact:
 *                   type: object
 *                   properties:
 *                      phone_number:
 *                          type: string
 *                      address:
 *                          type: string
 *                      whatsapp_number:
 *  
 *               isRegistered:
 *                  type: boolean
 *               company_legal_name:
 *                    type: string
 *               company_registration_number:
 *                    type: string
 *               company_address:
 *                    type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Error
 *       404:
 *         description: Not Found
 *       500:
 *          description: Server Error
 */
router.post('/', isAuth ,BusinessController.create);

/**
 * @swagger
 * /api/business/{slug}:
 *   patch:
 *     summary: update business
 *     tags: ['Business']
 *     parameters:
 *     -  in: path
 *        name: slug
 *        schema:
 *          type: string
 *        required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - tags
 *               - contact
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                  type: string
 *               tags:
 *                  type: array
 *                  items:
 *                     type: string
 *               contact:
 *                   type: object
 *                   properties:
 *                      phone_number:
 *                          type: string
 *                      address:
 *                          type: string
 *                      whatsapp_number:
 *                          type: string
 *                      website:
 *                          type: string
 *               isRegistered:
 *                  type: boolean
 *               company_legal_name:
 *                    type: string
 *               company_registration_number:
 *                    type: string
 *               company_address:
 *                    type: string
 *     responses:
 *       200:
 *         description: Ok
 *       400:
 *         description: Error
 *       404:
 *         description: Not Found
 *       500:
 *          description: Server Error
 */
router.patch('/:slug', BusinessController.update);

/**
 * @swagger
 * /api/business:
 *   get:
 *     summary: fetch all businesses
 *     tags: ['Business']
 *     responses:
 *       200:
 *         description: Ok
 *       404:
 *         description: Not Found
 *       500:
 *          description: Server Error
 */
router.get('/', BusinessController.fetch);

/**
 * @swagger
 * /api/business/{slug}:
 *   get:
 *     summary: fetch single business
 *     tags: ['Business']
 *     parameters:
 *     - in: path
 *       name: slug
 *       scheme:
 *         type: true
 *       required: true
 *     responses:
 *       200:
 *         description: Ok
 *       404:
 *         description: Not Found
 *       500:
 *          description: Server Error
 */
router.get('/:slug', BusinessController.fetchOne);

/**
 * @swagger
 * /api/business/private:
 *   get:
 *     summary: fetch user business
 *     tags: ['Business']
 *     responses:
 *       200:
 *         description: Ok
 *       404:
 *         description: Not Found
 *       500:
 *          description: Server Error
 */
router.get('/private', isAuth, BusinessController.fetchPrivateBusiness);

/**
 * @swagger
 * /api/business/{slug}:
 *   delete:
 *     summary: delete business
 *     tags: ['Business']
 *     parameters:
 *     - in: path
 *       name: slug
 *       scheme:
 *          type: string
 *       required: true
 *     responses:
 *       200:
 *         description: Ok
 *       404:
 *         description: Not Found
 *       500:
 *          description: Server Error
 */
router.delete('/:slug', isAuth, BusinessController.delete);

module.exports = router;