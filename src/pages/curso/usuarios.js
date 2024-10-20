import { useEffect, useState } from "react"
import { Alert, CircularProgress, Grid2 as Grid, Snackbar } from "@mui/material"
import DialogComponent from "../../components/dialog"
import TextCard from "../../components/textcard"

export default function UsersPage() {
  const [lista, setLista] = useState([])
  const [open, setOpen] = useState(false)
  const [clickeddata, setClickedData] = useState({})
  const [error, setError] = useState(null);  // State to track errors
  const [loading, setLoading] = useState(true);  // State to show loading status
  const [openSnackbar, setOpenSnackbar] = useState(false);  // State for Snackbar visibility

  useEffect(() => {
    async function restCall() {
      try {
        const resp = await fetch('http://localhost:6969/api/infos');
        
        if (!resp.ok) {
          throw new Error('Network response was not ok');  // Throw error for bad responses
        }
        
        const dados = await resp.json();
        setLista(dados);
        setError(null);  // Reset error if fetch succeeds
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('Failed to fetch data. Please try again later.');
        setOpenSnackbar(true)
      } finally {
        setLoading(false);  // Stop loading after fetch completes
      }
    }
    
    restCall();
  }, []);  // Empty array ensures effect only runs once
  
  const handleClick = (id) => {
    setClickedData(lista.find((e) => e.id === id))
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);  // Close Snackbar when user dismisses it
  };

  return (
    <>
      <Grid container sx={{justifyContent: 'center', mt: '18%'}}>
        {loading && <CircularProgress color="success"/>}  {/* MUI CircularProgress for loading indicator */}

        {/* Use MUI Alert component to display error message */}
        {error && (
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}  // Snackbar closes after 6 seconds
            onClose={handleCloseSnackbar}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          >
            <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>
        )}
      </Grid>
      <Grid container spacing={5}>
        {
          lista.map(
            (e) => <TextCard 
              key={e.id} 
              onClick={() => handleClick(e.id)} 
              title={e.username} 
              description={e.name}
            />
          )
        }
      </Grid>
      <DialogComponent open={open} handleClose={handleClose} 
        title={clickeddata.name}
        description={
          <>
            Username: {clickeddata.username}
            <br/>
            Email: {clickeddata.email}
            <br/>
            {open ? `Address: ${clickeddata.address.street} Street, ${clickeddata.address.suite} - ${clickeddata.address.city} [${clickeddata.address.zipcode}]` : ''}
            <br/>
            Phone: {clickeddata.phone}
            <br/>
            Website: <a href={`https://${clickeddata.website}`} target="_blank" rel="noopener noreferrer">{clickeddata.website}</a>
          </>
        }
      />
    </>
  )
}