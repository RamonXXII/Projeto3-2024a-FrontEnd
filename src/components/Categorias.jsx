import React, { useState } from 'react';

function Categorias() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <label htmlFor="exampleDataList" className="form-label">Escolha a categoria do item a ser armazenado</label>
      <input
        className="form-control"
        list="datalistOptions"
        id="exampleDataList"
        placeholder="Comida, Bebida, Roupas"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <datalist id="datalistOptions">
        <option value="Comida" />
        <option value="Bebida" />
        <option value="Roupas" />
      </datalist>
    </div>
  );
}

export default Categorias;
