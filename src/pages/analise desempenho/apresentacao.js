import { Button, Checkbox, Typography, Accordion, AccordionSummary, AccordionDetails, Container, TextField } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";

export default function Apresentacao() {
    const [quantidade, setQuantidade] = useState(0);  // Tamanho do array
    const [organizado, setOrganizado] = useState(false);  // Estado do checkbox (ordenado/desordenado)
    const [numeros, setNumeros] = useState([]);  // Lista para mostrar os resultados
  
    // Componente que alterna o estado de ordenado/desordenado
    function LabelOrganizado() {
      return (
        <Typography>
          <Checkbox checked={organizado} onChange={() => setOrganizado(!organizado)} />
          {organizado ? "Ordenada" : "Desordenada"}
        </Typography>
      );
    }
  
    // Função que gera os dados e executa os algoritmos
    function handleClick() {
      let array = []; // Inicializa o array vazio
      let min = 0; // Define o valor mínimo para os números aleatórios
      let max = 1000000; // Define o valor máximo para os números aleatórios
      let resultados = []; // Lista para armazenar os resultados de cada algoritmo
      let inicio, fim; // Variáveis para medir o tempo de execução

      if (quantidade > 9999999) {
        alert("Quantidade de elementos inválida insira um valor menor que 10.000.000")
        return
      }
      if (quantidade < 0) {
        alert("Quantidade de elementos inválida insira um valor positivo")
        return
      }
      // Função Merge Sort
      const mergeSort = (array) => {
        if (array.length <= 1) {
          return array; // Caso base: se o array tiver 1 ou 0 elementos, já está ordenado
        }

        const middle = Math.floor(array.length / 2); // Calcula o índice do meio
        const left = mergeSort(array.slice(0, middle)); // Ordena a metade esquerda recursivamente
        const right = mergeSort(array.slice(middle)); // Ordena a metade direita recursivamente

        return merge(left, right); // Mescla as duas metades
      };

      // Função para mesclar dois arrays ordenados
      const merge = (left, right) => {
        let resultArray = [], leftIndex = 0, rightIndex = 0;

        // Compara os elementos de ambos os arrays e insere o menor no resultado
        while (leftIndex < left.length && rightIndex < right.length) {
          if (left[leftIndex] < right[rightIndex]) {
            resultArray.push(left[leftIndex]);
            leftIndex++;
          } else {
            resultArray.push(right[rightIndex]);
            rightIndex++;
          }
        }

        // Adiciona os elementos restantes de cada array ao resultado
        return resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
      };

      // Gera números aleatórios e os insere no array
      for (let i = 0; i < parseInt(quantidade); i++) {
        let numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min; // Gera um número aleatório entre min e max
        array.push(numeroAleatorio); // Adiciona o número ao array
      }

      // Se a lista deve ser organizada previamente
      if (organizado) {
        array.sort((a, b) => a - b); // Ordena o array se o checkbox estiver marcado
      }

      // Medindo o tempo do Merge Sort
      inicio = new Date(); // Início da contagem do tempo
      let resultadoMergeSort = mergeSort([...array]); // Executa o Merge Sort
      fim = new Date(); // Fim da contagem do tempo

      // Adiciona o resultado do Merge Sort
      resultados.push({
        metodo: "Merge Sort", 
        tempo: (fim - inicio) + " ms", 
        bigOMelhor: "O(n log n)", // O melhor caso do Merge Sort é sempre O(n log n)
        bigOPior: "O(n log n)",  // O pior caso também é O(n log n)
        numeros: resultadoMergeSort.join(', ') // Números ordenados pelo Merge Sort
      });

      // Medindo o tempo do método .sort()
      inicio = new Date(); // Início da contagem do tempo
      let resultadoSort = array.sort((a, b) => a - b); // Executa o método .sort()
      fim = new Date(); // Fim da contagem do tempo

      // Adiciona o resultado do método .sort()
      resultados.push({
        metodo: "Método .sort()", 
        tempo: (fim - inicio) + " ms", 
        bigOMelhor: organizado ? "O(n)" : "O(n log n)",  // Melhor caso: O(n) se já estiver ordenada
        bigOPior: "O(n log n)", // Pior caso: O(n log n)
        numeros: resultadoSort.join(', ') // Números ordenados pelo método .sort()
      });

      // Atualiza a lista de resultados
      setNumeros(resultados);
    }

    return (
      <Container sx={{justifyItems: 'center'}}>
        {/* Campo para definir a quantidade de números no array */}
        <TextField type="number" label="Quantidade de elementos" onChange={(e) => setQuantidade(e.target.value)} />

        {/* Componente que alterna o estado de ordenado/desordenado */}
        <LabelOrganizado />

        {/* Botão para iniciar o teste dos algoritmos */}
        <Button onClick={handleClick}> Testar </Button>

        {/* Exibe os resultados em uma lista de Accordions (gavetas) */}
        {numeros.map((resultado, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {/* Título da gaveta com o nome do método, tempo de execução e complexidade Big O */}
              <Typography>
                {resultado.metodo} - Tempo: {resultado.tempo} - Big O: {resultado.bigOMelhor}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Exibe os números ordenados dentro da gaveta */}
              <Typography>
                {resultado.numeros}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    );
}
