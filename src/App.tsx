import { Box } from "@chakra-ui/react";
import "./App.css"

import CurrencyChart from "./components/CurrencyChart";
import CurrencyConverter from "./components/CurrencyConverter";
import CurrencyTables from "./components/CurrencyTables";
import FlexWrapper from "./components/FlexWrapper";
import Navbar from "./components/Navbar";
import { useStore } from "./hooks/useStore";
import Footer from "./components/Footer";
import TopButton from "./components/TopButton";

function App() {
  const store = useStore();

  return (
    <Box width="100%">
        <TopButton />
      <Navbar />
      <FlexWrapper>
        <CurrencyConverter store={store} />
        <CurrencyTables store={store} />
        <CurrencyChart
          fromCurrency={store.fromCurrency}
          toCurrency={store.toCurrency}
        />
        <Footer />
      </FlexWrapper>
    </Box>
  );
}

export default App;
