import React, { useState } from 'react';
import { Button, Grid, Box, Container, Typography, TextField } from '@mui/material';

const Gnn = () => {
  const [grid, setGrid] = useState(
    Array(9).fill(null).map(() => Array(9).fill(-1))
  );
  const [train, setTrain] = useState([])
  const [show, setShow] = useState(false)
  const [numero, setNumero] = useState(0)

  const toggleButton = (row, col) => {
    const newGrid = grid.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? cell * -1 : cell
      )
    );
    setGrid(newGrid);
  };

  const handleTrain = () => {
    if (numero > 0)
      // Implementar lógica de treinamento da rede neural
      setTrain([...train, ...Array(numero).fill(grid)])
    else alert("Número de treinos precisa ser maior que 0")
  };

  const handleRecognize = () => {
    // Implementar lógica de reconhecimento de padrão
    setShow(!show);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Reconhecimento de Padrões (9x9)
      </Typography>
      <Box display="flex" justifyContent="center">
        <Grid container spacing={1}>
          {grid.map((row, rowIndex) => (
            <Grid container item spacing={1} key={rowIndex} justifyContent="center">
              {row.map((cell, colIndex) => (
                <Grid item key={`${rowIndex}-${colIndex}`}>
                  <Button
                    onClick={() => toggleButton(rowIndex, colIndex)}
                    variant="contained"
                    sx={{
                      backgroundColor: cell === 1 ? 'black' : 'white',
                      width: '40px',
                      height: '40px',
                      border: '1px solid black',
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box display="flex" justifyContent="center" mt={3}>
        <TextField type='number' label='Numero de Treinos' sx={{marginRight: 4}} onChange={(e) => {setNumero(parseInt(e.target.value))}}/>
        <Button onClick={handleTrain} variant="contained" color="primary">
          Treinar
        </Button>
        <Button onClick={handleRecognize} variant="contained" color="secondary" sx={{ ml: 2 }}>
          Reconhecer
        </Button>
      </Box>
      <Grid container spacing={5}>
          {show && train.map((g, i) => {return (
            <Grid item>
              Treino: {i + 1}
            {g.map((v, i) => { return (
              <Typography key={i} sx={{textAlign: 'center'}}>
                {JSON.stringify(v)}
              </Typography>
            )})}
            </Grid>
          )}
          )}
      </Grid>
    </Container>
  );
};

export default Gnn;
