import { Box, Select } from '@chakra-ui/react'

import { useCurrencies } from '../hooks/useCurrencies'
import { Currency } from '../utils/types'

interface Props {
  onChange: (currency: Currency) => void,
  selectorValue: Currency
}

function CurrencySelector({ onChange, selectorValue }: Props) {
  const currencies = useCurrencies()
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Currency)
  }
  return (
    <Box my={2}>
      <Select onChange={handleChange} value={selectorValue.toString()}>
        {currencies && Object.entries(currencies).map(([key, value]) => (
          <option key={key} value={key}>
            {`${key} - ${value}`} 
          </option>
        ))}
      </Select>
    </Box>
  )
}

export default CurrencySelector
