import React, { useState } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function DPAtv2() {
  const [colsA, setColsA] = useState(2);  // Colunas de A ajustáveis
  const [colsB, setColsB] = useState(2);  // Colunas de B ajustáveis

  const [matrixA, setMatrixA] = useState([]);
  const [matrixB, setMatrixB] = useState([]);
  const [resultMatrix, setResultMatrix] = useState(null);

  // Captura os valores das tabelas e os armazena
  const handleMatrixInput = (rows, cols, matrixName) => {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const id = `cell-${i}-${j}`;
        const value = document.getElementById(id)?.value;
        row.push(parseFloat(value) || 0);
      }
      matrix.push(row);
    }
    return matrixName === 'A' ? setMatrixA(matrix) : setMatrixB(matrix);
  };

  const validarSomaLinhas = (matrix, matrixName) => {
    for (let i = 0; i < matrix.length; i++) {
      const soma = matrix[i].reduce((acc, val) => acc + val, 0);
      if (soma !== 1) {
        alert(`Erro: A soma dos valores da linha ${i + 1} da Matriz ${matrixName} deve ser igual a 1. Soma atual: ${soma}`);
        return false;
      }
    }
    return true;
  };

  const multiplyMatrices = () => {
    if (!matrixA.length || !matrixB.length) {
      alert('Por favor, preencha todas as células das matrizes.');
      return;
    }

    // Validação da soma das linhas
    if (!validarSomaLinhas(matrixA, 'A') || !validarSomaLinhas(matrixB, 'B')) {
      return;
    }

    const result = [];

    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        if (matrixA[0] === undefined || matrixB[k] === undefined) {
          alert('Erro ao acessar as matrizes. Certifique-se de que todas as células estão preenchidas.');
          return;
        }
        sum += matrixA[0][j] * matrixB[j][k];  // Somente a primeira linha da Matriz A
      }
      result.push(sum);
    }
    setResultMatrix([result]);  // Resultado é uma única linha
  };

  const handleMultiplication = () => {
    handleMatrixInput(1, colsA, 'A');  // Matriz A sempre tem 1 linha
    handleMatrixInput(colsA, colsB, 'B');  // Linhas de B = Colunas de A
    setTimeout(multiplyMatrices, 100);  // Espera pequena para garantir que os estados sejam atualizados
  };

  const createMatrixInputTable = (rows, cols, matrixName) => {
    const tableRows = [];
    for (let i = 0; i < rows; i++) {
      const tableCells = [];
      for (let j = 0; j < cols; j++) {
        const id = `cell-${i}-${j}`;
        tableCells.push(
          <TableCell key={id}>
            <TextField id={id} label={`${matrixName}[${i}][${j}]`} variant="outlined" type="number" />
          </TableCell>
        );
      }
      tableRows.push(<TableRow key={i}>{tableCells}</TableRow>);
    }
    return tableRows;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Multiplicação de Matrizes (Matriz A com uma única linha)</h1>

      {/* Inputs para as dimensões das matrizes */}
      <div style={{ marginBottom: '20px' }}>
        <TextField
          label="Colunas da Matriz A"
          variant="outlined"
          type="number"
          value={colsA}
          onChange={(e) => {
            const cols = parseInt(e.target.value) || 2;
            setColsA(cols);
          }}
        />
        <TextField
          label="Colunas da Matriz B"
          variant="outlined"
          type="number"
          value={colsB}
          onChange={(e) => setColsB(parseInt(e.target.value) || 2)}
        />
      </div>

      {/* Tabela para entrada de valores da Matriz A (sempre uma linha) */}
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={colsA}>Matriz A (1 linha)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{createMatrixInputTable(1, colsA, 'A')}</TableBody> {/* Apenas uma linha */}
        </Table>
      </TableContainer>

      {/* Tabela para entrada de valores da Matriz B */}
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={colsB}>Matriz B</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{createMatrixInputTable(colsA, colsB, 'B')}</TableBody> {/* Linhas de B = Colunas de A */}
        </Table>
      </TableContainer>

      {/* Botão para calcular a multiplicação */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleMultiplication}
      >
        Multiplicar Matrizes
      </Button>

      {/* Exibição do resultado */}
      {resultMatrix && (
        <div style={{ marginTop: '20px' }}>
          <h2>Resultado:</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {resultMatrix.map((row, i) => (
                  <TableRow key={i}>
                    {row.map((value, j) => (
                      <TableCell key={j}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default DPAtv2;
