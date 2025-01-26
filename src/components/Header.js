import React from "react";
import "../styles/Header.css";

const Header = ({ titulo, alternarTela, isRegistro }) => {
  return (
    <header>
      <h1>{titulo}</h1>
      <nav>
        <button className="alternaTela" onClick={alternarTela}>
          {isRegistro ? "Ver Relatório" : "Registrar Venda"}
        </button>
      </nav>
    </header>
  );
};

export default Header;
