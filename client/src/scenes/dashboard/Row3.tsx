import React from 'react';
import DashboardBox from '@/components/DashboardBox';
import { useGetTransactionsQuery, useGetProductsQuery, useGetKpisQuery } from '@/state/api';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { Box, useTheme } from '@mui/material';
import BoxHeader from '@/components/BoxHeader';



type Props = {}

const Row3 = (props: Props) => {

  const { palette } = useTheme();

  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

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
      <DashboardBox  gridArea={"h"} sx={{ height: "272px" }} mt={"-0.9rem"} ml={"-0.7rem"}></DashboardBox>
      <DashboardBox  gridArea={"i"} sx={{ height: "135px" }} mt={"-0.9rem"} ml={"-0.7rem"}></DashboardBox>
      <DashboardBox  gridArea={"j"} sx={{ height: "125px" }} mt={"-0.9rem"} ml={"-0.7rem"}></DashboardBox>
    </>
  )
}

export default Row3;

