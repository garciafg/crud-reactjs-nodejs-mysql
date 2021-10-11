import React, { useContext } from "react";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";

import { ContextAuth } from "../../Context/AuthContext";

const Header = () => {

    const { handleLogout, authenticated } = useContext(ContextAuth);

    const [menu, setMenu] = React.useState('');

    // Detectar tamanho da tela
    const [size, setSize] = React.useState({x: window.innerWidth});
    const updateSize = () =>
        setSize({
          x: window.innerWidth
    });

    // Atualizar tamanho da tela
    React.useEffect(() => { 
        window.onresize = updateSize
        if(size.x >= 770){
            setMenu('menu');
        }else {
            setMenu('menu-mobile')
        }
    }, [size]);

 
    function handleAbreMenu(){
        if(menu === 'menu-mobile' || menu === 'menu-mobile menu-slideOutLeft'){
            setMenu('menu-mobile menu-slideInLeft');
        }else if(menu === 'menu-mobile menu-slideInLeft'){
            setMenu('menu-mobile menu-slideOutLeft');
        }
        
    }

    return(
        <>
            <header className="bg-dark fixed-top">
                <div className="container topo">
                    <img src={logo} className="img-thumbnail" alt="logo" />
                        <nav>
                            <ul className={menu}>
                                <li><Link to="/">Início</Link></li>
                                {authenticated === true
                                ?  <li><a href="#0" onClick={handleLogout}>Sair</a></li>
                                : <li><Link to="/login">Login</Link></li>
                                } 
                            </ul>
                        </nav>
                        <div className="btn-hamburguer">
                            <input  type="checkbox" id="check"/>
                            <label  onClick={handleAbreMenu} htmlFor="check"></label>
                            <span></span>
                        </div>
                </div>
            </header>
        </>
    )
}

export default Header;