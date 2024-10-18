import React, { useState } from "react";
import {
  Container,
  Button,
  Grid,
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

const Atividade1 = () => {
  const [valores, setValores] = useState([]);

  // Função para adicionar uma nova linha vazia
  const adicionarLinha = () => {
    const novaLinha = { id: valores.length + 1, valor: "" }; // Valor inicial vazio
    setValores([...valores, novaLinha]);
  };

  // Função para processar a atualização da célula
  const processRowUpdate = (newRow, oldRow) => {
    const updatedRows = valores.map((row) => (row.id === newRow.id ? newRow : row));
    setValores(updatedRows);
    return newRow;
  };

  // Função para lidar com erros na atualização (opcional)
  const handleProcessRowUpdateError = (error) => {
    console.error("Erro ao atualizar a célula:", error);
  };

  // Colunas da DataGrid com edição ativada para "Valor"
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'valor', headerName: 'Valor', width: 150, editable: true },
  ];

  return (
    <Container>
      <h2>Atividade 1: Insira valores na tabela</h2>
      
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={adicionarLinha} // Função chamada ao clicar para adicionar nova linha
            fullWidth
          >
            Adicionar Linha
          </Button>
        </Grid>
      </Grid>

      {/* Tabela DataGrid para exibir e editar os valores */}
      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid
          rows={valores}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          processRowUpdate={processRowUpdate} // Processa a atualização da célula editada ao pressionar Enter
          onProcessRowUpdateError={handleProcessRowUpdateError} // Tratamento de erros de edição (opcional)
          experimentalFeatures={{ newEditingApi: true }} // Ativa a nova API de edição
        />
      </div>

      {/* Estrutura de Dados */}
      <div style={{ marginTop: 20 }}>
        <h3>Estrutura de Dados:</h3>
        <pre>{JSON.stringify(valores, null, 2)}</pre>
      </div>
    </Container>
  );
};

export default Atividade1;
