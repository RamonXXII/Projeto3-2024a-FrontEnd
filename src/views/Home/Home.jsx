import React, { useState } from 'react';
import './Home.scopped.css';
import axios from 'axios';
import Categorias from '../../components/Categorias';
function Home() {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [brand, setBrand] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const productData = {
      nome  : productName,
      qtd   : quantity,
      marca : brand
    };
    console.log('Product Data:', productData);

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
              <Categorias />
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="productName">Product Name:</label>
                  <input
                    type="text"
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="brand">Brand:</label>
                  <input
                    type="text"
                    id="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                <button type="submit">Submit</button>
              </form>

            </div>
            <div id= 'produtos' className='col-6'>
              <h3>Produtos</h3>
              <ul>
                <li>Produto 1</li>
                <li>Produto 2</li>
                <li>Produto 3</li>
              </ul>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
