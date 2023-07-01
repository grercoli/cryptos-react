import { useState, useEffect } from 'react'
import styled from '@emotion/styled'

import Error from './Error';
import { currencies } from '../data/currencies';

import useSelectOptions from '../hooks/useSelectOptions';

const InputSubmit = styled.input`
  background-color: #9497FF;
  border: none;
  width: 100%;
  padding: 10px;
  color: #FFF;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color .3s ease;
  margin-top: 30px;
  &:hover {
    background-color: #7A7DFE;
    cursor: pointer;
  }
`;

const Form = ({ setCurrencies }) => {
  const [cryptos, setCryptos] = useState([]);
  const [error, setError] = useState(false);

  const [ currency, SelectCurrencies ] = useSelectOptions('Choose your currency', currencies);
  const [ crypto, SelectCryptos ] = useSelectOptions('Choose your crypto', cryptos);

  useEffect(() => {
    const fetchCryptos = async () => {
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
      const response = await fetch(url);
      const data = await response.json();

      const cryptosList = data.Data.map(crypto => {
        const item = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName
        }

        return item;
      })

      setCryptos(cryptosList);
    }

    fetchCryptos();
  }, []);

  const handleSubmit = e => {
    e.preventDefault()

    if ([currency, crypto].includes('')) {
      setError(true);
      return;
    }

    setError(false);
    setCurrencies({
      currency,
      crypto
    });
  }

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
    
      <form onSubmit={handleSubmit}>
        <SelectCurrencies />
        <SelectCryptos />
        <InputSubmit type="submit" value="Quote" />
      </form>
    </>
  )
}

export default Form
