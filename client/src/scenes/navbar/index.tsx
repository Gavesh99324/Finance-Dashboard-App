import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from '@/components/FlexBetween';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

type Props = {}

const Navbar = (props: Props) => {

    const { palette } = useTheme();
    const [selected, setSelected] = useState("dashboard");
    
  return (
    <FlexBetween mb="o.25rem" p="0.5rem 0rem" color={palette.grey[300]} >
      <FlexBetween gap="0.75rem">
        <MonetizationOnIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize={"16px"}>Insightify</Typography>
      </FlexBetween>
    </FlexBetween>
  )
}

export default Navbar;
