import React, { useState } from "react";
import RegistroVenda from "./components/RegistroVenda";
//import RelatorioVendas from "./components/RelatorioVendas";
import Notificacao from "./components/Notificacao";
import "./index.css";

const App = () => {
  const [telaAtiva, setTelaAtiva] = useState("registro"); // Estado para controlar a tela ativa
  const [vendas, setVendas] = useState([]); // Lista de vendas
  const [feedback, setFeedback] = useState(""); // Feedback
  const [precos, setPrecos] = useState({
    gasolina: 6.5,
    etanol: 4.8,
    diesel: 5.2,
  }); // Preços iniciais dos combustíveis

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

  return (
    <div>
      <header>
        <h1>Simulador de Venda de Combustível</h1>
        <nav>
          {telaAtiva === "registro" && (
            <button onClick={() => setTelaAtiva("relatorio")}>
              Ver Relatório
            </button>
          )}
          {telaAtiva === "relatorio" && (
            <button onClick={() => setTelaAtiva("registro")}>
              Registrar Venda
            </button>
          )}
        </nav>
      </header>

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
        {/*telaAtiva === "relatorio" && <RelatorioVendas sales={vendas} />*/}
      </main>
    </div>
  );
};

export default App;
