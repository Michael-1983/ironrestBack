const mongoose = require("mongoose");

const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  nickName: { type: String, required: true, trim: true },
  idade: { type: String },
  email: { type: String, required: true, unique: true, trim: true },
  estado: { type: String, required: true },
  cidade: { type: String, required: true },
  telefone: { type: Number, required: true, trim: true },
  passwordHash: { type: String, required: true },
  postId: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
  userId: String,
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
});

const VitimaModel = model("User", UserSchema);

module.exports = VitimaModel;
