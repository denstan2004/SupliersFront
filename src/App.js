import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function App() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const HandleLogin = () => {
    axios.post('https://localhost:7184/api/login',
      {
        login: login,
        password: password
      },
      { withCredentials: true } // Додаємо withCredentials для відправлення кукі
    )
    .then(response => {
       if (response.status === 200) {
        console.log(response);
        if(response.data.status==false)
        {
          console.log(response.data.textState);
        }
        else{
         

          if(response.data.data.isSupplier===false)
          {
            navigate("/manager/choose")
          }
          else
          {
            navigate("/choose");
          }

          }
        }
      }
    )
    .catch(error => {
      console.error('There was an error!', error);
    });
    console.log(password, login)
  }

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
