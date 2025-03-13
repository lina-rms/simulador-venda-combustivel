import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import RegistroVenda from "./components/RegistroVenda";
import RelatorioVendas from "./components/RelatorioVendas";
import Notificacao from "./components/Notificacao";
import "./styles/App.css";

const App = () => {
  const [telaAtiva, setTelaAtiva] = useState("registro");
  const [vendas, setVendas] = useState([]);
  const [feedback, setFeedback] = useState("");

  //recupera os preços ou setta o padrão
  const precosIniciais = JSON.parse(localStorage.getItem("precos")) || {
    Gasolina: 6.5,
    Etanol: 4.8,
    Diesel: 5.2,
  };

  const [precos, setPrecos] = useState(precosIniciais);

  //carrega vendas do localStorage ao iniciar
  useEffect(() => {
    const vendasSalvas = JSON.parse(localStorage.getItem("vendas")) || [];
    setVendas(vendasSalvas);
  }, []);

  //adiciona venda e salva no localStorage
  const addVenda = (venda) => {
    const novasVendas = [...vendas, venda];
    setVendas(novasVendas);
    localStorage.setItem("vendas", JSON.stringify(novasVendas)); //localStorage
    setFeedback("Venda registrada com sucesso!");

    setTimeout(() => {
      setFeedback("");
    }, 3000);
  };

  //atualiza preços e salva no localStorage
  const atualizarPrecos = (precosAtualizados) => {
    setPrecos(precosAtualizados);
    localStorage.setItem("precos", JSON.stringify(precosAtualizados)); //salva os preços
  };

  const alternarTela = () => {
    setTelaAtiva((telaAnterior) =>
      telaAnterior === "registro" ? "relatorio" : "registro"
    );
  };

  return (
    <div>
      <Header
        titulo="Simulador de Venda de Combustível"
        alternarTela={alternarTela}
        isRegistro={telaAtiva === "registro"}
      />

      <main>
        {telaAtiva === "registro" && (
          <div>
            <RegistroVenda
              addVenda={addVenda}
              precos={precos}
              atualizarPrecos={atualizarPrecos}
            />
            <Notificacao message={feedback} />
          </div>
        )}
        {telaAtiva === "relatorio" && <RelatorioVendas vendas={vendas} />}
      </main>
    </div>
  );
};

export default App;
