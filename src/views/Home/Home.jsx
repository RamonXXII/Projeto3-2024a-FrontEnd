import React, { useState, useEffect } from 'react';
import './Home.scopped.css';
import axios from 'axios';
import Categorias from '../../components/Categorias';
import Tabela from '../../components/Tabela';
function Home() {
  
  const api_url = "https://estoque-api-latest.onrender.com/"

  const [category, setCategory] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    sex: '',
    quantity: '',
    brand: ''
  });

  const handleCategoryChange = (selectedCategory) => {
    // Resetar o formulário quando a categoria muda
    setFormData({
      name: '',
      size: '',
      sex: '',
      quantity: '',
      brand: ''
    });
    console.log('Categoria selecionada:', selectedCategory);
    setCategory(selectedCategory);

    // use useEffect to focus on the first input field when the category changes
    

    // Você pode fazer outras operações com base na categoria selecionada, se necessário
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));
    console.log('Form Data:', formData);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    
    axios.post(api_url + 'estoque', {cat : category, atr : formData})
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error saving data:', error);
    });
    
    
    /*
    try {
      const response = await axios.post('http://localhost:5000/api/products', productData);
      console.log('Product saved:', response.data);
    } 
    catch (error) {
      console.error('Ocorreu um erro ao salvar o produto:', error);
    }
      */

  };

  return (
    <div>
      <div className="container-fluid">
        <div className="body">
          <div className="row mb-5">
            <div className="d-flex flex-column col-12 justify-content-center align-items-center rounded-top-bottom">
              <h1 >Home</h1>
              <h2 >Feito por Mauro e Ramon</h2>
            </div>

            <div id= 'categorias' className='col-6'>
              <form onSubmit={handleSubmit}>
                <div>
                  <Categorias onCategoryChange={handleCategoryChange} />
                </div> 
                { category === 'roupa' && (
                  <div>
                    <label htmlFor="name">Nome:</label>
                    <input type="text" id="name" value={formData.name} onChange={handleInputChange} />
                    <label htmlFor="size">Tamanho:</label>
                    <input type="text" id="size" value={formData.size} onChange={handleInputChange} />
                    <label htmlFor="sex">Sexo:</label>
                    <input type="text" id='sex' value={formData.sex} onChange={handleInputChange} />

                    <label htmlFor="quantity">Quantidade</label>
                    <input type="number" id="quantity" value={formData.quantity} onChange={handleInputChange} />

                  </div>)


                }
                { category === 'comida' && (
                  <div>
                    <label htmlFor="name">Nome:</label>
                    <input type="text" id="name" value={formData.name} onChange={handleInputChange} />
                    <label htmlFor="brand">Marca:</label>
                    <input type="text" id="brand" value={formData.brand} onChange={handleInputChange} />
                    <label htmlFor="quantity">Quantidade</label>
                    <input type="number" id="quantity" value={formData.quantity} onChange={handleInputChange} />
                  </div>
                )}
                
                <button type="submit">Submit</button>
              </form>

            </div>
            <div id= 'produtos' className='col-6'>
              <h3>Produtos</h3>
              <Tabela />
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
