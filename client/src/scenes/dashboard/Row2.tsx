import React from 'react';
import DashboardBox from '@/components/DashboardBox';
import { useGetProductsQuery } from '@/state/api';
import { BoxHeader } from '@/components/BoxHeader';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useTheme } from '@mui/material';
import { revenueProfit } from '@/data';


type Props = {}

const Row2 = (props: Props) => {

  const { palette } = useTheme();
  const { data } = useGetProductsQuery();

  return (
    <>
    <DashboardBox  gridArea={"d"}>
       <BoxHeader 
         title='Operatonals vs Non-Operatonals Expenses' 
         subtitle='top line represents revenue, bottom line represents expenses'
         sideText='+4%'
       />
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={400}
          data={revenueProfit}
          margin={{
            top: 20,
            right: 0,
            left: -10,
            bottom: 70,
          }}
        >
          <CartesianGrid vertical={false} stroke={palette.grey[800]} />
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
          <YAxis yAxisId={"left"} tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
          <YAxis yAxisId={"right"} orientation='right' tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
          <Tooltip />
          <Legend height={20} wrapperStyle={{ margin: "0 0 10px 0"}} />
          <Line yAxisId={"left"} type={"monotone"} dataKey="profit" stroke={palette.tertiary[500]} />
          <Line yAxisId={"right"} type="monotone" dataKey="revenue" stroke="#f2b455" />
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>


    <DashboardBox  gridArea={"e"}></DashboardBox>


    <DashboardBox  gridArea={"f"} marginTop={"-1.2rem"}></DashboardBox>
    </>
  )
}

export default Row2;