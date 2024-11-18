import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useDrag } from 'react-dnd';

// Sidebar with multiple draggable shapes
const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 150,
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
      <DraggableComponent type="ben10" />
      <DraggableComponent type="ben10rounded" />
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
    circle: { width: 50, height: 50, bgcolor: 'blue', borderRadius: '50%' },
    ben10: {
      width: 0,
      height: 0,
      borderBottom: '25px solid green',
      borderTop: '25px solid green',
      borderLeft: '25px solid black',
      borderRight: '25px solid black',
      bgcolor: 'transparent', // needed for MUI Paper
    },
    ben10rounded: {
      width: 0,
      height: 0,
      borderLeft: '25px solid black',
      borderRight: '25px solid black',
      borderBottom: '25px solid green',
      borderTop: '25px solid green',
      borderRadius: '50%',
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
