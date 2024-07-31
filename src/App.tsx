import { Box } from "@chakra-ui/react";

import CurrencyChart from "./components/CurrencyChart";
import CurrencyConverter from "./components/CurrencyConverter";
import FlexWrapper from "./components/FlexWrapper";

function App() {
  return (
    <Box width="100%">
      <FlexWrapper>
        <CurrencyConverter />
        <CurrencyChart />
        <Box textAlign="center" fontSize={10} pt="100">
          Made by Josbiz
        </Box>
      </FlexWrapper>
    </Box>
  );
}

export default App;
