type Node = { cost: number, y: number, x: number }

export function findLessCostPath(
  grid: number[][],
  setColor: Function,
  setMatrix: Function,
  cancelTokenRef: { cancel: boolean },
): number {
  setMatrix(grid)
  const rows = grid.length;
  const cols = grid[0].length;

  const directions = [
    [0, 1],  // right
    [1, 0],  // down
    [0, -1], // left
    [-1, 0], // up
  ];

  const pq: Node[] = [{ cost: grid[0][0], y: 0, x: 0 }];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  dist[0][0] = grid[0][0];

  function processNextStep() {
    // Verifica se o algoritmo foi cancelado
    if (cancelTokenRef.cancel) {
      console.log("Algoritmo interrompido");
      return dist[rows - 1][cols - 1];

    }

    // Se a fila estiver vazia, termina
    if (pq.length === 0) {
      console.log("Algoritmo finalizado sem sucesso");
      return dist[rows - 1][cols - 1];

    }

    pq.sort((a, b) => a.cost - b.cost);
    const { cost, y, x } = pq.shift()!;

    if (visited[y][x]) {
      setTimeout(processNextStep, 100); // Agenda a próxima etapa
    }

    setColor(y, x, "blue");
    visited[y][x] = true;

    if (y === rows - 1 && x === cols - 1) {
      setColor(y, x, "green");
      setMatrix(
        grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => `${cell} | ${dist[rowIndex][colIndex]}`)
        )
      );
      return cost - grid[y][x];
    }

    for (const [dy, dx] of directions) {
      const ny = y + dy;
      const nx = x + dx;

      if (ny >= 0 && ny < rows && nx >= 0 && nx < cols) {
        const newCost = cost + grid[ny][nx];
        setColor(ny, nx, "gold");

        if (newCost < dist[ny][nx]) {
          dist[ny][nx] = newCost;
          pq.push({ cost: newCost, y: ny, x: nx });
          setColor(ny, nx, "darkgreen")
        } else {
          setColor(ny, nx, "gray");
        }
      }
    }
    // Aguarda um pequeno intervalo antes de continuar
    setTimeout(processNextStep, 200); // Ajuste o delay aqui
  }

  return processNextStep()

}
