const jwt = require('jsonwebtoken');
const JWTSecret = "umapalavraqualquer";

// midleware de autenticação
function auth(req, res, next){

    const authToken = req.headers['authorization'];
    

    if(authToken != undefined){

        // Separa o token em dois
        const bearer = authToken.split(' ');
        var token = bearer[1];

        // Verificar se o token é valido ou não.
        // jwt.verify() Olha pra gente e verifica se o token é validou nao
        // JWTSecret pra descriptografar o token
        jwt.verify(token, JWTSecret, (err, data) => { // O data retorna todos os dados descriptografados
            // Se der ruim
            if(err){
                res.status(401);
                res.json({ err: "Ops! Token inválido." })
            }else{
                // Sw der tudo certo...
                /* Essas variaveis eu posso acessar em qualquer parte das rotas que estiverem protegidas */
                req.token = token;
                req.LoggedUser = { id: data.id, email: data.email }
                /* * */
                next();
            }
        })

    }else{
        res.status(401);
        res.json({ err: "Token inválido!" })
        
    }
    
}

module.exports = auth;