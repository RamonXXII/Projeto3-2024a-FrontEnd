import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import './Tabela.scopped.css';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function TabelaProdutos() {
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://estoque-api-latest.onrender.com/estoque');
        setData(response.data.data); // Ajuste conforme a estrutura da resposta da API
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
        console.log('Data:', data);
      }
    };

    fetchData();
  }, []);

  const toggleFilter = (filter) => {
    setSelectedFilter((prevSelected) =>
      prevSelected.includes(filter)
        ? prevSelected.filter((item) => item !== filter)
        : [...prevSelected, filter]
    );
  };

  const filteredData = data.filter((item) => {
    if (selectedFilter.length === 0) return true;
    return selectedFilter.includes(item.cat);
  });

  const handleUpdate = (index) => {
    // Lógica para atualizar o produto com base no índice
    console.log(`Atualizar item no índice ${index}`);
  };

  const handleDelete = (index) => {
    // Lógica para deletar o produto com base no índice
    console.log(`Deletar item no índice ${index}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="filter-container">
        <span
          className={`filter-option ${selectedFilter.includes('comida') ? 'selected' : ''}`}
          onClick={() => toggleFilter('comida')}
        >
          Comida
        </span>
        <span
          className={`filter-option ${selectedFilter.includes('bebida') ? 'selected' : ''}`}
          onClick={() => toggleFilter('bebida')}
        >
          Bebida
        </span>
        <span
          className={`filter-option ${selectedFilter.includes('roupas') ? 'selected' : ''}`}
          onClick={() => toggleFilter('roupas')}
        >
          Roupas
        </span>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do Produto</th>
            <th>Marca</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className="table-row">
              <td>{item.atr.prod}</td>
              <td>{item.atr.marca}</td>
              <td>{item.atr.qtd}</td>
              <td className="actions">
                <FontAwesomeIcon icon={faEdit} onClick={() => handleUpdate(index)} className="action-icon" />
                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(index)} className="action-icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TabelaProdutos;
