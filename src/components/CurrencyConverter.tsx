import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useStore } from "../hooks/useStore";
import { getConversionFromCurrency } from "../services/frankfurter";
import CurrencySelector from "./CurrencySelector";
import FlexWrapper from "./FlexWrapper";
import { SwapIcon } from "./Icons";
import { useCurrenciesString } from "../hooks/useCurrencies";

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
      setResult(data.rates[toCurrency.toString()].toFixed(2).toString());
    };
    getConversion();
  }, [fromCurrency, toCurrency, amount]);

  return (
    <Box
      h="90vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Text as={"h1"}>
        <Text fontSize={"15px"} color={"gray.500"} fontWeight={"semibold"}>
          {amount.toString() +
            " " +
            useCurrenciesString(fromCurrency.toString()) +
            " ="}
        </Text>
        <Text fontSize={"30px"} color={"gray.700"} fontWeight={"bold"}>
          {result.toString() + " " + useCurrenciesString(toCurrency.toString())}
        </Text>
      </Text>
      <Flex flexDirection="row">
        <FlexWrapper>
          <CurrencySelector
            onChange={setFromCurrency}
            selectorValue={fromCurrency}
            ignoreValue={toCurrency}
          />
          <Input
            onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
              const inputValue = event.target.value;
              setAmount(inputValue);
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
            ignoreValue={fromCurrency}
          />
          <Input
            onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
              const inputValue = event.target.value;
              setResult(inputValue);
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
