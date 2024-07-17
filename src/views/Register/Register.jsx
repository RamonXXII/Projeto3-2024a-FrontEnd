import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Register.scopped.css';
import SpinnerLoading from '../../components/Spinner';

const Register = () => {
  const api_url = "https://estoque-api-latest.onrender.com/"
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não conferem');
      return;
    }
    setLoading(true);
    axios.post(api_url + 'user' , {name : username, key: password})
    .then(response => {
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    })
    .catch(error=> {
      setError(`Erro ao registrar usuário: ${error.response.data.error}`);
      console.error('Error saving data:', error);
      setLoading(false);
    });

  };

  return (
    <div className="register-form">
      <h1>Cadastro de Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">
            <p>Nome de Usuário</p>
            </label>
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
          <label htmlFor="password"> 
            <p>Digite sua senha</p>
            </label>
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
          <label htmlFor="confirmPassword">
            <p>Confirme sua senha</p>
          </label>
          <input 
            type="password" 
            id="confirmPassword" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            autoComplete='new-password'
            required 
            />
        </div>
        <p id=''>Já tem uma conta? <Link to="/">Faça Login</Link></p>
        {error && <p className="error">{error}</p>}
        <button type="submit">Cadastrar</button>

        {loading && 
        <div id='loading'>
          <SpinnerLoading></SpinnerLoading>
        </div>
        }
      </form>
    </div>
  );
};

export default Register;
