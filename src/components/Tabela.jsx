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
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get('https://estoque-api-latest.onrender.com/estoque');
      setData(response.data.data); // Ajuste conforme a estrutura da resposta da API
      console.log('Data:', response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  
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
    const produtoAtualizar = filteredData[index];
    // console.log(`Atualizar item no índice ${index}:`, produtoAtualizar);

    // Aqui você pode implementar uma lógica para abrir um modal ou formulário de edição com os dados do produto
    // Por exemplo:
    // setModalOpen(true);
    // setProdutoSelecionado(produtoAtualizar);
  };

  const handleDelete = async (index) => {
    // Lógica para deletar o produto com base no índice
    const produtoExcluir = filteredData[index];
    // console.log(`Deletar item no índice ${index}:`, produtoExcluir);

    // Aqui você pode implementar a lógica para confirmar a exclusão do produto
    // Por exemplo:
     if (window.confirm(`Tem certeza que deseja excluir ${produtoExcluir.atr.prod}?`)) {
      // Após a exclusão bem-sucedida, atualiza os dados
      console.log('Excluir produto:', produtoExcluir);
      try {
        const res = await axios.delete('https://estoque-api-latest.onrender.com/estoque', { data : { id : produtoExcluir._id } } )
        console.log(res);
        
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
      }
      finally {
        fetchData();
      }
    }
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
              <td>{item.atr.name}</td>
              <td>{item.atr.brand}</td>
              <td>{item.atr.quantity}</td>
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
