import React, { useState } from "react";
import Header from "./components/Header";
import RegistroVenda from "./components/RegistroVenda";
import RelatorioVendas from "./components/RelatorioVendas";
import Notificacao from "./components/Notificacao";
import "./styles/App.css";

const App = () => {
  const [telaAtiva, setTelaAtiva] = useState("registro"); //estado para controlar a tela ativa
  const [vendas, setVendas] = useState([]); //lista de vendas
  const [feedback, setFeedback] = useState(""); //feedback
  const [precos, setPrecos] = useState({
    Gasolina: 6.5,
    Etanol: 4.8,
    Diesel: 5.2,
  }); //preços iniciais dos combustíveis

  const addVenda = (venda) => {
    setVendas((vendasAnteriores) => [...vendasAnteriores, venda]);
    setFeedback("Venda registrada com sucesso!"); //mensagem de confirmação de venda

    //limpa a mensagem após 3 segundos
    setTimeout(() => {
      setFeedback("");
    }, 3000);
  };

  const atualizarPrecos = (precosAtualizados) => {
    setPrecos(precosAtualizados); //atualiza os preços dos combustíveis
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
        {/* renderização condicional com base no estado da tela */}
        {telaAtiva === "registro" && (
          <div>
            <RegistroVenda
              addVenda={addVenda}
              precos={precos}
              atualizarPrecos={atualizarPrecos}
            />
            {/* notificação de venda */}
            <Notificacao message={feedback} />
          </div>
        )}
        {telaAtiva === "relatorio" && <RelatorioVendas vendas={vendas} />}
      </main>
    </div>
  );
};

export default App;
