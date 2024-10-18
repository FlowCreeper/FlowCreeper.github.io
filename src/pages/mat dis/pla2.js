import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Atividade2 = () => {
  const [funcao, setFuncao] = useState("");
  const [valorX, setValorX] = useState("");
  const [data, setData] = useState([]);

  const gerarReta = () => {
    const pontos = [];
    try {
      // Avalia a função linear para valores de x de -10 a 10
      for (let x = -10; x <= 10; x++) {
        // Substitui o valor de x na função
        const y = eval(funcao.replace(/x/g, x.toString()));
        pontos.push({ x, y });
      }
      setData(pontos);
    } catch (error) {
      alert("Erro na função inserida. Por favor, insira uma função linear válida.");
    }
  };

  return (
    <Container>
      <h2>Atividade 2: Função Linear</h2>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Função Linear (ex: 2 * x + 3)"
            variant="outlined"
            value={funcao}
            onChange={(e) => setFuncao(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Valor de X"
            variant="outlined"
            value={valorX}
            onChange={(e) => setValorX(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={gerarReta}
        style={{ marginTop: 20 }}
      >
        Plotar Reta
      </Button>

      <div style={{ marginTop: 40, height: 400 }}>
        {data.length > 0 && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="y" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Container>
  );
};

export default Atividade2;
