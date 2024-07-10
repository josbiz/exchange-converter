import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import { useEffect } from "react";

import CurrencySelector from "./components/CurrencySelector";
import FlexWrapper from "./components/FlexWrapper";
import { Logo, SwapIcon } from "./components/Icons";
import { useStore } from "./hooks/useStore";
import { getConversionFromCurrency } from "./services/frankfurter";

function App() {
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
  } = useStore();

  useEffect(() => {
    // si cambia el amount ejecute el getConversion con amount
    const getConversion = async () => {
      const data = await getConversionFromCurrency(
        fromCurrency,
        toCurrency,
        amount
      );
      setResult(data.rates[toCurrency]);
    };
    getConversion();
  }, [fromCurrency, toCurrency, amount]);

  return (
    <Box height="100vh" width="100%">
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Flex
          flexDirection="row"
          justifyContent="center"
          alignContent="center"
          mb={10}
          p={2}
        >
          <Box h="35px" w="35px" mx={2}>
            <Logo />
          </Box>
          <Heading as="h2" size="lg">
            Exchange Converter
          </Heading>
        </Flex>
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
                setResult(data.rates[toCurrency]);
              }}
              value={amount}
              m={2}
            />
          </FlexWrapper>
          <FlexWrapper>
            <Button variant="link" padding={2} onClick={switchCurrencies}>
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
                setAmount(data.rates[fromCurrency]);
              }}
              value={result}
              m={2}
            />
          </FlexWrapper>
        </Flex>
        <Box textAlign="center" fontSize={10} pt="100">
          Made by Josbiz
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
