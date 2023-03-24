const { default: mongooose } = require("mongoose");

const userSchema = mongooose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
  },
});

const User = mongooose.model("User", userSchema);

module.exports = User;
