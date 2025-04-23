import React from 'react';
import FlexBetween from './FlexBetween'
import { useTheme } from '@emotion/react'
import { Typography } from '@mui/material';
import Box from '@mui/material/Box'; 

type Props = {
    title: string;
    subtitle: string;
    icon?: React.ReactNode;
    sideText: string;
};

const BoxHeader = ({icon, title, subtitle, sideText}: Props) => {

    const { palette } = useTheme();

  return (
    <FlexBetween color={palette.grey[400]} margin={"1.5rem 1rem 0 1rem"}>
        <FlexBetween>
            {icon}
            <Box width={"100%"}>
                <Typography variant='h4' mb={"-0.2rem"}>
                    {title}
                </Typography>
                <Typography variant='h6'>
                    {subtitle}
                </Typography>
            </Box>
        </FlexBetween>
        <Typography variant='h5' fontWeight={700} color="#FFA500">
            {sideText}
        </Typography>
    </FlexBetween>
  )
}

export default BoxHeader;

