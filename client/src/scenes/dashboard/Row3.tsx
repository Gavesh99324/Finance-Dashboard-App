import React from 'react';
import DashboardBox from '@/components/DashboardBox';

type Props = {}

const Row3 = (props: Props) => {
  return (
    <>
      <DashboardBox  gridArea={"g"} sx={{ height: "200px" }} mt={"-1rem"} ml={"-1rem"}></DashboardBox>
      <DashboardBox  gridArea={"h"} sx={{ height: "272px" }} mt={"-0.9rem"} ml={"-0.7rem"}></DashboardBox>
      <DashboardBox  gridArea={"i"} sx={{ height: "135px" }} mt={"-0.9rem"} ml={"-0.7rem"}></DashboardBox>
      <DashboardBox  gridArea={"j"} sx={{ height: "125px" }} mt={"-0.9rem"} ml={"-0.7rem"}></DashboardBox>
    </>
  )
}

export default Row3;

