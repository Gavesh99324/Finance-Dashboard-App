import React from 'react';
import DashboardBox from '@/components/DashboardBox';

type Props = {}

const Row2 = (props: Props) => {
  return (
    <>
    <DashboardBox  gridArea={"d"}></DashboardBox>
    <DashboardBox  gridArea={"e"}></DashboardBox>
    <DashboardBox  gridArea={"f"} marginTop={"-1.2rem"}></DashboardBox>
    </>
  )
}

export default Row2;