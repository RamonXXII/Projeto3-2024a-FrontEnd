import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import './Tabela.scopped.css';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SpinnerLoading from './Spinner';



const api_url = 'https://estoque-api-latest.onrender.com/';

export var refreshTabela = () => {};

function TabelaProdutos() {
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const config = useMemo( () => ({
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }), []);

  const fetchData = useCallback( async () => {
    setLoading(true);
    try {
      const response = await axios.get(api_url + 'estoque', config);
      setData(response.data.data);
      console.log('Data:', response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [config]);

  refreshTabela = fetchData;

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
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
      console.log('Config:', config)
      const body = { 
        id : produtoSelecionado.id, 
        atr : produtoSelecionado.atr 
      }
      console.log('Body:', body);      
      const res = await axios.put(api_url + 'estoque', body ,config);
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
        const res = await axios.delete(api_url + 'estoque', { headers: config.headers, data : { id : produtoExcluir.id } } );
        console.log(res);
        
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
      }
      finally {
        fetchData();
      }
    }
  };

  if (loading) return <div id='loading'>
    <SpinnerLoading></SpinnerLoading>
  </div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div id="tabela">
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
      <div style={{ maxHeight: "300px", overflowY: "auto" , overflowX : "auto"}}>
        <Table striped bordered hover>
          <thead style={{ position: "sticky", 
              top: "0" }}>
            <tr>
              <th>Produto</th>
              <th>Marca</th>
              <th>Estoque</th>
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
