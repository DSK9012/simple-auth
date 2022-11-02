const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./usersEntity');

const userController = {
  getUser: async (user, successCB, errorCB) => {
    try {
      const userInfo = await User.findById(user._id).select('-password').select('-avatar');
      return successCB({ user: userInfo });
    } catch (error) {
      return errorCB(error.message);
    }
  },
  registeruser: async (req, res, successCB, errorCB) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorCB({ errors: errors.array() });
    }
    const { name, email, password, confirmPassword } = req.body;

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
      let user;
      if (req?.file?.buffer) {
        user = new User({
          name,
          email,
          password,
          active: false,
          lastActive: Date.now(),
          avatar: req.file.buffer,
        });
      } else {
        user = new User({
          name,
          email,
          password,
          active: false,
          lastActive: Date.now(),
        });
      }

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
        const userInfo = await User.findOne({ email }).select('-password').select('-avatar');
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
        const user = await User.findOne({ email }).select('-password').select('-avatar');
        return successCB({ user, token });
      });
    } catch (error) {
      return errorCB('server error');
    }
  },
  sendAvatar: async (req, res, successCB, errorCB) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user || !user.avatar) throw new Error('User not found');

      res.set('Content-Type', 'image/jpg');
      return successCB(user.avatar);
    } catch (error) {
      return errorCB(error);
    }
  },
  searchUsers: async (req, res, successCB, errorCB) => {
    try {
      const query = new RegExp(req.query.search, 'i');
      const users = await User.find({ name: query }).limit(10).select('-password').select('-avatar');
      return successCB({ users });
    } catch (error) {
      return errorCB(error);
    }
  },
};

module.exports = userController;
