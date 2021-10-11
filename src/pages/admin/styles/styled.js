import { createGlobalStyle } from 'styled-components';

const GlobalStyleAdmin = createGlobalStyle`

.box-home-admin01{
      display: flex;
      flex-direction: row;
      margin-top: 6rem;
      padding-top: 5rem;
      padding-bottom: 2rem;
      align-content: space-between;
      flex-wrap: wrap;
      margin-top:6rem; 
  }

  .box-home-admin02{
      display: flex;
      flex-direction: row;
      padding-top: 2.5rem;
      padding-bottom: 2rem;
      align-content: space-between;
      flex-wrap: wrap;
      padding-bottom: 10rem;
      
  }

  .box-home-admin01 h2 {
      border-bottom: 2px solid #cccccc;
      padding-bottom: 20px;
      display: inline-block;
      width: 100%;
  }
  .coluna-left{
    width: 70%;
  }
  .coluna-right{
    width: 30%;
  }


`;

export default GlobalStyleAdmin;