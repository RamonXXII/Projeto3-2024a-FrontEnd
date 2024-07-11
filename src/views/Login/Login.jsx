import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.scopped.css';
import axios from 'axios';
import SpinnerLoading from '../../components/Spinner';

const Login = () => {
  const api_url = "https://estoque-api-latest.onrender.com/"
  
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para autenticar o usuário
    console.log('User:', user);
    console.log('Password:', password);

    if (!user || !password) {
      setError('Usuário e senha são obrigatórios');
      return;
    }
    setLoading(true);

    axios.post(api_url + 'login',  {name: user, key: password})
    .then(response => {
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', user);
      navigate('/home')
    })
    .catch(error => {
      console.error('Error saving data:', error);
      setError(`Erro ao logar usuário: ${error.response.data.error}`);
      setLoading(false);
    }
    );

  };

  return (
    <div className="login-form">
      <h1>Login
        
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="user">Usuario</label>
          <input 
            type="text" 
            id="user" 
            value={user} 
            onChange={(e) => setUser(e.target.value)} 
            autoComplete='username'
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            autoComplete='current-password'
            required 
          />
        </div>
        {error && <p className="error">{error}</p>
        }
        <p>Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>

        <button type="submit">Login</button>

        {loading && 
        <div id='loading'>
          <SpinnerLoading></SpinnerLoading>
        </div>
        }
      </form>
    </div>
  );
};

export default Login;
