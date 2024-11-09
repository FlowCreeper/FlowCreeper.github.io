import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from '../../components/sidebar';
import DrawingArea from '../../components/drawingarea';

function Planar() {
  return (
    <Box display="flex">
      <Sidebar />
      <DrawingArea />
    </Box>
  );
}

export default Planar;
