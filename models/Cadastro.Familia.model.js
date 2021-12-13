const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  location: {
    cep: Number,
    required: true,
    trim: true,
    address: String,
    required: true,
    trim: true,
  },
  phone: { type: Number, trim: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    required: true,
    default: "USER",
  },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
