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
const userRoute  = require("./routes/familia");
app.use("/api", userRoute);

const familiaRoute  = require("./routes/familias.routes");
app.use("/api", familiaRoute);

//rota dos post_schema
const postRoute = require("./routes/PostRoutes");
app.use("/api", postRoute);


app.listen((process.env.PORT), () =>
  console.log(`servidor rodando na porta ${process.env.PORT}`)
);
