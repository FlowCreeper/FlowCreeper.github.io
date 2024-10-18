import { useEffect, useState } from "react"
import ImageCard from "../../components/imagecard"
import { Grid2 as Grid, Typography } from "@mui/material"
import DialogComponent from "../../components/dialog"
import TextCard from "../../components/textcard"

export default function UsersPage() {
  const [lista, setLista] = useState([])
  const [open, setOpen] = useState(false)
  const [clickeddata, setClickedData] = useState({})

  useEffect(() =>{
    async function restCall() {
      const resp = await fetch('http://localhost:6969/api/infos')
      const dados = await resp.json()
      setLista(dados)
    }
    restCall()
  }, [lista])
  
  const handleClick = (id) => {
    setClickedData(lista.find((e) => e.id === id))
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
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