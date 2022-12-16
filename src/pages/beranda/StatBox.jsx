import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 20px">
      <Box display="flex" justifyContent="space-between">
        <Box>{icon}</Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="p" sx={{ color: colors.blueAccent[700] }}>
          {subtitle}
        </Typography>
      </Box>
      <Typography variant="p">{title}</Typography>
    </Box>
  );
};

export default StatBox;