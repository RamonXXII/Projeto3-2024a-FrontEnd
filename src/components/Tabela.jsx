import React, { useState } from 'react';

const data = [
  { tipo: 'comida', nome: 'Maçã', marca: 'Marca A', quantidade: 10 },
  { tipo: 'bebida', nome: 'Suco', marca: 'Marca B', quantidade: 5 },
  { tipo: 'comida', nome: 'Banana', marca: 'Marca C', quantidade: 20 },
  { tipo: 'bebida', nome: 'Água', marca: 'Marca D', quantidade: 30 },
  // Adicione mais itens conforme necessário
];

function TabelaProdutos() {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredData = data.filter(item => {
    if (filter === '') return true;
    return item.tipo === filter;
  });

  return (
    <div>
      <div>
        <label htmlFor="filter">Filtrar por tipo: </label>
        <select id="filter" onChange={handleFilterChange}>
          <option value="">Todos</option>
          <option value="comida">Comida</option>
          <option value="bebida">Bebida</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome do Produto</th>
            <th>Marca</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.nome}</td>
              <td>{item.marca}</td>
              <td>{item.quantidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaProdutos;
