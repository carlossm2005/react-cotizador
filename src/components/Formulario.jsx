import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import useSelectMonedas from '../hooks/useSelectMonedas'
import {monedas} from '../data/monedas'
import Error from './Error'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: white;
    font-weight: 700;
    font-size: 20px;
`
const Formulario = ({setMonedas}) => {
    const [criptos, setCriptos] = useState([]);

    const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas);
    const [ criptoMoneda, SelectCriptomonedas ] = useSelectMonedas('Elige tu Moneda', criptos);
    const [ error, setError ] = useState(false)

    const handleSubmit = e =>{
        e.preventDefault()
        if ([moneda, criptoMoneda].includes('')) {
            setError(true)
        } else{
            setError(false)
            console.log(moneda, criptoMoneda)
            setMonedas({
                moneda,
                criptoMoneda
            })
        }
    }
         
    useEffect(() =>{
        const consultarAPI = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            const arrayCriptos = resultado.Data.map( cripto => {

                const objecto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objecto
            })

            setCriptos(arrayCriptos)
        };
        consultarAPI();
    }, []);

  return (
    <>
    {error && <Error>Todos los campos son obligatorios</Error>}
    <form
        onSubmit={handleSubmit}
    >
        <SelectMonedas/>
        <SelectCriptomonedas/>
        <InputSubmit type="submit" value="Cotizar" />
    </form>
    </>
  )
}

export default Formulario