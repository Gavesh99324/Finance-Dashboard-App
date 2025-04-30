import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from '@/components/FlexBetween';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Typewriter } from 'react-simple-typewriter';


//type Props = {}

const Navbar = (props: Props) => {

    const { palette } = useTheme();
    const [selected, setSelected] = useState("dashboard");
    
  return (
    <FlexBetween mb="o.25rem" p="0.5rem 0rem" color={palette.grey[300]} >
      <FlexBetween gap="0.75rem">
        {/*         <MonetizationOnIcon sx={{ fontSize: "28px" }} /> */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            '&:hover .rotate-icon': {
              animation: 'spin 0.6s linear',
            },
            '@keyframes spin': {
              from: { transform: 'rotate(0deg)' },
              to: { transform: 'rotate(360deg)' },
            }
          }}
        >
          <MonetizationOnIcon className="rotate-icon" sx={{ fontSize: "28px", transition: "transform 0.3s ease" }} />
        </Box>


        <Typography variant={"h4"} fontSize={"18px"}>
        <Typewriter
    words={['Insightify']}
    loop={1}
    cursor
    cursorStyle='.'
    typeSpeed={100}
    deleteSpeed={50}
    delaySpeed={1000}
  />
        </Typography>
      </FlexBetween>

      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100]}}} >
          <Link 
             to={"/"} 
             onClick={() => setSelected("dashboard")}
             style={{ 
              color: selected === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit"
            }}
             >
              dashboard
             </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100]}}} >
          <Link 
             to={"/predictions"} 
             onClick={() => setSelected("predictions")}
             style={{ 
              color: selected === "predictions" ? "inherit" : palette.grey[500],
              textDecoration: "inherit"
            }}
             >
              predictions
             </Link>
        </Box>
        <Box></Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
