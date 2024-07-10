import { useEffect, useState } from 'react'

import { getAllCurrencies } from '../services/frankfurter'

export function useCurrencies() {
  const [currencies, setCurrencies] = useState(null)

  useEffect(() => {
    const fetchCurrencies = async () => {
      const data = await getAllCurrencies()
      setCurrencies(data)
    }

    fetchCurrencies()
  }, [])

  return currencies
}
