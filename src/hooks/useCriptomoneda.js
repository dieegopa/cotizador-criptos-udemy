import React from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  font-family: "Bebas Neue", cursive;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;

const useCriptomoneda = (label, stateInicial, opciones) => {
  const [state, setState] = React.useState(stateInicial);

  const SeleccionarCripto = () => {
    return (
      <>
        <Label htmlFor="moneda">{label}</Label>
        <Select
          name="moneda"
          id="moneda"
          onChange={(e) => setState(e.target.value)}
          value={state}
        >
          <option value="">- Selecciona una opcion -</option>
          {opciones.map((item) => {
            return (
              <option value={item.CoinInfo.Name} key={item.CoinInfo.Id}>
                {item.CoinInfo.FullName}
              </option>
            );
          })}
        </Select>
      </>
    );
  };

  return [state, SeleccionarCripto, setState];
};

export default useCriptomoneda;
