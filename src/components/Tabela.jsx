import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import './Tabela.scoped.css';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faArrowUpAZ, faArrowDownAZ, faArrowUp19, faArrowDown19, faArrowUp, faArrowDown, faFilter} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SpinnerLoading from './Spinner';

const api_url = 'https://estoque-api-latest.onrender.com/';

export var refreshTabela = () => {};

function TabelaProdutos() {
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [data, setData] = useState([]);

  const [asc, setAsc] = useState(true);
  const [currentSort, setCurrentSort] = useState('Produto');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  
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
      // console.log('Data:', response.data.data);
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
    let updated = false;

    try {
      // console.log('Config:', config)
      const body = { 
        id : produtoSelecionado.id, 
        atr : produtoSelecionado.atr 
      }

      if (produtoSelecionado.atr.quantity <= 0){
        window.alert("Insira uma quantidade válida.");
        return;
      }
      
      if (produtoSelecionado.cat !== 'roupa' && new Date(produtoSelecionado.atr.expiration) < new Date()){
        window.alert("Insira uma data válida.");
        return;
      }
      
      // console.log('Body:', body);      
      await axios.put(api_url + 'estoque', body ,config);
      updated = true;
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    } finally {
      if (updated) fetchData();
    }
  };

  const handleDelete = async (index) => {
    const produtoExcluir = filteredData[index];
    if (window.confirm(`Tem certeza que deseja excluir ${produtoExcluir.atr.name}?`)) {
      try {
        await axios.delete(api_url + 'estoque', { headers: config.headers, data : { id : produtoExcluir.id } } );
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
      }
      finally {
        fetchData();
      }
    }
  };

  useEffect(() => {
    const sortData = () => {
      const filteredData_ = data.filter((item) => {
        if (selectedFilter.length === 0) return true;
        return selectedFilter.includes(item.cat);
      });

      const sortedData = [...filteredData_].sort((a, b) => {
        var valueA = isNaN(+ a.atr[currentSort]) ? a.atr[currentSort] : + a.atr[currentSort];
        var valueB = isNaN(+ b.atr[currentSort]) ? b.atr[currentSort] : + b.atr[currentSort];
        
        if (currentSort === 'expiration') {
          if (asc) {
            if (valueA === 'NA') valueA = '3050-12-31';
            if (valueB === 'NA') valueB = '3050-12-31';
            return (new Date(valueA) - new Date(valueB));
          } else {
            if (valueA === 'NA') valueA = '2000-12-31';
            if (valueB === 'NA') valueB = '2000-12-31';
            return (new Date(valueB) - new Date(valueA));
          }
        }
        
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return asc ? valueA - valueB : valueB - valueA;
        }
        else if (typeof valueA === 'string' && typeof valueB === 'string') {
          if (asc) return valueA.localeCompare(valueB);
          else return valueB.localeCompare(valueA);
        }
        else {
          return 0; 
        }

      });
      setFilteredData(sortedData);
      // console.log(sortedData);
    };
    // console.log("entrou no use")
    sortData();
  }, [data, currentSort, asc, selectedFilter]); // Dependencies

  function changeSorting(field)
  {
    // console.log(field)
    if (field === currentSort) {
      setAsc(!asc); 
    } else {
      setCurrentSort(field);
      setAsc(true)
    }
  }

  if (loading) return <div id='loading'>
    <SpinnerLoading></SpinnerLoading>
  </div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="filter-container">
        <span>
          <FontAwesomeIcon id="filter-icon" icon={faFilter} className="action-icon"/>
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
          className={`filter-option ${selectedFilter.includes('roupa') ? 'selected' : ''}`}
          onClick={() => toggleFilter('roupa')}
        >
          Roupa
        </span>
      </div>
      <div id="tabela" style={{ maxHeight: "300px", overflowY: "auto" , overflowX : "auto"}}>
        <Table striped bordered hover>
          <thead style={{ position: "sticky", 
              top: "0" }}>
            <tr>
              <th>
                Produto 
                <FontAwesomeIcon onClick={() => changeSorting('name')} icon={currentSort === 'name' && asc ? faArrowUpAZ : faArrowDownAZ} className="action-icon"/>
              </th>
              <th>
                Marca
                <FontAwesomeIcon onClick={() => changeSorting('brand')} icon={currentSort === 'brand' && asc ? faArrowUpAZ : faArrowDownAZ} className="action-icon"/>
              </th>
              <th>
                Estoque
                <FontAwesomeIcon onClick={() => changeSorting('quantity')} icon={currentSort === 'quantity' && asc ? faArrowUp19 : faArrowDown19} className="action-icon"/>
              </th>
              <th>
                Validade
                <FontAwesomeIcon onClick={() => changeSorting('expiration')} icon={currentSort === 'expiration' && asc ? faArrowDown : faArrowUp} className="action-icon"/>
              </th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="table-row">
                <td>{item.atr.name}</td>
                <td>{item.atr.brand}</td>
                <td>{item.atr.quantity}</td>
                <td>{item.atr.expiration}</td>
                <td className="actions">
                  <FontAwesomeIcon icon={faEdit} onClick={() => handleUpdate(index)} className="action-icon" />
                  <FontAwesomeIcon id="trash-icon" icon={faTrash} onClick={() => handleDelete(index)} className="action-icon" />
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
              {
                produtoSelecionado?.atr.expiration !== 'NA' && ( 
                  <Form.Group controlId="formValidade">
                    <Form.Label>Validade</Form.Label>
                    <Form.Control
                      type="date"
                      value={produtoSelecionado?.atr.expiration || ''}
                      onChange={(e) =>
                        setProdutoSelecionado((prev) => ({
                          ...prev,
                          atr: { ...prev.atr, expiration: e.target.value },
                        }))
                      }
                    />
                  </Form.Group>
                )
              }
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
          <button type="submit" onClick={handleSubmit}>Salvar Alterações</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TabelaProdutos;
