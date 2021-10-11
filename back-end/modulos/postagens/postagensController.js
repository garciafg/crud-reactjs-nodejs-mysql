const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authUser');
const CategoriasModel = require('../categorias/categoriasModel');
const PostagenModel = require('../postagens/postagensModel');

router.get("/api/posts",  (req, res) => {

    PostagenModel.findAll({
        include: [{model:CategoriasModel}]
    }).then((posts)=>{
        res.json({posts: posts}); 
    });

})


router.get("/api/post/:id", (req, res) => {

    let id = req.params.id;

        if(!isNaN(id) && id != undefined){

            PostagenModel.findByPk(id).then((post) => {

                res.json({ ok: post })

            })

        }else{
            res.json({ err: "Parametro incorreto!" })
        }

    })




router.post("/api/post/add", auth, (req, res) => {

    let { titulo, conteudo, cat } = req.body;

    if(titulo && conteudo && cat){

        PostagenModel.create({ title: titulo, slug: "teste", conteudo: conteudo, tblCategoriaId: cat }).then(() => {
            res.json({ok: "Postagem inserida com sucesso!" })
        }).catch((err) => {
            res.json({ err: "Falha com o banco de dados" })
        })

    }else{
        res.json({ err: "Algo deu errado. Preencha todos os campos." })
    }

})

router.get("/api/post/getEdit/:id", auth,(req, res) => {

    let id = req.params.id;

    PostagenModel.findByPk(id).then((post) => {
        res.json({ ok: post })
    }).catch((err) => {
        res.json({ err: "Ouve um erro com banco de dados" })
    })

})


router.post("/api/post/edit", auth,(req, res) => {

    let { id, titulo, conteudo, cat } = req.body;

    if(id && titulo && conteudo && cat){
        PostagenModel.update({title: titulo, conteudo: conteudo, tblCategoriaId: cat},
            {where: {id: id}}).then(() => {
               res.json({ ok: "Postagem editada com sucesso!" })
            }).catch((err) => {
               res.json({ err: "Erro com o banco de dados" })
            })
    }else{
        res.json({ err: "favor preencher todos os campos!"})
    }

})

router.post("/api/post/delete/:id", auth, (eq, res) => {

})

module.exports = router;