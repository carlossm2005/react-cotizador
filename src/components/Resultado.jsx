import styled from "@emotion/styled";

const ResultadoDiv = styled.div`
    color: white;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`
const Texto = styled.p`
    font-size: 18px;
    span{
        font-weight: 700;
    }
`
const Imagen = styled.img`
    display: block;
    width: 150px;
`
const Precio = styled.p`
    font-size: 30px;
    span{
        font-weight: 700;
    }
`

const Resultado = ({resultado}) => {
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = resultado;
    return (
        <ResultadoDiv>
            <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="Img cripto" />
            <Precio>El Precio es de:<span>{PRICE}</span></Precio>
            <Texto>Precio más alto del día:<span>{HIGHDAY}</span></Texto>
            <Texto>Precio más bajo del día:<span>{LOWDAY}</span></Texto>
            <Texto>Variación Últimas 24 horas:<span>{CHANGEPCT24HOUR}</span></Texto>
            <Texto>Última Actualización:<span>{LASTUPDATE}</span></Texto>
        </ResultadoDiv>
    )
}

export default Resultado