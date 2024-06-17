import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import './Tabela.scopped.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
const data = [
  { tipo: 'comida', nome: 'Maçã', marca: 'Marca A', quantidade: 10 },
  { tipo: 'bebida', nome: 'Suco', marca: 'Marca B', quantidade: 5 },
  { tipo: 'comida', nome: 'Banana', marca: 'Marca C', quantidade: 20 },
  { tipo: 'bebida', nome: 'Água', marca: 'Marca D', quantidade: 30 },
  // Adicione mais itens conforme necessário
];

function TabelaProdutos() {
  const [selectedFilter, setSelectedFilter] = useState([]);

  const toggleFilter = (filter) => {
    setSelectedFilter(prevSelected =>
      prevSelected.includes(filter)
        ? prevSelected.filter(item => item !== filter)
        : [...prevSelected, filter]
    );
  };

  const filteredData = data.filter(item => {
    if (selectedFilter.length === 0) return true;
    return selectedFilter.includes(item.tipo);
  });

  const handleUpdate = (index) => {
    // Lógica para atualizar o produto com base no índice
    console.log(`Atualizar item no índice ${index}`);
  };

  const handleDelete = (index) => {
    // Lógica para deletar o produto com base no índice
    console.log(`Deletar item no índice ${index}`);
  };

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
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do Produto</th>
            <th>Marca</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className='table-row'>
              <td>{item.nome}</td>
              <td>{item.marca}</td>
              <td>{item.quantidade}</td>
              <td className='actions'>
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
