const bcrypt = require('bcrypt');
const _ = require('lodash');
const UserRepository = require('../../database/repositories/user.repo');
const AuthService = require('./auth.serv');
const { loginValidation, signupValidation } = require('./auth.validation');
const { generateToken } =require('../../utils/jwt');

const AuthController = {
  async login(req, res) {
    try {
      const { errors } = await loginValidation(req.body);

      if (errors) {
        return res.status(400).json({ errors });
      }

      const user = await UserRepository.findOne({ email: req.body.email });

      if (!user) {
        return res
          .status(404)
          .json({ message: `${req.body.email} is not linked to any account` });
      }

      const match = bcrypt.compareSync(req.body.password, user.password);

      if (!match) {
        return res.status(400).json({ message: 'Incorrect password' });
      }

      const pick = _.pick(user, [
        'email',
        'firstname',
        'lastname',
        'phone_number',
        '_id'
      ]);

      const token = generateToken(_.pick(user, ["email","_id"]));

      return res.status(200).json({ user: pick, token });
    } catch (err) {
      global.logger.error(err);
      return res.status(500).json({ message: 'An Error Occured' });
    }
  },
  async signup(req, res) {
    try {
      const { errors } = signupValidation(req.body);

      if (errors) {
        return res.status(400).json({ errors });
      }

      const existing_user = await UserRepository.findOne({
        email: req.body.email,
      });

      if (existing_user) {
        return res
          .status(400)
          .json({ message: `${req.body.email} already in use` });
      }

      const new_user = await AuthService.createUser(req.body)

      const pick = _.pick(new_user, [
        'email',
        'firstname',
        'lastname',
        'phone_number',
        '_id'
      ]);

      const token = generateToken(_.pick(new_user, ["email","_id"]));

      return res.status(201).json({ user: pick, token });
    } catch (err) {
      global.logger.error(err);
      return res.status(500).json({ message: 'An Error Occured' });
    }
  },
};;

module.exports = AuthController;
