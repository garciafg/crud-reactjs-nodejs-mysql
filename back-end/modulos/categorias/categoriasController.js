const express = require("express");
const router = express.Router();
const CategoriaModel = require("./categoriasModel");
const auth = require('../../middleware/authUser');



router.get("/api/cat", (req, res) => {

    CategoriaModel.findAll().then((categorias) => {
        if(categorias){
            res.json({cat: categorias})
        }else{
            res.json({err: "Banco de dados vazio"})
        }
    }).catch((err) => {
        res.json({err: "Ops! Ouve um erro."})
    })
})


router.post('/api/cat/add', auth, (req, res) => {
    
    let cat = req.body.cat;

    if(cat != ''){
        CategoriaModel.create({titulo: cat, slug: "Teste"}).then(() => {
            res.json({ok: "Categoria inserida com sucesso!"})
        }).catch((err) => {
            res.json({err: "Ouve um erro ao cadastrar a categoria!"})
        })
    }else{
        res.json({err: "Campo vazio. Favor preencher."})
    }

})

router.get("/api/cat/getEdit/:id", auth, (req, res) => {

    let id = req.params.id;
    
    if(!isNaN(id)){
        CategoriaModel.findByPk(id).then((category) => {
            res.json({ok: category});
        }).catch((err) => {
            res.json({err: "Ouve um erro!"})
        })
    }else{
        res.json({err: "Ouve um erro!"})
    }
})

router.post("/api/cat/update", auth, (req, res) => {

    let id = req.body.id;
    let titulo = req.body.titulo;
    console.log(id, titulo)
    if(titulo != '' && id != undefined){

        CategoriaModel.update({titulo: titulo}, 
            { 
                where: {id: id} 
            }
        ).then(() => {
            res.json({ok: "Categoria atualizada com sucesso!"})
        }).catch((err) => {
            res.json({err: "Erro ao acessar o banco de dados"})
        })

    }else{
        res.json({err: "Erro! Informação incorreta."})
    }

})

router.post("/api/cat/delete/:id", auth, (req, res) => {

    let id = req.params.id;

    if(id != undefined){

            if(!isNaN(id)){
                CategoriaModel.destroy({
                    where: {
                        id: id
                    }
                }).then(() => {
                    res.json({ok: "Categoria deletada com sucesso!"})
                }).catch(() => {
                    res.json({err: "Erro ao conectar com banco de dados"})
                })

            }else{
                res.json({err: "Parametro incorreto!"})
            }
    }else{
        res.json({ err: "Parametro incorreto" })
    }

})

module.exports = router;