const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const connection = require('./database/database');


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

const postagemController = require('./modulos/postagens/postagensController');
const categoriaController = require('./modulos/categorias/categoriasController');
const userController = require('./modulos/users/usersController');

const postagemModel = require("./modulos/postagens/postagensModel");
const categoriaModel = require("./modulos/categorias/categoriasModel");
const userModel = require("./modulos/users/usersModel");


// Conectando ao mysql //
connection.authenticate().then(()=>{
    console.log("Conectado com sucesso ao Mysql!");
}).catch((erro)=>{
    console.log(erro);
})


app.use("/", postagemController);
app.use("/", categoriaController);
app.use("/", userController);


app.get("/",(req, res) => {
    res.send("Bem vindo!")
})


app.listen(5000, () => {
    console.log("Servidor rodando com sucesso!")
})