const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

// // Password validation function
// const passwordValidator = (value) => {
//   // Regex for at least one uppercase letter, one special character, and minimum 8 characters
//   const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
//   return regex.test(value);
// };
const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    min: 4,
  },
  middlename: {
    type: String,
    required: true,
    min: 4,
  },
  lastname: {
    type: String,
    required: true,
    min: 4,
  },
  email: {
    type: String,
    required: true,
    min: 4,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    // validate: [
    //   passwordValidator,
    //   "Password must contain at least one uppercase letter, one special character",
    // ],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
