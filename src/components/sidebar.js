import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useDrag } from 'react-dnd';

// Sidebar with multiple draggable shapes
const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 100,
        bgcolor: 'lightgray',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Components
      </Typography>
      <DraggableComponent type="square" />
      <DraggableComponent type="circle" />
      <DraggableComponent type="triangle" />
    </Box>
  );
};

// Draggable component for different shapes
const DraggableComponent = ({ type }) => {
  const [, drag] = useDrag(() => ({
    type: 'component',
    item: { type },
  }));

  const shapeStyles = {
    square: { width: 50, height: 50, bgcolor: 'blue' },
    circle: { width: 50, height: 50, bgcolor: 'green', borderRadius: '50%' },
    triangle: {
      width: 0,
      height: 0,
      borderLeft: '25px solid transparent',
      borderRight: '25px solid transparent',
      borderBottom: '50px solid red',
      bgcolor: 'transparent', // needed for MUI Paper
    },
  };

  return (
    <Paper
      ref={drag}
      sx={{ ...shapeStyles[type], mb: 2 }}
      data-type={type}
    />
  );
};

export default Sidebar;
