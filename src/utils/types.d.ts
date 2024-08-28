import { useCurrencies } from "../hooks/useCurrencies"

const currencies = useCurrencies()

export type Currency = keyof currencies

export type CurrencyString = currencies[Currency]

export interface State {
  fromCurrency: Currency
  toCurrency: Currency
  amount: string
  result: string
}

export interface Conversion {
  amount: number;
  base: string;
  date: string;
  rates: {
    [currency: string]: number;
  }
}

export type Action =
  | { type: 'SWITCH_CURRENCY' }
  | { type: 'SET_FROM_CURRENCY'; payload: Currency }
  | { type: 'SET_TO_CURRENCY'; payload: Currency }
  | { type: 'SET_AMOUNT'; payload: string }
  | { type: 'SET_RESULT'; payload: string }

export enum InputType {
  fromInput = 'from',
  toInput = 'to'
}