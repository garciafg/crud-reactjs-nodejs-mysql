import {createGlobalStyle} from 'styled-components';
import 'react-toastify/dist/ReactToastify.css'

export default createGlobalStyle`
li{
  list-style: none;
}
html{
      align-items: stretch;
      flex-direction: column;
      display: flex;
      height: 100vh;
}
  body{
      background-color: #666666 !important;
      display: flex !important;
      flex-direction: column !important;
      max-height: 100% !important;
  }

    /* Header */
    header{
      border-bottom: 4px solid white;
      box-shadow: 0 0 1em #000000;
    }
    footer{
      border-top: 4px solid white;
      box-shadow: 0 0 1em #000000;
      padding-top: 3rem;
      padding-bottom: 3rem;
      color: #ffffff;
      text-align: center;
      align-content: flex-end;
    }
    .topo{
      color: white;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .topo img{
      width: 5rem;
      margin-top: .3rem;
      margin-bottom: .3rem;
    }
    .menu {
      display: flex;
      flex-direction: row;
      background-color: #4CAF50;
      margin: 0px;
      padding: .5rem;
      border-radius: 10px;
      border: 2px solid #ffffff
    }
    .menu li a{
      font-size: 1.5rem;
      margin-left: .5rem;
      margin-right: .5rem;
      color: white;
      text-decoration: none;
      padding-left: .7rem;
      padding-right: .7rem;
      border-radius: 5px;
    }
    .menu li a:hover{
      color: #4CAF50;
      font-weight: 400;
      background-color: white;
    }
    .btn-hamburguer{
      display: none;
    }

    /*
    * Botão Hamburguer 
    */
    .btn-hamburguer{
      width: 4rem;
      height: 5rem;
      position: relative;
      top: .5rem;
    }
    .btn-hamburguer label{
      width: 3.7rem;
      height: 3.7rem;
      background-color: #1B80B8;
      position: absolute;
      transition: all .3s linear;
    }
    .btn-hamburguer span{
      width: 30px;
      height: 5px;
      top: 29px;
      left: 15px;
      position: absolute;
      background-color: #ffffff;
      transition: all .3s linear;
    }
    #check{
      position: absolute;
      z-index: 1;
      display: none;
    }
    .btn-hamburguer span:before{
      content: '';
      width: 30px;
      height: 5px;
      bottom: -15px;
      position: absolute;
      background-color: white;
      transition: all .3s linear;
    }
    .btn-hamburguer span:after{
      content: '';
      width: 30px;
      height: 5px;
      top: -15px;
      position: absolute;
      background-color: white;
      transition: all .3s linear;
    }
    #check:checked ~ span{
      background-color: transparent;
    }

    #check:checked ~ span:before{
      transform: translate(0px, -15px) rotate(-45deg);
    }
    #check:checked ~ span:after{
      transform: translate(0px, 15px) rotate(45deg);
    }
    #check:checked ~ label{
      border-radius: 50%;
    }

  /* Home */
  .main01{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 10.1rem !important;
  }
  .postagens{
    flex-basis: 70%;
  }
  .categorias{
    flex-basis: 30%;
  }


  .posts-home{
    color: black;
    text-decoration: none;
  }

/* RESPONSIVIDADE
=> Mostrar até 770px */
@media screen and (max-width: 770px) {

  /*
  * Menu mobile Hamburguer 
  */
  .btn-hamburguer{
      display: block;
    }
  .menu-mobile {
    background-color: #1B80B8;
    z-index: 1000;
    -webkit-transform: translateX(-350%);
    transform: translateX(-350%);
    visibility: visible;
    margin-top: 3.0rem;
    margin-left: -13px; 
    position:fixed;
    flex-direction: column !important;
    padding: 0;
    }
    .menu-mobile li{
      margin-top: .7rem;
    }

    .menu-mobile li a{
      font-size: 1.2rem;
      margin-left: 1.3rem;
      margin-right: .5rem;
      color: white;
      text-decoration: none;
      padding-left: .7rem;
      padding-right: .7rem;
      border-radius: 5px;
    }

    .menu-mobile a:hover{
      color: #1B80B8;
      font-weight: 400;
      background-color: white;
    }
}

/* Animações do menu Hamburguer */
/*
* Exibe o menu hamburguer 
*/
.menu-slideInLeft {
    -webkit-animation-name: menu-slideInLeft;
    animation-name: menu-slideInLeft;
    -webkit-animation-duration: 0.4s;
    animation-duration: 0.4s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    left: 0;
    }
    @-webkit-keyframes menu-slideInLeft {
    0% {
    -webkit-transform: translateX(-270%);
    transform: translateX(-270%);
    visibility: visible;
    }
    100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    }
    }
    @keyframes menu-slideInLeft {
    0% {
    -webkit-transform: translateX(-270%);
    transform: translateX(-270%);
    visibility: visible;
    }
    100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    }
    }

    /* Esconde o menu a esquerda */
    .menu-slideOutLeft {
      -webkit-animation-name: menu-slideOutLeft;
      animation-name: menu-slideOutLeft;
      -webkit-animation-duration: 0.5s;
      animation-duration: 0.5s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      left: 0;
      }
      @-webkit-keyframes menu-slideOutLeft {
      0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      }
      100% {
      visibility: visible;
      -webkit-transform: translateX(-270%);
      transform: translateX(-270%);
      }
      }
      @keyframes menu-slideOutLeft {
      0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      }
      100% {
      visibility: visible;
      -webkit-transform: translateX(-270%);
      transform: translateX(-270%);
      }
      } 

`;