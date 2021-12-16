const mongoose = require("mongoose");


const { Schema, model } = require("mongoose");

const FamiliaSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
    cep: { type: Number,
    required: true,
    trim: true},
    
    address:{ type: String,
    required: true,
    trim: true  },
  phone: { type: Number, trim: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
});

const FamiliaModel = model("Familia", FamiliaSchema);

module.exports = FamiliaModel;
