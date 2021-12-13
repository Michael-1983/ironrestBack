const mongoose = require("mongoose");

//Definir quais campos e quais regras desses campos os documentos do MongoDB terão (Schema)
const PostSchema = new mongoose.Schema({
  nickname: { type: String, trim: true },
  idade: { type: String },
  estado: { type: String, trim: true },
  cidade: { type: String, trim: true },
  conteudo: { type: String, trim: true },
  imageUrl: { type: String, trim: true },
  userId: String,
});

module.exports = mongoose.model("Post", PostSchema);
