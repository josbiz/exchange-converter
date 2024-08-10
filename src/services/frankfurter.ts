import { API_HOST } from "../utils/constants";
import { Currency, Conversion } from "../utils/types";


export const getAllCurrencies = async () => {
  const response = await fetch(`${API_HOST}/currencies`);
  const data = await response.json();

  return data;
};

export const getConversionFromCurrency = async (
  fromCurrency: Currency,
  toCurrency: Currency,
  amount: string
): Promise<Conversion> => {
  const response = await fetch(
    `${API_HOST}/latest?amount=${amount}&from=${fromCurrency.toString()}&to=${toCurrency.toString()}`
  );
  const data = await response.json();
  console.log(data); // Verifica que los datos se estén recibiendo correctamente
  return data;
};

export const getTimeSeries = async (
  fromCurrency: Currency,
  toCurrency: Currency,
  startDate: string
) => {
  const response = await fetch(
    `https://api.frankfurter.app/${startDate}..?from=${String(
      fromCurrency
    )}&to=${String(toCurrency)}`
  );
  if (!response.ok) {
    throw new Error("Error fetching rates");
  }
  const data = await response.json();
  console.log(data); // Verifica que los datos se estén recibiendo correctamente

  return data;
};
