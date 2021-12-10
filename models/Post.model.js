const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
    nickName: { type: String, required: true, trim: true },
    idade: { type: String },
    estado: { type: String, required: true },
    cidade: { type: String, required: true },
    descricao: { type: String, required: true},
    imagem: { type: String}
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;