import { Stack, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, MenuItem, Menu } from "@mui/material"
import { memo, useEffect, useState } from "react"

function MyProductsList(props: any) {

    const [anchorEl, setAnchorEl] = useState(null)
    
    const handleOptionsClick = (e: any) => {
      setAnchorEl(e.currentTarget)
    }
  
    const handleMenuClose = () => {
      setAnchorEl(null)
    }
  
    const handleEdit = () => {
      handleMenuClose()
    }
    
    const handleDuplicate = () => {
      handleMenuClose()
    }
  
    const handleDelete = () => {
      handleMenuClose()
    }
  
  
    return <TableRow>
      <TableCell><Typography color='white'>{props.n}</Typography></TableCell>
      <TableCell><Typography color='white'>{props.id}</Typography></TableCell>
      <TableCell><Typography color='white'>{props.name}</Typography></TableCell>
      <TableCell><Typography color='white'>{props.description}</Typography></TableCell>
      <TableCell><Typography color='white'>{props.quantity} und</Typography></TableCell>
      <TableCell><Typography color='white'>$ {props.price}</Typography></TableCell>
      <TableCell>
        <Button size='small' variant='text' onClick={handleOptionsClick}>
          <Typography color='info' fontSize={'1.5rem'}>&#x205d;</Typography>
        </Button>
        <Menu onClose={handleMenuClose} open={Boolean(anchorEl)} anchorEl={anchorEl} MenuListProps={{ style: { display: 'flex', flexDirection: 'row' } }}>
          <MenuItem onClick={handleEdit}><Typography color='info' fontSize={'1.5rem'}>&#x1f589;</Typography></MenuItem>
          <MenuItem onClick={handleDuplicate}><Typography color='info' fontSize={'1.5rem'}>&#x267b;</Typography></MenuItem>
          <MenuItem onClick={handleDelete}><Typography color='error' fontSize={'1.5rem'}>&#x2717;</Typography></MenuItem>
        </Menu>
        </TableCell>
    </TableRow>
}
  

function _Products() {
    console.log("Render Products")

    const [products, setProducts] = useState<any>([])

    useEffect(() => {
      fetch('http://localhost:3000/products').then(res => res.json()).then(data => setProducts(data))
    }, [])

    return <Stack width={'70%'}>
      <Typography mb={2} variant='h3'>Productos</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography color='white'><b>#</b></Typography></TableCell>
              <TableCell><Typography color='white'><b>ID</b></Typography></TableCell>
              <TableCell><Typography color='white'><b>Nombre</b></Typography></TableCell>
              <TableCell><Typography color='white'><b>Descripcion</b></Typography></TableCell>
              <TableCell><Typography color='white'><b>Unidades</b></Typography></TableCell>
              <TableCell><Typography color='white'><b>Valor unitario</b></Typography></TableCell>
              <TableCell align='center'><Typography color='white'><b>Opciones</b></Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p: any, n: number) => <MyProductsList id={p.uuid} n={n} name={p.name} description={p.description} quantity={p.quantity} price={p.price}/> )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
}

export const Products = memo(_Products)