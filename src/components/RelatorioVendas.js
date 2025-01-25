import React from "react";
import "../styles/RelatorioVendas.css";

const RelatorioVendas = ({ vendas }) => {
  return (
    <div>
      <h2>Relatório de Vendas</h2>
      {vendas.length === 0 ? (
        <p>Ainda não há registros de vendas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Litros</th>
              <th>Total (R$)</th>
              <th>Data e Hora</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda, index) => (
              <tr key={index}>
                <td>{venda.tipoCombustivel}</td>
                <td>{venda.litros}</td>
                <td>{venda.total}</td>
                <td>{venda.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RelatorioVendas;
