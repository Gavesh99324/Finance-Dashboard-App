import React, { useMemo, useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useGetKpisQuery } from "@/state/api";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { CartesianGrid, LineChart, ResponsiveContainer, XAxis, YAxis, Line, Tooltip, Legend, BarChart, Bar, Cell, PieChart, Pie, Label } from "recharts";

import regression, { DataPoint } from "regression";
            

const Predictions = (props: Props) => {
    const { palette } = useTheme();
    const [isPrediction, setIsPrediction] = useState(false);
    const { data: kpiData } = useGetKpisQuery();

    const formattedData = useMemo(() => {
        if (!kpiData) return [];
        const monthData = kpiData[0].monthlyData;
        
        const formatted: Array<DataPoint> = monthData.map(
            ({ revenue }, i: number) => {
                return [i, revenue]
            }
        );

        const regressionLine = regression.linear(formatted);

        return monthData.map(({ month, revenue }, i: number) => {
            return {
                name: month,
                "Actual Revenue": revenue,
                "Regression Line": regressionLine.points[i][1],
                "Predicted Revenue": regressionLine.predict(i + 12)[1]
            }
        })

    }, [kpiData]);

  return (
    <DashboardBox width={"100%"} height={"400px"}  padding={"1rem"} overflow={"hidden"}>
        <FlexBetween m={"1rem 2.5rem"} gap={"1rem"} >
            <Box>
                <Typography variant="h3">Revenue and Predictions</Typography>
                <Typography variant="h6">Charted revenue and predicted revenue based on a simple linear regression model.</Typography>
            </Box>
            <Button onClick={() => setIsPrediction(!isPrediction)} sx={{ backgroundColor: isPrediction ? palette.primary[600] : palette.primary[700], ":hover": { color: palette.primary[100]}}}>Show Predicted Revenue for Next Year</Button>
        </FlexBetween>
        <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={formattedData}
                  margin={{
                    top: 50,
                    right: 75,
                    left: 20,
                    bottom: 200,
                  }}
                >
                  <CartesianGrid vertical={true} stroke={palette.grey[800]} strokeDasharray={"3 3"}  />
                  <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} >
                    <Label value={"Month"} offset={-5} position="insideBottom" />
                  </XAxis>
                  <YAxis domain={[12000, 26000]} axisLine={{ strokeWidth: "0" }} style={{ fontSize: "10px" }} tickFormatter={(value) => `$${value}`} tickLine={true} >
                    <Label value={"Revenue in USD"} angle={-90} offset={-5} position="insideLeft" />
                  </YAxis>
                  <Tooltip />
                  <Legend verticalAlign="top" />
                  <Line  type={"monotone"} dataKey="Actual Revenue" stroke={palette.primary.main} strokeWidth={0} dot={{ strokeWidth: 5 }} />
                  <Line  type="monotone" dataKey="Regression Line" stroke="#f2b455" dot={false} />
                  {isPrediction && (
                    <Line strokeDasharray={"5 5"} dataKey={"Predicted Revenue"} stroke={palette.secondary[600]}  />
                    )}
                </LineChart>
            </ResponsiveContainer>

    </DashboardBox>

  )
};

export default Predictions;