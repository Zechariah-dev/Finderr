const { Router } = require('express');
const ProductController = require('../components/product/product.ctrl');
const { isAuth } = require('../middlewares/authorization')

const router = Router();

/**
 * @swagger
 * /api/product/{slug}:
 *   post:
 *     summary: Create new product
 *     tags: ['Product']
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
 *               - pricing
 *               - categories
 *               - details
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                  type: string
 *               tags:
 *                  type: array
 *                  items:
 *                     type: string
 *               details:
 *                   type: object
 *                   properties:
 *                      color:
 *                          type: string
 *                      model:
 *                          type: string
 *                      manufacturer:
 *                          type: string
 *                      size:
 *                          type: number
 *               pricing:
 *                  type: number
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
router.post('/', isAuth, ProductController.create);

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: fetch all product
 *     tags: ['Product']
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
router.get('/', ProductController.fetch)

/**
 * @swagger
 * /api/product/{slug}:
 *   get:
 *     summary: fetch single product
 *     tags: ['Product']
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
router.get('/:slug', ProductController.fetchOne);

/**
 * @swagger
 * /api/product/{id}/{slug}:
 *   delete:
 *     summary: delete product
 *     tags: ['Product']
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
router.delete('/:id/:slug', isAuth, ProductController.delete);

/**
 * @swagger
 * /api/product/{id}/{slug}:
 *   patch:
 *     summary: Create new product
 *     tags: ['Product']
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
 *       description: product slug
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
 *               details:
 *                   type: object
 *                   properties:
 *                      color:
 *                          type: string
 *                      model:
 *                          type: string
 *                      manufacturer:
 *                          type: string
 *                      size:
 *                          type: number
 *               pricing:
 *                  type: number
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
router.patch('/:id/:slug', isAuth, ProductController.update);

module.exports = router;
