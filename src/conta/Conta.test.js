import { fireEvent, render, screen } from "@testing-library/react";
import Conta from "./Conta";

describe("Camponente de conta", () => {
  it("Exibir o saldo da conta como valor monetário", () => {
    render(<Conta saldo={1000} />);
    const saldo = screen.getByTestId("saldo-conta");
    expect(saldo.textContent).toBe("R$ 1000");
  });

  it("A função de realizar a transação deve ser chamada ao clicar no botão <Realizar operação>", () => {
    const funcaoRealizarTransacao = jest.fn();
    render(<Conta saldo={1000} realizarTransacao={funcaoRealizarTransacao} />);

    fireEvent.click(screen.getByText("Realizar operação"));

    expect(funcaoRealizarTransacao).toHaveBeenCalled();
  });
});
