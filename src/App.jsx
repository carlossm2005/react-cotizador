import styled from '@emotion/styled'
import ImagenCripto from './img/imagen-criptos.png'
import Formulario from './components/Formulario'
import { useEffect, useState } from 'react'
import Resultado from './components/Resultado'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`
const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

function App() {

  const [ monedas, setMonedas ] = useState({});
  const [ resultado, setResultado ] = useState({});

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {

        const CotizarCripto = async () => {

          const {criptoMoneda, moneda} = monedas

          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;

          const respuesta = await fetch(url);
          const respJson = await respuesta.json();

          setResultado(respJson.DISPLAY[criptoMoneda][moneda])

      }
      
      CotizarCripto()
    }
  }, [monedas])
  

  return (
    <Contenedor>
      <Imagen
        src={ImagenCripto}
      />
      <div>
        <Heading>
          Cotiza Criptomonedas Al Instante
        </Heading>
        <Formulario
          setMonedas = {setMonedas}
        />
        {resultado.PRICE && <Resultado  resultado={resultado}/>}
      </div>
    </Contenedor>
  )
}

export default App
