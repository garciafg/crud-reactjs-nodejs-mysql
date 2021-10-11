const express = require('express');
const router = express.Router();
const UserModel = require('./usersModel');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const JWTSecret = "umapalavraqualquer";
const auth = require('../../middleware/authUser');


const DB = { 
    users: [
        {
            id: 1,
            nome: 'Fabio Garcia',
            email: 'garciafg@gmail.com',
            password: 'garcia123'
        }
    ]
}
router.use(cors());




router.post("/api/auth", (req, res) => {

    var { email, password } = req.body;

    console.log(`Chegou aqui o email: ${email} e a senha: ${password}`)

    if(email != undefined){
        var user = DB.users.find(u => u.email == email);

        if(user != undefined){

            if(user.password === password){

                jwt.sign({id: user.id, email: user.email}, JWTSecret, {expiresIn: '24h'}, ((err, token) => {

                    if(err){
                        res.status(400);
                        res.json({err: "Falha interna!"})
                    }else{
                        res.status(200);
                        res.json({token: token}); //Devolve o token
                    }

                }))

            }else{
                res.status(401);
                res.json({err: "Credenciais inválidas"});
            }

        }else{
            res.status(404);
            res.json({err: "Usuário não encontrado!"});
        }

    }else{
        res.status(400);
        res.json({ err: "O email é inválido!"})
    }

})


module.exports = router;