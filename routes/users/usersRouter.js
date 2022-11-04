const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../../middlewares/rest-auth-validation');
const userController = require('./usersController');
const multer = require('multer');
const upload = multer();

router.get('/user', auth, async (req, res) => {
  try {
    userController.getUser(
      req.user,
      (user) => res.status(200).json(user),
      (error) => res.status(404).json(error)
    );
  } catch (error) {
    return res.status(500).json('Internal server error');
  }
});

router.post(
  '/user/register',
  upload.single('avatar'),
  [
    check('name', 'name is required').not().isEmpty(),
    check('reactExperience', 'React experience is required').not().isEmpty(),
    check('email', 'email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Plesae enter a valid mail').isEmail(),
    check('password', 'Must be greater than 6 and less than 20 characters').isLength({ min: 6, max: 20 }),
  ],
  async (req, res) => {
    try {
      userController.registeruser(
        req,
        res,
        (token) => res.status(200).json(token),
        (error) => res.status(404).json(error)
      );
    } catch (error) {
      return res.status(500).json('Internal server error');
    }
  }
);

router.post(
  '/user/login',
  [check('email', 'Please enter a valid mail').isEmail(), check('password', 'Password is required').not().isEmpty()],
  async (req, res) => {
    try {
      userController.loginUser(
        req,
        res,
        (token) => res.status(200).json(token),
        (error) => res.status(404).json(error)
      );
    } catch (error) {
      return res.status(500).json('Internal server error');
    }
  }
);

router.get('/users', auth, async (req, res) => {
  try {
    userController.getUsers(
      req,
      res,
      (users) => res.send(users),
      (error) => res.status(404).json(error)
    );
  } catch (error) {
    return res.status(500).json('Internal server error');
  }
});

router.post('/user/search', auth, async (req, res) => {
  try {
    userController.searchUsers(
      req,
      res,
      (users) => res.send(users),
      (error) => res.status(404).json(error)
    );
  } catch (error) {
    return res.status(500).json('Internal server error');
  }
});

router.put('/user/update', auth, async (req, res) => {
  try {
    userController.updateUser(
      req,
      res,
      (result) => res.send(result),
      (error) => res.status(404).json(error)
    );
  } catch (error) {
    return res.status(500).json('Internal server error');
  }
});

router.delete('/user/delete', auth, async (req, res) => {
  try {
    userController.deleteUser(
      req,
      res,
      (result) => res.send(result),
      (error) => res.status(404).json(error)
    );
  } catch (error) {
    return res.status(500).json('Internal server error');
  }
});

module.exports = router;
