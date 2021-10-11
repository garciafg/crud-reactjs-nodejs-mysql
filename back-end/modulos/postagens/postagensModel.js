const Sequelize = require("sequelize");
const connection =require("../../database/database");
const Categoria = require("../categorias/categoriasModel");

const Postagem = connection.define('tbl_postagens', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    conteudo: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Categoria.hasMany(Postagem);
Postagem.belongsTo(Categoria);

//Postagem.sync({force: true});

module.exports = Postagem;