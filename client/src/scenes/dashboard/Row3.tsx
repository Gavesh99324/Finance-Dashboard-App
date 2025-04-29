import React, { useMemo } from 'react';
import DashboardBox from '@/components/DashboardBox';
import { useGetTransactionsQuery, useGetProductsQuery, useGetKpisQuery } from '@/state/api';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { Box, Typography, useTheme } from '@mui/material';
import BoxHeader from '@/components/BoxHeader';
import { Cell, Pie, PieChart } from 'recharts';
import FlexBetween from '@/components/FlexBetween';


type Props = {}

const Row3 = (props: Props) => {

  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];

  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();
  console.log('transactionData:', transactionData)

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            }
          ]
        }
      )
    }
  }, [kpiData]);

  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    }
  ]

  const transactionColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) => (params.value as Array<string>).length || 0,
    },
  ];


  return (
    <>
      <DashboardBox  gridArea={"g"} sx={{ height: "200px" }} mt={"-1rem"} ml={"-1rem"}>
        <BoxHeader title="List of Products" sideText={`${productData?.length} products`} subtitle='' />
        <Box mt={"0.5rem"} p={"0 0.5rem"} height={"75%"} 
             sx={{ "& .MuiDataGrid-root": { color: palette.grey[300], border: "none" },
                  "& .MuiDataGrid-cell": { borderBottom: `1px solid ${palette.grey[800]} !important` },
                  "& .MuiDataGrid-columnHeaders": { borderBottom: `1px solid ${palette.grey[800]} !important` },
                  "& .MuiDataGrid-columnSeparator": { visibility: "hidden" },
             }}>
          <DataGrid
          columnHeaderHeight={25}
          rowHeight={35}
          //hideFooter={true}
          rows={productData || []}
          columns={productColumns}
          />
        </Box>
      </DashboardBox>

      <DashboardBox  gridArea={"h"} sx={{ height: "272px" }} mt={"-0.9rem"} ml={"-0.7rem"}>
      <BoxHeader title="Recent Orders" sideText={`${transactionData?.length} latest transactions`} subtitle='' />
        <Box mt={"1rem"} p={"0 0.5rem"} height={"80%"}
             sx={{ "& .MuiDataGrid-root": { color: palette.grey[300], border: "none" },
                  "& .MuiDataGrid-cell": { borderBottom: `1px solid ${palette.grey[800]} !important` },
                  "& .MuiDataGrid-columnHeaders": { borderBottom: `1px solid ${palette.grey[800]} !important` },
                  "& .MuiDataGrid-columnSeparator": { visibility: "hidden" },
             }}>
          <DataGrid
          columnHeaderHeight={25}
          rowHeight={35}
          //hideFooter={true}
          rows={transactionData || []}
          columns={transactionColumns}
          />
        </Box>
      </DashboardBox>

      <DashboardBox  gridArea={"i"} sx={{ height: "135px" }} mt={"-0.9rem"} ml={"-0.7rem"} >
        <BoxHeader title="Expense Breakdown By Category" sideText='+4%' subtitle='' />
         <FlexBetween mt={"0.6rem"} gap={"0.5rem"} p={"0 1rem"} textAlign="center" >
          {pieChartData?.slice(0, 3).map((data, i) => (
            <Box mt={"-0.65rem"} key={`${data[0].name} - ${i}`}>
            <PieChart
              width={75}
              height={75}
            >
              <Pie
                stroke="none"
                data={data}
                innerRadius={18}
                outerRadius={35}
                paddingAngle={2}
                dataKey="value"
              >
              {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index]} />
                    ))}
              </Pie>
            </PieChart>
            <Typography variant='h5'>{data[0].name}</Typography>
          </Box>
          ))}
         </FlexBetween>
      </DashboardBox>

      <DashboardBox  gridArea={"j"} sx={{ height: "125px" }} mt={"-0.9rem"} ml={"-0.7rem"}>
       <BoxHeader title="Overall Summary and Explanation Data" sideText='+15%' subtitle='' />
       <Box height={"12px"} margin={"1.25rem 1rem 0.4rem 1rem"} bgcolor={palette.primary[800]} borderRadius={"1rem"}>
        <Box height={"12px"} bgcolor={palette.primary[600]} borderRadius={"1rem"} width={"40%"}>

        </Box>
       </Box>
       <Typography margin={"0 1rem"} variant='h6'>
          The data for this graph is a combination of the other graphs. It is a way to see how much of each category is spent on each category.
       </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;

