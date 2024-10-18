import React, { useState } from "react";
import { Container, Button, Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import { Add } from "@mui/icons-material";

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

  // Componente customizado para a Toolbar que inclui o botão
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer sx={{justifyContent: 'center'}}>
        <IconButton
          variant="contained"
          color="primary"
          onClick={adicionarLinha} // Função chamada ao clicar para adicionar nova linha
        >
          <Add/>
        </IconButton>
      </GridToolbarContainer>
    );
  };

  // Colunas da DataGrid com edição ativada para "Valor"
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'valor', headerName: 'Valor', width: 150, editable: true },
  ];

  return (
    <>
      <h2>Atividade 1: Insira valores na tabela</h2>

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
          slots={{
            toolbar: CustomToolbar, // Adiciona a Toolbar personalizada com o botão dentro da tabela
          }}
        />
      </div>

      {/* Estrutura de Dados */}
      <div style={{ marginTop: 20 }}>
        <h3>Estrutura de Dados:</h3>
        <pre>{JSON.stringify(valores, null, 2)}</pre>
      </div>
    </>
  );
};

export default Atividade1;
