//importando o express
const router = require("express").Router();

const bcrypt = require("bcryptjs");
// import da funcão de geraçãço de tokens
const generateToken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const attachCurrentFamilia = require("../middlewares/attacCurrentFamilia");

// gera o salt
const salt_rounds = 10;

//importar o modelo da coleção
const familiaModel = require("../models/familia.model");

// Crud (CREATE) - HTTP POST
// Criar uma nova familia
router.post("/cadastra-familia", async (req, res) => {
  try {
    // Extrair os dados do corpo da requisição

    const { name, email, cep, address, phone, password } = req.body;
    console.log(req.body);

    // Verificar se a senha é forte

    if (
      !password ||
      !password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm
      )
    ) {
      return res.status(400).json({
        msg: "A senha deve conter pelo menos 8 caracteres, letras maiúscula e minúsculas, números e caracteres especiais",
      });
    }

    // Criptografar a senha

    // Gera o salt (string aleatória) com custo 10
    const salt = bcrypt.genSaltSync(salt_rounds);

    // Criptografando a senha do usuário
    const passwordHash = bcrypt.hashSync(password, salt);

    // Inserir no banco de dados

    const result = await familiaModel.create({
      name,
      email,
      cep,
      address,
      phone,
      passwordHash,
    });

    // Responder a requisição
    res.status(201).json(result);
  } catch (err) {
    console.log(err);

    // No mongoose, código de erro 11000 sempre se referem à erros de validação do modelo
    if (err.code === 11000) {
      return res.status(400).json(err.message ? err.message : err);
    }

    res.status(500).json(err);
  }
});

// Login
router.post("/login-familia", async (req, res) => {
  try {
    // Extrair os dados do corpo da requisição

    const { email, password } = req.body;

    // Procurar o usuário no banco de dados através do email

    const foundUser = await familiaModel.findOne({ email });

    // Caso encontrado, verificar se a senha está correta
    if (!foundUser) {
      return res.status(400).json({ msg: "E-mail ou senha incorretos." });
    }
    // compara a senha do usuario com o token
    if (!bcrypt.compareSync(password, foundUser.passwordHash)) {
      return res.status(400).json({ msg: "E-mail ou senha incorretos." });
    }

    // Caso correta, criar uma sessão para esse usuário

    const token = generateToken(foundUser);
    res.status(200).json({
      token,
      user: {
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// cRud (READ) - HTTP GET
// Buscar dados do usuário
router.get(
  "/perfil-familia",
  isAuthenticated,
  attachCurrentUser,
  (req, res) => {
    console.log(req.headers);

    try {
      // Buscar o usuário logado que está disponível através do middleware attachCurrentUser
      const loggedInUser = req.currentUser;

      if (loggedInUser) {
        // Responder o cliente com os dados do usuário. O status 200 significa OK
        return res.status(200).json(loggedInUser);
      } else {
        return res.status(404).json({ msg: "Usuário não logado." });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: JSON.stringify(err) });
    }
  }
);

module.exports = router;
