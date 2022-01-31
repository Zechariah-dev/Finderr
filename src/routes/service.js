const { Router } = require('express');
const ServiceController = require('../components/service/service.ctrl');
const { isAuth } = require('../middlewares/authorization')

const router = Router();

/**
 * @swagger
 * /api/service/{slug}:
 *   post:
 *     summary: Create new service
 *     tags: ['Service']
 *     parameters:
 *     - in: path
 *       name: slug
 *       scheme:
 *         type: string
 *       description: business slug
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
 *               - categories
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                  type: string
 *               tags:
 *                  type: array
 *                  items:
 *                     type: string
 *               categories:
 *                    type: array
 *                    items:
 *                       type: string
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
router.post('/', isAuth, ServiceController.create);

/**
 * @swagger
 * /api/service:
 *   get:
 *     summary: fetch all service
 *     tags: ['Service']
 *     parameters:
 *     - in: query
 *       name: categories
 *     - in: query
 *       name: tags
 *     - in: query
 *       name: q
 *       description: search query string
 *     responses:
 *       200:
 *         description: Ok
 *       404:
 *         description: Not Found
 *       500:
 *          description: Server Error
 */
router.get('/', ServiceController.fetch)

/**
 * @swagger
 * /api/service/{slug}:
 *   get:
 *     summary: fetch single service
 *     tags: ['Service']
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
router.get('/:slug', ServiceController.fetchOne);

/**
 * @swagger
 * /api/service/{id}/{slug}:
 *   delete:
 *     summary: delete service
 *     tags: ['Service']
 *     parameters:
 *     - in: path
 *       name: id
 *       scheme:
 *         type: string
 *       required: true
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
router.delete('/:id/:slug', isAuth, ServiceController.delete);

/**
 * @swagger
 * /api/service/{id}/{slug}:
 *   patch:
 *     summary: Create new service
 *     tags: ['Service']
 *     parameters:
 *     - in: path
 *       name: id
 *       scheme:
 *         type: string
 *       description: business id
 *       required: true
 *     - in: path
 *       name: slug
 *       scheme:
 *          type: string
 *       description: service slug
 *       required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                  type: string
 *               tags:
 *                  type: array
 *                  items:
 *                     type: string
 *               categories:
 *                    type: array
 *                    items:
 *                       type: string
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
router.patch('/:id/:slug', isAuth, ServiceController.update);

module.exports = router;
