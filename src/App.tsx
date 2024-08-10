import { Box } from "@chakra-ui/react";

import CurrencyChart from "./components/CurrencyChart";
import CurrencyConverter from "./components/CurrencyConverter";
import CurrencyTables from "./components/CurrencyTables";
import FlexWrapper from "./components/FlexWrapper";
import Navbar from "./components/Navbar";
import { useStore } from "./hooks/useStore";

function App() {
  const store = useStore();

  return (
    <Box width="100%">
      <Navbar />
      <FlexWrapper>
        <CurrencyConverter store={store}/>
        <CurrencyTables store={store}/>
        <CurrencyChart currency={store.toCurrency} />
        <Box textAlign="center" fontSize={10} pt="100">
          Made by Josbiz
        </Box>
      </FlexWrapper>
    </Box>
  );
}

export default App;
