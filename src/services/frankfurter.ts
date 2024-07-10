import { API_HOST } from '../utils/constants'
import { Currency } from '../utils/types'

export const getAllCurrencies = async () => {
    const response = await fetch(`${API_HOST}/currencies`)
    const data = await response.json()
    
    return data
}

export const getConversionFromCurrency = async (fromCurrency: Currency, toCurrency: Currency, amount: string) => {
    const response = await fetch(`${API_HOST}/latest?amount=${amount}&from=${fromCurrency.toString()}&to=${toCurrency.toString()}`)
    const data = await response.json()
    
    return data
}