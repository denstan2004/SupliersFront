import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function App() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  localStorage.setItem("back-prefix", "https://localhost:59527/api/Spar");
  localStorage.setItem("front-prefix", "vopak/uzhorod");

  const HandleLogin = () => {
    axios.post(`${localStorage.getItem("back-prefix")}/Login`, {
      login: login,
      password: password
    }, { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          console.log(response);
          if (response.data.status === false) {
            console.log(response.data.textState);
          } else {
            console.log(123);

            if (response.data.data.isSupplier === false) {
              console.log("Navigating to manager choose page");
              navigate(`/${localStorage.getItem("front-prefix")}/manager/choose`);
            } else {
              console.log("Navigating to choose page");
              navigate(`/${localStorage.getItem("front-prefix")}/choose`);
            }
          }
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
    console.log(password, login);
  };

  return (
    <div className="App">
      <div className="login-container">
        <input onChange={(e) => setLogin(e.target.value)} placeholder="логін" className="login-input-field" />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="пароль" className="login-input-field" />
        <button onClick={HandleLogin} className="login-button">
          <div className="login-button-text">Увійти</div>
        </button>
      </div>
    </div>
  );
}

export default App;
