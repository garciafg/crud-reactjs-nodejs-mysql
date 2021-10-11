
import React from 'react';
import Header from './components/Header';
import GlobalStyles from './assets/styles/GlobalStyles';
import Routes from './routes/';
import { Router } from 'react-router-dom'
import history from './services/history';
import Footer from './components/footer';
import { AuthProvider } from './Context/AuthContext';
import { ToastContainer } from 'react-toastify';
function App() {
  return (

    <>
      <AuthProvider>
        <Router history={history}>
            <Header/>
            <Routes />
            <Footer/>
          <GlobalStyles/>
          <ToastContainer autoClose={3000} className="toast-container" />
        </Router>
      </AuthProvider>
    </>

  );
}

export default App;
