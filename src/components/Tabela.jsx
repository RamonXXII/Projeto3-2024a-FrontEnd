import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import './Tabela.scopped.css';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function TabelaProdutos() {
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

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
    const produtoAtualizar = filteredData[index];
    setProdutoSelecionado(produtoAtualizar);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setProdutoSelecionado(null);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put('https://estoque-api-latest.onrender.com/estoque', { id : produtoSelecionado._id, atr : produtoSelecionado.atr });
      console.log(res);
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    } finally {
      fetchData();
    }
  };

  const handleDelete = async (index) => {
    const produtoExcluir = filteredData[index];
    if (window.confirm(`Tem certeza que deseja excluir ${produtoExcluir.atr.name}?`)) {
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
          className={`filter-option ${selectedFilter.includes('roupa') ? 'selected' : ''}`}
          onClick={() => toggleFilter('roupa')}
        >
          Roupa
        </span>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do Produto</th>
            <th>Marca</th>
            <th>Quantidade</th>
            <th>Ações</th>
            <td className="actions">
            <FontAwesomeIcon icon={faArrowsRotate} onClick={() => fetchData()} className="action-icon" />
            </td>
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
      {/* Modal de Edição */}
      <Modal show={modalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNome">
              <Form.Label>Nome do Produto</Form.Label>
              <Form.Control
                type="text"
                value={produtoSelecionado?.atr.name || ''}
                onChange={(e) =>
                  setProdutoSelecionado((prev) => ({
                    ...prev,
                    atr: { ...prev.atr, name: e.target.value },
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="formMarca">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                value={produtoSelecionado?.atr.brand || ''}
                onChange={(e) =>
                  setProdutoSelecionado((prev) => ({
                    ...prev,
                    atr: { ...prev.atr, brand: e.target.value },
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="formQuantidade">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="number"
                value={produtoSelecionado?.atr.quantity || ''}
                onChange={(e) =>
                  setProdutoSelecionado((prev) => ({
                    ...prev,
                    atr: { ...prev.atr, quantity: e.target.value },
                  }))
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TabelaProdutos;
