import { Box } from "@chakra-ui/react";

import { useState } from "react";
import CurrencyChart from "./components/CurrencyChart";
import CurrencyConverter from "./components/CurrencyConverter";
import FlexWrapper from "./components/FlexWrapper";
import { Currency } from "./utils/types";

function App() {

  const [currencyToUse, setCurrencyToUse] = useState<Currency>("");

  return (
    <Box width="100%">
      <FlexWrapper>
        <CurrencyConverter setCurrencyToChart={setCurrencyToUse}/>
        <CurrencyChart currency={currencyToUse} />
        <Box textAlign="center" fontSize={10} pt="100">
          Made by Josbiz
        </Box>
      </FlexWrapper>
    </Box>
  );
}

export default App;
