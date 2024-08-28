import {
  Text,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Image,
} from "@chakra-ui/react";
import { useCurrencies } from "../hooks/useCurrencies";
import { Currency } from "../utils/types";

const CurrencySelector = ({
  onChange,
  selectorValue,
  ignoreValue,
}: {
  onChange: (currency: Currency) => void;
  selectorValue: Currency;
  ignoreValue?: Currency;
}) => {
  const currencies = useCurrencies();

  // Filter out the ignored currency
  const filteredCurrencies = currencies ? 
    Object.entries(currencies).filter(([key]) => key !== ignoreValue) : [];

  return (
    <Box my={2} w="100%">
      <Menu>
        <MenuButton
          as={Button}
          w="100%"
          textAlign="left"
          rightIcon={
            <Image
              src={`https://wise.com/web-art/assets/flags/${String(
                selectorValue.toString().toLowerCase()
              )}.svg`}
              alt={selectorValue.toString()}
              height={5}
            />
          }
        >
          {selectorValue.toString()}
        </MenuButton>
        <MenuList w="100%" overflowY={"scroll"} height={"250px"}>
          {filteredCurrencies.map(([key, value]) => (
            <MenuItem key={key} onClick={() => onChange(key as Currency)}>
              <Image
                src={`https://wise.com/web-art/assets/flags/${String(
                  key.toString().toLowerCase()
                )}.svg`}
                alt={key}
                boxSize="20px"
                mr={2}
              />
              <Text as={"b"}>{key}</Text>
              {`: ${value}`}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default CurrencySelector;
