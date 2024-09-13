import { Box, Select, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getTimeSeries } from "../services/frankfurter";
import { Currency } from "../utils/types";

const CurrencyChart = ({
  fromCurrency,
  toCurrency,
}: {
  toCurrency: Currency;
  fromCurrency: Currency;
}) => {
  const [rates, setRates] = useState<Record<string, Record<Currency, number>>>(
    {}
  );
  const [selectedOption, setSelectedOption] = useState<string>("14days");

  useEffect(() => {
    const fetchRates = async (startDate: string) => {
      try {
        const data = await getTimeSeries(fromCurrency, toCurrency, startDate);
        setRates(data.rates || {});
      } catch (error) {
        console.error("Error fetching rates", error);
      }
    };

    const calculateDates = () => {
      const endDate = new Date();
      const startDate = new Date();

      switch (selectedOption) {
        case "14days":
          startDate.setDate(endDate.getDate() - 14);
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
  }, [selectedOption, toCurrency, fromCurrency]);

  const data = Object.keys(rates).map((date) => ({
    date,
    value: rates[date]?.[toCurrency] || 0,
  }));

  const minValue = Math.min(...data.map((item) => item.value)).toFixed(2);
  const maxValue = Math.max(...data.map((item) => item.value)).toFixed(2);

  return (
    <Box w={["90%", "80%", "50%"]} display="flex" flexDirection="column" alignItems="center" id="chart" my={"100px"}>
      <Box w="100%" display={"flex"} justifyContent={"flex-start"} my={4}>
        <Text as={"h1"}>
        <Text fontSize={"15px"} color={"gray.500"} fontWeight={"semibold"}>
        Currency history from
        </Text>
        <Text fontSize={"30px"} color={"gray.700"} fontWeight={"bold"}>
          {fromCurrency.toString()} to {toCurrency.toString()}
        </Text>
      </Text>
      </Box>
      <Box w="100%" display={"flex"} justifyContent={"flex-end"} my={4}>
        <Select
          maxWidth="300px"
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="14days">14 días</option>
          <option value="3months">3 meses</option>
          <option value="6months">6 meses</option>
        </Select>
      </Box>
      <Box
        w="100%"
        h="300px"
        background="#fafafa"
        p="10px"
        rounded="5px"
        userSelect="none"
        borderBottom={2}
        borderBottomColor={"black"}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeOpacity={0.1} vertical={false} />
            <XAxis dataKey="date" tickMargin={10} hide={true} />
            <YAxis
              domain={[minValue, maxValue]}
              axisLine={false}
              tick={{ fill: "darkgray" }}
              tickMargin={10}
              tickCount={5}
              padding={{ top: 5, bottom: 5 }}
              tickLine={false}
              tickFormatter={(value) =>
                Number.parseInt(value).toFixed(2).toString()
              } // Redondear los ticks al entero más cercano
            />
            <Tooltip />
            <Line
              dot={false}
              type="monotone"
              dataKey="value"
              name={toCurrency.toString()}
              stroke="#0454cd"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default CurrencyChart;
