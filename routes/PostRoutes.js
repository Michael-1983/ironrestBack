const express = require("express");

//Configurar um roteador
const router = express.Router();

//Importar o modelo da coleção
const PostModel = require("../models/Post.model");

//Importar o modelo de usuários
const UserModel = require("../models/User.model");

//Importar Autenticação JWT
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

//Cadastar o post

//Só gera cadastro se estiver logado
router.post("/cadastro-post", isAuthenticated,attachCurrentUser,  async (req, res) => {
    try {
        //Extrair os dados do corpo da requisição

        const { nome, sobrenome, idade, estado, cidade, descricao, imageUrl } = req.body;

        //Inserir no banco de dados
        const postCreated = await PostModel.create({
            sobrenome, idade, estado, cidade,
            descricao,
            imageUrl,
            userId: req.user._id,
        });

        //Inserir o ID do post no  cadastro do usuário
        await PostModel.findOneAndUpdate(
            { _id: req.user._id },
            { $push: { postId: postCreated._id } }
        );

        res.status(201).json(postCreated);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Busca lista completa dos post (exibe apenas se estiver logado)
router.get("/lista-post", async (req, res) => {
    try {
        const post = await PostModel.find();

        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//mostrat o detalhe de um post
router.get("/detalhe-post/:id" , async (req, res) => {
    try {
       const post = await PostModel.findOne({ _id: req.params.id});
      
       if(!post){
           return res.status(404).json({ message: "Post não encontrado"})
       } 
       res.status(200).json(post);
    } catch (error) {
       console.log(error);
       res.status(500).json(err); 
    }
});

//atualizar o post
router.patch("/atualizarPost/:id", async (req, res) => {
    try {
        // Extrair os dados do corpo da requisição
const result = await PostModel.findOne({_id: req.params.id}); 
        // Atualizar o registro
        if (!result) {
            return res.status(404).json({ msg: "Produto não encontrado." });
        }
        const postUpdate = await PostModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true, runValidators: true }
        );

        

        res.status(200).json(postUpdate);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});





//Deleta quarto(Deleta apenas se o quarto foi cadastrado pelo usuário logado)

router.delete("/delete-post/:id", isAuthenticated, async (req, res) => {
    try {
        const post  = await PostModel.findOne({ _id: req.params.id });

        if (req.user._id !== post.userId) {
            return res.status(403).json({
                message:
                    "Acesso negado: você não tem permissão para deletar esse quarto.",
            });
        }

        //Deleta ID do cadastro do usuario
        await UserModel.findOneAndUpdate(
            { _id: req.user._id },
            { $pull: { postId: req.params.id } }
        );

        const deletePost = await PostModel.deleteOne({ _id: req.params.id });

        if (deletePost.deletedCount < 1) {
            return res.status(404).json({ message: "Post não encontrado" });
        }

        res.status(200).json({ message: "Post deletado." });
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "Post não encontrado" });
    }
});

module.exports = router;