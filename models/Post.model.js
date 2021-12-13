const mongoose = require('mongoose')

//Definir quais campos e quais regras desses campos os documentos do MongoDB terão (Schema)
const PostSchema = new mongoose.Schema({
    sobrenome: { type: String, trim: true},
    idade: { type: String, trim: true},
    estado: { type: String, trim: true},
    cidade: { type: String, trim: true},
    descricao: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
    userId: String,

})

module.exports = mongoose.model("Post", PostSchema)