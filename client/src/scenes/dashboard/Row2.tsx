import React, { useMemo } from "react";
import DashboardBox from "@/components/DashboardBox";
import { useGetProductsQuery, useGetKpisQuery } from "@/state/api";
import BoxHeader from "@/components/BoxHeader";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Scatter,
  ScatterChart,
} from "recharts";
import { useTheme, Box, Typography } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";


//type Props = {};

const Row2 = (props: Props) => {
  const pieData = [
    { name: "Group A", value: 600 },
    { name: "Group B", value: 400 },
  ];

  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();

  const operationalExpenses = useMemo(() => {

    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            "Operational Expenses": operationalExpenses,
            "Non Operational Expenses": nonOperationalExpenses,
          };
        }
      )
    );
  }, [operationalData]);

  const ProductExpenseData = useMemo(() => {

    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price: price,
          expense: expense,
        };
      })
    );
  }, [productData]);

  return (
    <>
      <DashboardBox
        gridArea={"d"}
        mt={"-0.9rem"}
        ml={"-1rem"}
        sx={{ height: "240px" }}
      >
        <BoxHeader
          title="Operationals vs Non-Operationals Expenses"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalExpenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 70,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId={"left"}
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId={"right"}
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Line
              yAxisId={"left"}
              type={"monotone"}
              dataKey="Non Operational Expenses"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId={"right"}
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox
        gridArea={"e"}
        sx={{ height: "165px" }}
        mt={"-0.9rem"}
        ml={"-0.7rem"}
      >
        <BoxHeader title="Campaigns and Targets" sideText="+4%" subtitle="" />
        <FlexBetween mt={"0.25rem"} gap={"1.5rem"}>
          <PieChart
            width={110}
            height={100}
            margin={{
              top: -15,
              right: -10,
              left: -10,
              bottom: 3,
            }}
          >
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml={"-0.9rem"} flexBasis={"40%"} textAlign={"center"}>
            <Typography variant="h5">Target Sales</Typography>
            <Typography m={"0.3rem"} variant="h3" color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant="h6">
              Finance goals of the campaign that is desired
            </Typography>
          </Box>
          <Box flexBasis={"40%"} mb={"0.8rem"} mr={"-0.1rem"}>
            <Typography variant="h5" mb={"-0.3rem"} mr={"3rem"}>
              Losses in Revenue
            </Typography>
            <Typography variant="h6">Losses are down 25%</Typography>
            <Typography mt={"0.4rem"} variant="h5">
              Profit Margins
            </Typography>
            <Typography variant="h6">
              Margins are up by 30% from last month
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>

      <DashboardBox
        gridArea={"f"}
        mt={"-1rem"}
        ml={"-0.7rem"}
        sx={{ height: "235px" }}
      >
        <BoxHeader title="Product Prices vs Expenses" sideText="+4%" subtitle="" />
        <ResponsiveContainer width="100%" height={"100%"}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 30,
              left: 0,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={true}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="price"
              name="expense"
              axisLine={false}
              tickLine={true}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]} />
            
            <Tooltip
              formatter={(v) => `$${v}`}
              //cursor={{ strokeDasharray: "3 3" }}
            />
            <Scatter
              name="Product Expense Ratio"
              data={ProductExpenseData}
              fill="#f2b455"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};
export default Row2;
