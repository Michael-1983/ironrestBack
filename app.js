require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("./config/db.config")();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Não esquecer de criar variável de ambiente com o endereço do seu app React (local ou deployado no Netlify)
app.use(cors({ origin: process.env.REACT_APP_URL }));
// rota do usuario
const familiaRoutes = require("./routes/familias.routes");
app.use("/api", familiaRoutes);

const VitmaRoutes = require("./routes/VitmaRouter");
app.use("/api", VitmaRoutes);

//rota dos post_schema
const postRouter = require("./routes/PostRoutes");
app.use("/api", postRouter);

connectToDb
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Servidor subiu com sucesso!");
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(5);
  });
