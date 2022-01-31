const { Router } = require('express');
const AuthController = require('../components/auth/auth.ctrl');

const router = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: ['Auth']
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                  type: string
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
router.post('/login', AuthController.login);

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Signup user
 *     tags: ['Auth']
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstname
 *               - lastname
 *               - phone_number
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                  type: string
 *               firstname:
 *                  type: string
 *               lastname:
 *                  type: string
 *               phone_number:
 *                  type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Error
 *       500:
 *          description: Server Error
 */
router.post('/signup', AuthController.signup);

module.exports = router;