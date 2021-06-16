import React, {FunctionComponent, useCallback, useContext, useState} from 'react';

import './App.css';
import rocket from './rocket.png';
import ProductsList from "./ProductsList";
import AuthContext from "./AuthContext";
import currencySymbol from "./utils";
import Modal from 'react-modal';
import LoginForm from "./LoginForm";
import {Product, User} from "./api";
import RegisterForm from "./RegisterForm";
import AddProductForm from "./AddProductForm";

interface HomeProps {
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const Home: FunctionComponent<HomeProps> = () => {

  const {currentUser, setUser} = useContext(AuthContext)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showRegisterDialog, setShowRegisterDialog] = useState(false)
  const [showAddProductDialog, setShowAddProductDialog] = useState(false)
  let body = null;
  const onLogout = useCallback(async () => {
    setUser(null)
  }, [setUser])

  const onLoginClicked = useCallback(async () => {
    setShowLoginDialog(true)
  }, [setShowLoginDialog])

  const onLogin = useCallback((user: User) => {
    setUser(user)
    setShowLoginDialog(false)
  }, [setUser, setShowLoginDialog])

  const onRegisterClicked = useCallback(async () => {
    setShowRegisterDialog(true)
  }, [setShowRegisterDialog])

  const onRegister = useCallback((user: User) => {
    setUser(user)
    setShowRegisterDialog(false)
  }, [setUser, setShowRegisterDialog])

  const onAddProductClicked = useCallback(async () => {
    setShowAddProductDialog(true)
  }, [setShowAddProductDialog])

  const onProductAdded = useCallback((product: Product) => {
    setShowAddProductDialog(false)
  }, [setShowAddProductDialog])

  const closeLoginDialog = useCallback(async () => {
    setShowLoginDialog(false)
  }, [setShowLoginDialog])

  const closeRegisterDialog = useCallback(async () => {
    setShowRegisterDialog(false)
  }, [setShowRegisterDialog])

  const closeAddProductDialog = useCallback(async () => {
    setShowAddProductDialog(false)
  }, [setShowAddProductDialog])

  if (currentUser != null) {

    body = (
      <div className="Buttons">
        <span>{currentUser.login} ({currencySymbol(currentUser.preferredCurrency)})</span><br/>
        <button onClick={onAddProductClicked}>Add a product</button>
        <button onClick={onLogout}>Logout</button>
        <ProductsList/>
      </div>
    )
  } else {
    body = (
      <div className="Buttons">
        <span>Log in to see a list of products</span><br/>
        <button onClick={onLoginClicked}>Login</button>
        <button onClick={onRegisterClicked}>Register</button>
      </div>
    );
  }

  return (
    <div className="App">
      <Modal
        isOpen={showLoginDialog}
        onRequestClose={closeLoginDialog}
        contentLabel="Login"
        style={customStyles}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
      >
        <h2>Login</h2>
        <LoginForm onLogin={onLogin}/>
      </Modal>
      <Modal
        isOpen={showRegisterDialog}
        onRequestClose={closeRegisterDialog}
        contentLabel="Login"
        style={customStyles}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
      >
        <h2>Register</h2>
        <RegisterForm onRegister={onRegister}/>
      </Modal>
      <Modal
        isOpen={showAddProductDialog}
        onRequestClose={closeAddProductDialog}
        contentLabel="AddProduct"
        style={customStyles}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
      >
        <h2>Add new product</h2>
        <AddProductForm onProductAdded={onProductAdded} currentUser={currentUser}/>
      </Modal>
      <header className="App-header">
        <img src={rocket} className="App-logo" alt="logo"/>
        <h1 className="App-title">Welcome to Reactive Catalog</h1>
        {body}
      </header>
    </div>
  );

}

export default Home
