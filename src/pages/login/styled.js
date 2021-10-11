import { createGlobalStyle } from 'styled-components';
import Bg from '../../assets/img/bg2.jpg';

const GlobalStyleLogin = createGlobalStyle`


  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background: url(${Bg}) no-repeat;
    background-size: cover;
  }

  .login{
      flex-direction: row;
      width:25rem;
      margin-left:auto;
      margin-right:auto;
      margin-top: 4rem;
      padding-top: 2.5rem;
      padding-bottom: 2rem;
  }

  .login-box{
    color: white;
    padding-top:5rem;
    margin-bottom:8rem;
}

.login-box h1{
  font-size: 40px;
  border-bottom: 6px solid #4caf50;
  margin-bottom: 50px;
  padding: 13px 0;
}
.textbox{
  width: 100%;
  overflow: hidden;
  font-size: 20px;
  padding: 8px 0;
  margin: 8px 0;
  border-bottom: 1px solid #4caf50;
  
}
.textbox i{
  width: 30px;
  float: left;
  text-align: center;
}
.textbox input{
  border: solid 1px rgba(3, 34, 54, 0.164);
  outline: none;
  font-size: 18px;
  width: 80%;
  background: none;
  margin: 0 10px;
  color: white;
  
}
.btn{
  width: 100%;
  background: none;
  border: 2px solid #4caf50;
  color: white;
  font-size: 18px;
  cursor: pointer;
  margin-right: auto;
  margin-left: auto;
  padding:5px;
  margin-bottom: 20px;
}
`;

export default GlobalStyleLogin;