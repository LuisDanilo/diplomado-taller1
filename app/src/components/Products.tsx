import { Stack, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, MenuItem, Menu } from "@mui/material"
import { memo, useCallback, useEffect, useState } from "react"

function MyProductsList(props: any) {

    const {uuid, n, name, description, quantity, price } = props.product

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
    
    const handleDuplicate = useCallback(() => {
      const duplicate = Object.create(props.product)
      console.log(duplicate)
      fetch('http://localhost:3000/product', {
                method: 'POST',
                body: JSON.stringify(duplicate.__proto__),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => {
                if (res.ok) {
                    props.onDuplicated({ prices: Number.parseInt(duplicate.__proto__.price), products: Number.parseInt(duplicate.__proto__.quantity) })
                }
                // props.onDuplicated()
                handleMenuClose()
            })
            .catch((e) => { console.log(e); handleMenuClose() })
    }, [])
  
    const handleDelete = () => {
      handleMenuClose()
    }
  
  
    return <TableRow>
      <TableCell><Typography color='white'>{n}</Typography></TableCell>
      <TableCell><Typography color='white'>{uuid}</Typography></TableCell>
      <TableCell><Typography color='white'>{name}</Typography></TableCell>
      <TableCell><Typography color='white'>{description}</Typography></TableCell>
      <TableCell><Typography color='white'>{quantity} und</Typography></TableCell>
      <TableCell><Typography color='white'>$ {price}</Typography></TableCell>
      <TableCell>
        <Button size='small' variant='text' onClick={handleOptionsClick}>
          <Typography color='info' fontSize={'1.5rem'}>&#x205d;</Typography>
        </Button>
        <Menu onClose={handleMenuClose} open={Boolean(anchorEl)} anchorEl={anchorEl} MenuListProps={{ style: { display: 'flex', flexDirection: 'row' } }}>
          <MenuItem disabled onClick={handleEdit}><Typography color='info' fontSize={'1.5rem'}>&#x1f589;</Typography></MenuItem>
          <MenuItem onClick={handleDuplicate}><Typography color='info' fontSize={'1.5rem'}>&#x267b;</Typography></MenuItem>
          <MenuItem disabled onClick={handleDelete}><Typography color='error' fontSize={'1.5rem'}>&#x2717;</Typography></MenuItem>
        </Menu>
        </TableCell>
    </TableRow>
}
  

function _Products(props: any) {
    const [products, setProducts] = useState<any>([])
    const [update, setUpdate] = useState(true)

    useEffect(() => {
      update && fetch('http://localhost:3000/products').then(res => res.json()).then(data => setProducts(data))
      setUpdate(false)
    }, [update])

    const handleDuplicate = useCallback((data: any) => {
      props.onRegister(data)
      setUpdate(true)
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
            {products.map((p: any, n: number) => <MyProductsList key={`product-${n}`} product={p} onDuplicated={handleDuplicate}/> )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
}

export const Products = memo(_Products)