import React, { useState } from 'react';

function Categorias(props) {
  const [category, setCategory] = useState('');

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    // Chama a função de callback passada como prop para enviar o valor selecionado
    props.onCategoryChange(selectedCategory);
    console.log('Categoria selecionada:', selectedCategory);
  };

  return (
    <div>
      <div>
        <label htmlFor="category">Categoria:</label>
        <select id="category" value={category} onChange={handleCategoryChange}>
          <option value="">Selecione uma categoria</option>
          <option value="roupa">Roupa</option>
          <option value="comida">Comida</option>
          <option value="bebida">Bebida</option>
        </select>
      </div>
    </div>
  );
}

export default Categorias;
