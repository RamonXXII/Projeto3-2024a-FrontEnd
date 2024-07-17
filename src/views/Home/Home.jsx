import React, { useState} from 'react';
import './Home.scopped.css';
import axios from 'axios';
import Categorias from '../../components/Categorias';
import Tabela, {refreshTabela} from '../../components/Tabela';
import Sidebar from '../../components/Sidebar';

function Home() {
  const api_url = "https://estoque-api-latest.onrender.com/"

  const [category, setCategory] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    brand: ''
  });

  const config = {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  };

  const handleCategoryChange = (selectedCategory) => {
    // Resetar o formulário quando a categoria muda
    setFormData({
      name: '',
      quantity: '',
      brand: ''
    });
    // console.log('Categoria selecionada:', selectedCategory);
    setCategory(selectedCategory);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));
    // console.log('Form Data:', formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(category);
    if (!category)
    {
      window.alert("Selecione uma categoria.");
      return;
    }

    axios.post(api_url + 'estoque', {cat : category, atr : formData}, config)
    .then(() => {
      refreshTabela();
      // console.log(response.data);
    })
    .catch(error => {
      console.error('Error saving data:', error);
    });
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="body">
          <div className="row mb-5">
            <div className="d-flex flex-column col-12 justify-content-center align-items-center rounded-top-bottom">
              <h1>Estoque</h1>
            </div>
            <div id="navbar" className='d-flex justify-content-end'>
              <Sidebar></Sidebar>
            </div>
            <div id='categorias' className='col-12 col-md-6'>
              <form onSubmit={handleSubmit}>
                <div>
                  <Categorias onCategoryChange={handleCategoryChange} />
                </div> 
                { category && (
                  <div>
                    <label htmlFor="name">Nome:</label>
                    <input type="text" id="name" required value={formData.name} onChange={handleInputChange} />

                    <label htmlFor="brand">Marca:</label>
                    <input type="text" id="brand" required value={formData.brand} onChange={handleInputChange} />
                    
                    <label htmlFor="quantity">Quantidade</label>
                    <input type="number" id="quantity" required value={formData.quantity} onChange={handleInputChange} />

                  </div>)
                }
                <button type="submit">Inserir Produto</button>
              </form>
            </div>
            <div id= 'produtos' className='col-12 col-md-6 mt-4 mt-md-0'>
              <Tabela />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
