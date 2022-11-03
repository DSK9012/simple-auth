const mongoose = require('mongoose');

const userEntity = mongoose.Schema(
  {
    name: {
      type: String,
      default: '',
      require: true,
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
    reactExperience: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('users', userEntity);
