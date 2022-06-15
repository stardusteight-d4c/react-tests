import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App, { calcularNovoSaldo } from "./App";

describe("Componente principal.", () => {
  describe("Quando o componente ser renderizado:", () => {
    it("O nome do banco é exibido.", () => {
      render(<App />);
      expect(screen.getByText("ByteBank")).toBeInTheDocument();
    });

    it("O saldo é exibido.", () => {
      render(<App />);
      expect(screen.getByText("Saldo:")).toBeInTheDocument();
    });

    it("O botão <Realizar operação> é exibido.", () => {
      render(<App />);
      expect(screen.getByText("Realizar operação")).toBeInTheDocument();
    });
  });

  describe("Quando o usuário clicar no botão <Realizar operação>:", () => {
    it("Realizando um saque, o saldo é decrementado.", () => {
      render(<App />);
      const novoSaldo = calcularNovoSaldo(
        { transacao: "saque", valor: 50 },
        150
      );
      expect(novoSaldo).toBe(100);
    });

    it("Realizando um depósito, o saldo é incrementado.", () => {
      render(<App />);
      const novoSaldo = calcularNovoSaldo(
        { transacao: "deposito", valor: 50 },
        150
      );
      expect(novoSaldo).toBe(200);
    });

    it("Ao realizar o saque, a transação deve ser relizada", () => {
     render(<App />);

      const saldo = screen.getByText("R$ 1000");
      const transacao = screen.getByLabelText("Saque");
      const valor = screen.getByTestId("valor");
      const botaoTransacao = screen.getByText("Realizar operação");

      expect(saldo.textContent).toBe("R$ 1000");

      fireEvent.click(transacao, { target: { value: 'saque' }});
      fireEvent.change(valor, { target: { value: 10}});
      fireEvent.click(botaoTransacao);

      expect(saldo.textContent).toBe('R$ 990');
    });
  });
});
