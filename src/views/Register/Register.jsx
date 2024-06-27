import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.scopped.css';

const Register = () => {
  const api_url = "https://estoque-api-latest.onrender.com/"
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não conferem');
      return;
    }

    axios.post(api_url + 'user' , {name : username, key: password})
    .then(response => {
      console.log(response.data);
      navigate('/home');
    })
    .catch(error => {
      setError('Erro ao registrar usuário');
      console.error('Error saving data:', error);
    });

  };

  return (
    <div className="register-form">
      <h1>Cadastro de Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nome de Usuário</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            autoComplete='username'
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Digite sua senha</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            autoComplete='new-password'
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirme sua senha</label>
          <input 
            type="password" 
            id="confirmPassword" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            autoComplete='new-password'
            required 
            />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;
