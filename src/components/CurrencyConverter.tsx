import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { useStore } from "../hooks/useStore";
import { getConversionFromCurrency } from "../services/frankfurter";
import CurrencySelector from "./CurrencySelector";
import FlexWrapper from "./FlexWrapper";
import { SwapIcon } from "./Icons";

function CurrencyConverter({ store }: { store: ReturnType<typeof useStore> }) {
  const {
    setFromCurrency,
    setToCurrency,
    switchCurrencies,
    setAmount,
    setResult,
    fromCurrency,
    toCurrency,
    amount,
    result,
  } = store;

  const [rotated, setRotated] = useState(false);

  useEffect(() => {
    // si cambia el amount ejecute el getConversion con amount
    const getConversion = async () => {
      const data = await getConversionFromCurrency(
        fromCurrency,
        toCurrency,
        amount
      );
      setResult(data.rates[toCurrency.toString()].toString());
    };
    getConversion();
  }, [fromCurrency, toCurrency, amount]);

  return (
    <Box
      h="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Flex flexDirection="row">
        <FlexWrapper>
          <CurrencySelector
            onChange={setFromCurrency}
            selectorValue={fromCurrency}
          />
          <Input
            onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
              const inputValue = event.target.value;
              setAmount(inputValue);
              const data = await getConversionFromCurrency(
                fromCurrency,
                toCurrency,
                inputValue
              );
              setResult(data.rates.currency.toString());  
            }}
            value={amount}
            m={2}
          />
        </FlexWrapper>
        <FlexWrapper>
          <Button
            variant="link"
            padding={2}
            transform={rotated ? "rotate(180deg)" : "rotate(0deg)"}
            transition="transform 0.3s ease"
            onClick={() => {
              switchCurrencies();
              setRotated(!rotated);
            }}
          >
            <SwapIcon />
          </Button>
        </FlexWrapper>
        <FlexWrapper>
          <CurrencySelector
            onChange={setToCurrency}
            selectorValue={toCurrency}
          />
          <Input
            onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
              const inputValue = event.target.value;
              setResult(inputValue);
              const data = await getConversionFromCurrency(
                toCurrency,
                fromCurrency,
                inputValue
              );
              setAmount(data.rates.currency.toString());
            }}
            value={result}
            m={2}
          />
        </FlexWrapper>
      </Flex>
    </Box>
  );
}

export default CurrencyConverter;
