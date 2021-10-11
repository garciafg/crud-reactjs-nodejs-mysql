import React, { createContext, useState, useEffect } from "react";
import api from '../services/api';
import history from "../services/history";
const ContextAuth = createContext();


function AuthProvider({ children }) {

    // Inicia um objeto com as propriedades vazias
    function initialState(){
        return {email: '', password: ''};
    }

    // Recebe dados digitados no formulario de login
    const [values, setValues] = useState(initialState);
    function onChange(event) {
        const { value, name } = event.target;
        setValues({
            ...values,
            [name]: value,
        })
    }

    
    const [authenticated, setAuthenticated] = useState(false); // Estado do usuario, true ou false
    const [loading, setLoading] = useState(true); // Loading


    // Adicionando um interceptor de Request //
    api.interceptors.request.use(function (config) {
        // Faça algo antes que a solicitação seja enviada
        console.log("Fazendo Request")
        return config;
    
      }, async function (error) {
        // Faça algo com erro da requisição //
        console.log("Erro no envio da requisição")
        return Promise.reject(error);
      });
    
        // Adicionando um interceptor de Response //
        api.interceptors.response.use(function (response) {
        // Qualquer código de status que esteja dentro de 2xx fará com que essa função seja acionada
        // Faça algo com os dados de resposta
        console.log("Tudo certo!")
        return response;
    
      }, function (error) {
        // Quaisquer códigos de status que estejam fora de 2xx fazem com que esta função seja acionada
        // Vou deslogar o usuario aqui
        const access_token = localStorage.getItem("token");
        if (error.response.status === 401 && access_token) {
            const response = handleLogout();
            return response;
        }
        return Promise.reject(error);
      });

       
    // Verificar se o token existe
    const token = localStorage.getItem('token'); 
     useEffect(() => {
        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true); //Sim, o usuario tem um token, sete true no status dele
        }else{
            setAuthenticated(false)
        }
        // Completar o carregamento
        setLoading(false);
    }, [token])


    // Login
    async function handleLogin(){

        // recebe os dados do login
        var email = values.email;
        var password = values.password;

        api.post('/api/auth', {
            email,
            password
        }).then((res) => {

            var token = res.data.token;
            // Seta o token no locaStorage
            localStorage.setItem('token', JSON.stringify(token));
            api.defaults.headers.Authorization = `Bearer ${token}`;

            setAuthenticated(true); // Setou para autenticado
            history.push('/admin');
            
        }).catch((err) => {
            console.log("Ouve um erro ao logar."+err)
        })

    }


    // Logout
    function handleLogout(){
        setAuthenticated(false); // Seta o status de authenticated para falso
        localStorage.removeItem('token'); // Remove o token
        api.defaults.headers.Authorization = undefined;
        history.push('/login'); // Redireciona usuario para o login
    }

    
    return(
        <ContextAuth.Provider value={{ onChange, values, setValues, authenticated, handleLogin, loading, handleLogout }}>
            {children}
        </ContextAuth.Provider>
    )
    
}

export {ContextAuth, AuthProvider};
