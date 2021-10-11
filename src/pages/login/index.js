import React, { useContext } from 'react';
import GlobalStyleLogin from '../login/styled'
import { ContextAuth } from '../../Context/AuthContext';

const Login = () => {

    const { values, onChange, handleLogin } = useContext(ContextAuth); // Recebe o contexto
    
    return (
    
            <section>
                <GlobalStyleLogin />
                <div className="container login">
                    <div className="login-box">
                        <h1>Login</h1>
                        <div className="textbox">
                            <i className="fas fa-user"></i>
                            <input id="email" name="email" onChange={onChange} value={values.email} type="text" placeholder="user" />
                        </div>

                        <div className="textbox">
                            <i className="fas fa-lock"></i>
                            <input id="password" name="password" type="password" onChange={onChange} value={values.password} placeholder="Password" />
                        </div>

                        <input type="button" className="btn" onClick={handleLogin} value="Entrar" />
                    </div>
                </div>
            </section>
    );
};

export default Login;