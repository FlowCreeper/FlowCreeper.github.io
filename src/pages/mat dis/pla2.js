import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid2 as Grid,
  Typography,
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
import { compile } from "mathjs"; // Import math.js

const Atividade2 = () => {
  const [funcao, setFuncao] = useState("");
  const [valorX, setValorX] = useState(0);
  const [data, setData] = useState([]);

  const gerarReta = () => {
    const pontos = [];
    try {
      if (!(valorX > 0)) return alert("Valor precisa ser maior que 0")

      const normalizedFuncao = funcao.replace(/y\s*=\s*/, "").trim();
      const expression = compile(normalizedFuncao)
      // Avalia a função linear para valores de x de -10 a 10
      for (let x = parseInt("-" + valorX); x <= parseInt(valorX); x++) {
        // Substitui o valor de x na função
        const y = expression.evaluate({ x })
        pontos.push({ x, y });
      }
      setData(pontos);
    } catch (error) {
      alert("Erro na função inserida. Por favor, insira uma função linear válida.");
    }
  };

  return (
    <Container>
      <Typography variant="h5" pb={5}>Atividade 2: Função Linear</Typography>
      <Grid container spacing={2}>
        <Grid size={{xs: 6}}>
          <TextField
            label="Função Linear (ex: y = 2 * x + 3 )"
            variant="outlined"
            value={funcao}
            onChange={(e) => setFuncao(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid size={{xs: 6}}>
          <TextField
            label="Intervalo de X (ex: 50 seria de -50 ate 50)"
            variant="outlined"
            type="number"
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
              <Tooltip
                content={(props) => {
                  const { active, payload } = props;
                  // Tooltip only displays when active and payload exists
                  if (active && payload && payload.length) {
                    const { x, y } = payload[0].payload;
                    return (
                      <div
                        style={{
                          backgroundColor: "white",
                          border: "1px solid green",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                          borderRadius: "5px",
                          color: "black"
                        }}
                      >
                        <p><strong>x:</strong> {x}</p>
                        <p><strong>y:</strong> {y}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line type="linear" dataKey="y" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Container>
  );
};

export default Atividade2;
