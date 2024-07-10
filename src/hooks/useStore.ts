import { useReducer } from 'react'

import { Action, Currency, type State } from '../utils/types'

const initialState: State = {
  fromCurrency: 'USD',
  toCurrency: 'MXN',
  amount: '1',
  result: '17'
}

function reducer(state: State, action: Action) {
  const { type } = action

  if (type === 'SWITCH_CURRENCY') {
    return {
      ...state,
      fromCurrency: state.toCurrency,
      toCurrency: state.fromCurrency,
    }
  }

  if (type === 'SET_FROM_CURRENCY') {
    return {
      ...state,
      fromCurrency: action.payload,
    }
  }

  if (type === 'SET_TO_CURRENCY') {
    return {
      ...state,
      toCurrency: action.payload,
    }
  }

  if (type === 'SET_AMOUNT') {
    return {
      ...state,
      loading: true,
      amount: action.payload,
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload,
    }
  }

  return state
}

export function useStore() {
  const [{ fromCurrency, toCurrency, amount, result }, dispatch] =
    useReducer(reducer, initialState)

  const switchCurrencies = () => {
    dispatch({ type: 'SWITCH_CURRENCY' })
  }

  const setFromCurrency = (payload: Currency) => {
    dispatch({ type: 'SET_FROM_CURRENCY', payload })
  }

  const setToCurrency = (payload: Currency) => {
    dispatch({ type: 'SET_TO_CURRENCY', payload })
  }

  const setAmount = (payload: string) => {
    dispatch({ type: 'SET_AMOUNT', payload })
  }

  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
  }

  return {
    fromCurrency,
    toCurrency,
    amount,
    result,
    switchCurrencies,
    setFromCurrency,
    setToCurrency,
    setAmount,
    setResult
  }
}
