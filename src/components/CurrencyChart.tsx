import { Box, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useStore } from "../hooks/useStore";
import { getTimeSeries } from "../services/frankfurter";

const CurrencyChart = () => {
  const [rates, setRates] = useState<any>({});
  const [selectedOption, setSelectedOption] = useState<string>("");

  const { toCurrency } = useStore();

  useEffect(() => {
    const fetchRates = async (startDate: string) => {
      try {
        const data = await getTimeSeries("USD", toCurrency, startDate);
        setRates(data.rates || {});
        console.log(data)
      } catch (error) {
        console.error("Error fetching rates", error);
      }
    };

    const calculateDates = () => {
      const endDate = new Date();
      let startDate = new Date();

      switch (selectedOption) {
        case "7days":
          startDate.setDate(endDate.getDate() - 7);
          break;
        case "3months":
          startDate.setMonth(endDate.getMonth() - 3);
          break;
        case "6months":
          startDate.setMonth(endDate.getMonth() - 6);
          break;
        default:
          return;
      }

      fetchRates(startDate.toISOString().split("T")[0]);
    };

    if (selectedOption) {
      calculateDates();
    }
  }, [selectedOption, toCurrency]);

  const data = Object.keys(rates).map((date) => ({
    date,
    value: rates[date]?.[toCurrency] || 0,
  }));

  console.log(data); // Verifica que los datos están correctamente formateados

  return (
    <Box w="100%" display="flex" flexDirection="column" alignItems="center">
      <Box>
        <Select
          maxWidth="300px"
          placeholder="Seleccione una opción"
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="7days">7 días</option>
          <option value="3months">3 meses</option>
          <option value="6months">6 meses</option>
        </Select>
      </Box>
      <Box w="60%" h="300px">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" name={toCurrency.toString()} stroke="#4b7fce" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default CurrencyChart;
