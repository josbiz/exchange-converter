import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
  Box,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useStore } from "../hooks/useStore";
import { getConversionFromCurrency } from "../services/frankfurter";

function CurrencyTables({ store }: { store: ReturnType<typeof useStore> }) {
  const cuantities = [1, 5, 10, 25, 50, 100, 500, 1000, 5000, 10000];
  const [cells, setCells] = useState<Record<number, string>>({});
  const { fromCurrency, toCurrency } = store;

  useEffect(() => {
    const fetchConversions = async () => {
      const conversionPromises = cuantities.map(async (cuantity) => {
        const result = await getConversionFromCurrency(
          fromCurrency,
          toCurrency,
          cuantity.toString()
        );
        return {
          cuantity,
          convertedAmount: result.rates[toCurrency.toString()].toFixed(2),
        };
      });

      const conversions = await Promise.all(conversionPromises);
      const cellsData: Record<number, string> = {};
      conversions.forEach(({ cuantity, convertedAmount }) => {
        cellsData[cuantity] = convertedAmount;
      });
      setCells(cellsData);
    };

    fetchConversions();
  }, [fromCurrency, toCurrency]);

  return (
    <Box id="common" backgroundColor={"gray.100"} p={10} rounded={5}>
      <Text as={"h1"}>
        <Text fontSize={"15px"} color={"gray.500"} fontWeight={"semibold"}>
          Common conversion rates from
        </Text>
        <Text fontSize={"30px"} color={"gray.700"} fontWeight={"bold"}>
          {fromCurrency.toString()} to {toCurrency.toString()}
        </Text>
      </Text>
      <Box
        w={"100%"}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems={"center"}
        my={8}
      >
        <TableContainer>
          <Table size="md" variant="striped" w="550px" backgroundColor={"#fff"}>
            <Thead>
              <Tr backgroundColor="#2D3748">
                <Th textColor="white" textAlign="center" verticalAlign="middle">
                  <Box textAlign="center">
                    <Image
                      src={`https://wise.com/web-art/assets/flags/${String(
                        fromCurrency.toString().toLowerCase()
                      )}.svg`}
                      alt={fromCurrency.toString()}
                      boxSize="20px"
                      mb={1}
                      mx="auto"
                    />
                    {fromCurrency.toString()}
                  </Box>
                </Th>
                <Th textColor="white" textAlign="center" verticalAlign="middle">
                  <Box textAlign="center">
                    <Image
                      src={`https://wise.com/web-art/assets/flags/${String(
                        toCurrency.toString().toLowerCase()
                      )}.svg`}
                      alt={toCurrency.toString()}
                      boxSize="20px"
                      mb={1}
                      mx="auto"
                    />
                    {toCurrency.toString()}
                  </Box>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {cuantities.map((cuantity) => (
                <Tr key={cuantity}>
                  <Td textAlign="center">{cuantity}</Td>
                  <Td textAlign="center" textColor={"#4A5568"}>
                    {cells[cuantity] ?? "-"}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default CurrencyTables;
