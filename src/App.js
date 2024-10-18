import { AppBar, Box, Container, CssBaseline, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MenuRounded } from "@mui/icons-material";
import { useState } from "react";
import Main from "./pages/main";
import Tree from "./components/treeview";


function App() {
  const [open, setOpen] = useState(false)

  const theme = createTheme({
    colorSchemes: {
      light: true,
    },
  });

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const opcoes = [
    {
      id: '_pp',
      label: 'Projetos Pessoais',
      children: [
        { id: 'card', label: 'Batalha de Cartas' },
      ],
    },
    {
      id: '_cjs',
      label: 'Curso Full-Stack JavaScript',
      children: [
        { id: 'users', label: 'Usuários' },
      ],
    },
    {
      id: '_md',
      label: 'Matematica Discreta',
      children: [
        { id: 'matapl/platv1', label: 'Atividade 1 - PL' },
        { id: 'matapl/platv2', label: 'Atividade 2 - PL' },
        { id: 'matapl/dpatv2', label: 'Atividade 2 - DP' },
      ],
    },
    {
      id: '_gr',
      label: 'Grafos',
      children: [
        { id: 'grafos/conexo', label: 'Conexo - Desconexo' },
      ],
    },
    {
      id: '_ada',
      label: 'Analise de Desempenho',
      children: [
        { id: 'td2', label: 'TODO' },
      ],
    },
  ]

  const DrawerList = (
    <Box sx={{ width: 250 , mt: 2}} role="presentation" >
      
        <Tree items={opcoes}/>
      
    </Box>
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ background: 'rgb(82, 165, 50)', color: 'black', position: 'static' }}>
          <Toolbar>
            <IconButton
              href="/"
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <img style={{ width: '50px', height: '50px' }} alt='creeper' src="https://cdn.shopify.com/s/files/1/0491/8401/4491/files/CIRCULOS_LICENCIAS_Mesa_de_trabajo_1_copia_2_480x480.png?v=1680206275" />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              FlowCreeper
            </Typography>
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuRounded />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Container style={{marginTop: '20px'}}>
        <Main />
      </Container>
    </ThemeProvider>
  );
}

export default App;
