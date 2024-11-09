import React, { useState, useRef } from "react";
import { Box } from "@mui/material";

function Conexo() {
  const [vertices, setVertices] = useState([]); // Lista de vértices (pontos)
  const [edges, setEdges] = useState([]); // Lista de arestas
  const canvasRef = useRef(null);

  // Função para adicionar ponto no clique esquerdo (sem aresta)
  const handleLeftClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setVertices([...vertices, { x, y }]);
  };

  // Função para adicionar ponto no clique direito (com aresta)
  const handleRightClick = (event) => {
    event.preventDefault(); // Evitar o menu de contexto

    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Adicionar o novo ponto
    const newVertices = [...vertices, { x, y }];
    setVertices(newVertices);

    // Verificar se há ao menos um ponto para criar a aresta
    if (newVertices.length > 1) {
      const previousPoint = newVertices[newVertices.length - 2];
      const newPoint = newVertices[newVertices.length - 1];
      setEdges([...edges, { start: previousPoint, end: newPoint }]);
    }
  };

  // Desenhar vértices e arestas
  const draw = React.useCallback((ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Limpa o canvas

    // Desenhar as arestas
    edges.forEach(({ start, end }) => {
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Desenhar os vértices
    vertices.forEach(({ x, y }) => {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.stroke();
    });
  }, [vertices, edges]);

  // Atualizar o canvas quando os vértices ou arestas mudam
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    draw(ctx);
  }, [draw]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      onClick={handleLeftClick} // Clique esquerdo
      onContextMenu={handleRightClick} // Clique direito
    >
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "1px solid black", cursor: "crosshair", backgroundColor: 'white' }}
      />
    </Box>
  );
}

export default Conexo;
