import React from "react";
import styled from "@emotion/styled";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import axios from "axios";
import Error from "./Error";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: white;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({ setMoneda, setCriptomoneda }) => {
  const [listadoCriptos, setListadoCriptos] = React.useState([]);
  const [error, setError] = React.useState(false);

  const monedas = [
    { codigo: "USD", nombre: "Dolar Estadounidense" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
  ];

  const [moneda, SeleccionarMoneda] = useMoneda("Elige tu moneda", "", monedas);
  const [criptomoneda, SeleccionarCripto] = useCriptomoneda(
    "Elige tu Criptomoneda",
    "",
    listadoCriptos
  );

  React.useEffect(() => {
    const ConsultarAPI = async () => {
      try {
        const url =
          "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
        const resultado = await axios.get(url);

        setListadoCriptos(resultado.data.Data);
      } catch (error) {
        console.log(error);
      }
    };

    ConsultarAPI();
  }, []);

  const cotizarMoneda = (e) => {
    e.preventDefault();

    if (!moneda.trim() || !criptomoneda.trim()) {
      setError(true);
      return;
    }

    setError(false);
    setMoneda(moneda);
    setCriptomoneda(criptomoneda);
  };

  return (
    <form onSubmit={(e) => cotizarMoneda(e)}>
      {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
      <SeleccionarMoneda />
      <SeleccionarCripto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
