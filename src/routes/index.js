import React, { useContext } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

// Contexts
import { ContextAuth } from "../Context/AuthContext";


//paginas
import Home from '../pages/home';
import Login from '../pages/login';

// Admin
import AdminIndex from "../pages/admin/home";
import Post from "../pages/post";

// Pegar informação se o usuario esta autenticado
function CustomRoute( { isPrivate, ...rest } ){
    const { loading, authenticated } = useContext(ContextAuth);

        //Se estiver carregando...
        if(loading){
            return <h1>Carregando...</h1>
        }
    if(isPrivate && !authenticated){ // Rota privado e não estiver autenticado joga pra pagina login
        return <Redirect to="/login" ></Redirect>
    }

    return <Route { ...rest } />
}


function Routes() {
    return(

        <>
            <Switch>
                <CustomRoute exact path="/" component={Home} />
                <CustomRoute path="/login" component={Login} />
                <CustomRoute exact path="/post/:id" component={Post} />
                {/* <CustomRoute isPrivate exact path="/admin" component={AdminIndex} /> */} 

                    <CustomRoute isPrivate exact path="/admin" component={AdminIndex} />

                {/* <MyRoute path="*" component={Page404} /> */}
            </Switch>
        </>
    )

}

export default Routes;