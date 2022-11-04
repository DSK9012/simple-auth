const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./usersEntity');

const userController = {
  getUser: async (user, successCB, errorCB) => {
    try {
      const userInfo = await User.findById(user._id).select('-password');
      return successCB({ user: userInfo });
    } catch (error) {
      return errorCB(error.message);
    }
  },
  getUsers: async (req, res, successCB, errorCB) => {
    try {
      const users = await User.find().select('-password');
      return successCB({ users });
    } catch (error) {
      return errorCB(error.message);
    }
  },
  registeruser: async (req, res, successCB, errorCB) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorCB({ errors: errors.array() });
    }
    const { name, email, password, confirmPassword, reactExperience } = req.body;

    try {
      // see user existed or not
      const checkUser = await User.findOne({ email });
      if (checkUser) {
        return errorCB({ msg: 'User already exists' });
      }

      // checking re-entered password is same or not
      if (password !== confirmPassword) {
        return errorCB({ msg: "Passwords doesn't match" });
      }

      // creating user object
      const user = new User({
        name,
        email,
        password,
        reactExperience,
      });

      // hashing the password before saving it in DB
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // saving user to DB
      await user.save();

      // creating payload
      const payload = {
        user: {
          _id: user._id,
          name: user.name,
        },
      };

      // signing our token
      jwt.sign(payload, 'myjwtsecret', { expiresIn: 3600 }, async (error, token) => {
        if (error) throw error;
        const userInfo = await User.findOne({ email }).select('-password');
        return successCB({ user: userInfo, token });
      });
    } catch (error) {
      return errorCB('Server error');
    }
  },
  loginUser: async (req, res, successCB, errorCB) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      // see user existed or not
      const checkUser = await User.findOne({ email });
      if (!checkUser) {
        return errorCB({ errors: [{ msg: 'No user found with this mail' }] });
      }

      // checking password
      const isMatched = await bcrypt.compare(password, checkUser.password);
      if (!isMatched) {
        return errorCB({ errors: [{ msg: 'Wrong password' }] });
      }

      // creating payload
      const payload = {
        user: {
          _id: checkUser._id,
          name: checkUser.name,
        },
      };

      // signing our token
      jwt.sign(payload, 'myjwtsecret', { expiresIn: 3600 }, async (error, token) => {
        if (error) throw error;
        const user = await User.findOne({ email }).select('-password');
        return successCB({ user, token });
      });
    } catch (error) {
      return errorCB('server error');
    }
  },
  searchUsers: async (req, res, successCB, errorCB) => {
    try {
      let query = {};
      if (req.query.search && req.query.exp) {
        query = {
          name: new RegExp(req.query.search, 'i'),
          reactExperience: getQuery(req.query.exp),
        };
      } else if (req.query.search) {
        query = {
          name: new RegExp(req.query.search, 'i'),
        };
      } else if (req.query.exp) {
        query = {
          reactExperience: getQuery(req.query.exp),
        };
      }
      console.log(query);
      const users = await User.find(query).select('-password');
      return successCB({ users });
    } catch (error) {
      return errorCB(error);
    }
  },
  updateUser: async (req, res, successCB, errorCB) => {
    try {
      await User.updateOne(
        { _id: req.body.userId },
        { name: req.body.name, reactExperience: req.body.reactExperience }
      );
      return successCB('User updated successfully.');
    } catch (error) {
      return errorCB(error);
    }
  },
  deleteUser: async (req, res, successCB, errorCB) => {
    try {
      await User.deleteOne({ _id: req.body.userId });
      return successCB('User deleted successfully.');
    } catch (error) {
      return errorCB(error);
    }
  },
};

const getQuery = (exp) => {
  if (exp === '1-2') return { $gte: 1, $lte: 2 };
  else if (exp === '3-5') return { $gte: 3, $lte: 5 };
  else if (exp === '6-10') return { $gte: 6, $lte: 10 };
  else return { $gt: 10 };
};

module.exports = userController;
