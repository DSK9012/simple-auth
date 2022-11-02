const mongoose = require('mongoose');

const userEntity = mongoose.Schema(
  {
    name: {
      type: String,
      default: '',
      trim: true,
    },
    email: {
      type: String,
      default: '',
      trim: true,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      require: true,
      default: '',
    },
    avatar: {
      type: Buffer,
      trim: true,
      default: '',
      alias: 'userImage',
    },
    active: {
      type: Boolean,
      default: false,
    },
    lastActive: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('users', userEntity);
