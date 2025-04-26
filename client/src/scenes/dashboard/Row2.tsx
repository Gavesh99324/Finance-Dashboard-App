import React, { useMemo } from 'react';
import DashboardBox from '@/components/DashboardBox';
import { useGetProductsQuery, useGetKpisQuery } from '@/state/api';
import BoxHeader  from '@/components/BoxHeader';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell,  } from 'recharts';
import { useTheme, Box, Typography } from '@mui/material';
import FlexBetween from '@/components/FlexBetween';




type Props = {}

const Row2 = (props: Props) => {

  const pieData = [
    { name: "Group A", value: 600 },
    { name: "Group B", value: 400 },
  ]

  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];
  const { data: operationalData } =useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  
  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
        return {
          name: month.substring(0, 3),
          "Operational Expenses": operationalExpenses,
          "Non Operational Expenses": nonOperationalExpenses,
        };
      })
    );
  }, [operationalData]);

  return (
    <>
    <DashboardBox  gridArea={"d"}>
       <BoxHeader 
         title='Operationals vs Non-Operatonals Expenses' 
         subtitle='top line represents revenue, bottom line represents expenses'
         sideText='+4%'
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
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
          <YAxis yAxisId={"left"} orientation='left' tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
          <YAxis yAxisId={"right"} orientation='right' tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
          <Tooltip />
          <Line yAxisId={"left"} type={"monotone"} dataKey="Non Operational Expenses" stroke={palette.tertiary[500]} />
          <Line yAxisId={"right"} type="monotone" dataKey="Operational Expenses" stroke={palette.primary.main} />
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>


    <DashboardBox  gridArea={"e"}>
      <BoxHeader title='Campaigns and Targets' sideText='+4%' />
     <FlexBetween mt={"0.25rem"} gap={"1.5rem"}>
    <PieChart 
        width={110} 
        height={100} 
        margin={{
          top: 0,
          right: -10,
          left: -10,
          bottom: 0,
        }}
        >
        <Pie
          stroke='none'
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
      <Box ml={"-0.7rem"} flexBasis={"40%"} textAlign={"center"}>
        <Typography variant='h5'>Target Sales</Typography>
        <Typography m={"o.3rem"} variant='h3' color={palette.primary[300]}>83</Typography>
        <Typography variant='h6'>Finance goals of the campaign that is desired</Typography>
      </Box>
     </FlexBetween>
    </DashboardBox>





    <DashboardBox  gridArea={"f"} marginTop={"-1.2rem"}></DashboardBox>
    </>
  )
}

export default Row2;