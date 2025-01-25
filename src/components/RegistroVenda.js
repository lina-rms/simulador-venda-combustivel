import React, { useState } from "react";
import "../styles/RegistroVenda.css";

const RegistroVenda = ({ addVenda, precos, atualizarPrecos }) => {
  const [litros, setLitros] = useState(""); //quantidade de litros de combustivel
  const [tipoCombustivel, setTipoCombustivel] = useState("Gasolina"); //tipo de combustivel
  const [precoEditavel, setPrecoEditavel] = useState(precos[tipoCombustivel]); //preço do combustivel
  const [error, setError] = useState(""); //mensagem de erro

  //atualização do preço dos combustiveis
  const handleprecoEditavel = (valor) => {
    const precoAtualizado = parseFloat(valor) || 0;
    setPrecoEditavel(precoAtualizado);
    atualizarPrecos({ ...precos, [tipoCombustivel]: precoAtualizado }); //atualiza o preço globalmente
  };

  //exibição do preço correspondente ao tipo de combustivel selecionado
  const handleAlterarTipoCombustivel = (tipo) => {
    setTipoCombustivel(tipo);
    setPrecoEditavel(precos[tipo]);
  };

  const handleEnvioForm = (e) => {
    e.preventDefault();

    //garante que a quantidade de litros seja maior que 0
    if (parseFloat(litros) <= 0 || isNaN(litros)) {
      setError("A quantidade de litros deve ser maior que 0.");
      return; //evita o envio do formulário
    }

    //limpa a mensagem de erro se a validação for bem-sucedida
    setError("");

    const total = litros * precoEditavel; //total da venda
    addVenda({
      tipoCombustivel,
      litros: parseFloat(litros),
      total: total.toFixed(2),
      data: new Date().toLocaleString(), //data e hora da venda
    });
    setLitros(""); //limpa o campo de litros
  };

  return (
    <div>
      <h2>Registro de Venda</h2>
      <form onSubmit={handleEnvioForm}>
        <label>
          Tipo de combustível:
          <select
            value={tipoCombustivel}
            onChange={(e) => handleAlterarTipoCombustivel(e.target.value)}
          >
            <option value="Gasolina">Gasolina</option>
            <option value="Etanol">Etanol</option>
            <option value="Diesel">Diesel</option>
          </select>
        </label>
        <label>
          Preço por litro (R$):
          <input
            type="number"
            value={precoEditavel}
            onChange={(e) => handleprecoEditavel(e.target.value)}
            step="0.01"
            min="0"
          />
        </label>
        <label>
          Quantidade (litros):
          <input
            type="number"
            value={litros}
            onChange={(e) => setLitros(e.target.value)}
            required
            className={error ? "input-error" : ""}
          />
        </label>

        {error && <div className="error-message">{error}</div>}

        <div className="register-button">
          <button type="submit">Registrar Venda</button>
        </div>
      </form>
    </div>
  );
};

export default RegistroVenda;
