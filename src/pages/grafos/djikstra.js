import { Button, Grid2, Typography } from "@mui/material";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { findLessCostPath } from "./djikstralgorithm.ts";

export default function Djikstra() {
  const rowsSize = 7
  const colsSize = 7

  const [color, setColor] = React.useState(Array.from({length: rowsSize}, () =>  Array(colsSize).fill("red")))
  const [matrix, setMatrix] = React.useState([])
  const [cancelTokenRef, setCancelToken] = React.useState({ cancel: false });

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function handleColorReset() {
    setColor(Array.from({length: rowsSize}, () =>  Array(colsSize).fill("red")))
  }

  function createMatrix(rows, cols) {
    function generateRandomArray(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    setMatrix(Array.from({length: rows}, () => Array.from({length: cols}, () => generateRandomArray(0, 100)) ));
    handleColorReset()
  }

  function handleColorMatrix(row, col, newColor) {
    setColor((prevColor) => {
      // Create a deep copy of the color array
      const updatedColor = prevColor.map((r, i) => 
        r.map((c, j) => (i === row && j === col ? newColor : c))
      );
      return updatedColor;
    });
  }

  return(
    <Grid2>
      <Typography variant="h4" textAlign="center">Algoritmo de Djikstra</Typography>
      <Button onClick={async() => {
        createMatrix(rowsSize, colsSize); 
        // Cancel any ongoing algorithm execution
        setCancelToken({ cancel: true })

        // Wait briefly to ensure any ongoing execution stops
        await sleep(500);

        // Reset the cancel token and start a new execution
        setCancelToken({ cancel: false});
      }} disabled={cancelTokenRef.cancel}>Criar Matriz</Button>
      <Button onClick={async() => {
        // Cancel any ongoing algorithm execution
        setCancelToken({ cancel: true })

        // Wait briefly to ensure any ongoing execution stops
        await sleep(500);

        // Reset the cancel token and start a new execution
        setCancelToken({ cancel: false});
        handleColorReset(); // Optional: Clear previous colors
        findLessCostPath(matrix.map((r) => r.map((v) => parseInt(v))), handleColorMatrix, setMatrix, cancelTokenRef, sleep)
      }} disabled={cancelTokenRef.cancel}> Verificar os caminhos </Button>
      <TableContainer sx={{ mt: 10, justifyItems: "center"}}>
        <Table aria-label="simple table" 
        sx={{
          tableLayout: "fixed", // Fix the table layout
          width: "auto", // Optionally set a fixed width if needed
        }}>
          <TableBody >
            {matrix.map((row, y) => (
              <TableRow
              >
                {row.map((cell, x) => (
                  <TableCell 
                    sx={{
                      border: '1px solid white',
                      backgroundColor: color[y][x],
                      textAlign: "center",
                      width: 100, // Set a fixed width
                      height: 100, // Match the height to the width
                      padding: 0, // Remove padding to ensure square dimensions
                    }}
                  >{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid2>
  )
}