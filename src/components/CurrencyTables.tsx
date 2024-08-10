import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
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
    <TableContainer>
      <Table size="md" variant="striped">
        <Thead>
          <Tr backgroundColor="#2D3748">
            <Th textColor="white" textAlign="center">
              {fromCurrency.toString()}
            </Th>
            <Th textColor="white" textAlign="center">
              {toCurrency.toString()}
            </Th>
          </Tr>
          <Tr>
            <Th textAlign="center">To convert</Th>
            <Th textAlign="center">into</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cuantities.map((cuantity) => (
            <Tr key={cuantity}>
              <Td textAlign="center">{cuantity}</Td>
              <Td textAlign="center">{cells[cuantity] ?? "-"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default CurrencyTables;
