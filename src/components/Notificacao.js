import React from "react";
import "../styles/Notificacao.css";

const Notificacao = ({ message }) => {
  if (!message) return null;

  return <div className="notificacao">{message}</div>;
};

export default Notificacao;
