import { Button, Stack, TextField, Typography } from "@mui/material";
import { memo, useCallback, useState } from "react";

function _Register() {
    console.log("Render Register")
    const [newProduct, setNewProduct] = useState<Record<string, any>>({})

    const handleNameChange = useCallback((e: any) => {
        setNewProduct(c => ({...c, name: e.target.value}))
    }, [])
    
    const handleDescriptionChange = useCallback((e: any) => {
        setNewProduct(c => ({...c, description: e.target.value}))
    }, [])
    
    const handlePriceChange = useCallback((e: any) => {
        if(/^\d{1,6}$/.test(e.target.value) && Number.parseInt(e.target.value) >=0) {
            setNewProduct(c => ({...c, price: e.target.value}))
        } else {
            e.target.value = e.target.value.slice(0,-1)
        }
    }, [])
    
    const handleQuantityChange = useCallback((e: any) => {
        if(/^\d{1,5}$/.test(e.target.value) && Number.parseInt(e.target.value) >=0) {
            setNewProduct(c => ({...c, quantity: e.target.value}))
        } else {
            e.target.value = e.target.value.slice(0,-1)
        }
    }, [])

    const handleAdd = useCallback(() => {
        // if (newProduct.name && newProduct.price && newProduct.quantity) {
        //     fetch('http://localhost:3000/products', {
        //         method: 'POST',
        //         body: JSON.stringify(newProduct)
        //     }).then(res => res.json()).then(data => setProducts(data))
        // }
    }, [])

    const handleClear = useCallback(() => {
        setNewProduct({})
    }, [])

    return <Stack width={'70%'}>
        <Typography mb={2} variant='h3'>Registro</Typography>
        <TextField value={newProduct.name || ""} color='error' margin={'normal'} label='Nombre' sx={{ filter: "invert(1)" }} onChange={handleNameChange}/>
        <TextField value={newProduct.description || ""} color='error' margin={'normal'} multiline label='Descripcion' maxRows={2} sx={{ filter: "invert(1)" }} onChange={handleDescriptionChange}/>
        <TextField value={newProduct.price || 0} color='error' margin={'normal'} label='Precio por unidad' sx={{ filter: "invert(1)" }} onChange={handlePriceChange}/>
        <TextField value={newProduct.quantity || 0} color='error' margin={'normal'} label='Cantidad' sx={{ filter: "invert(1)" }} fullWidth onChange={handleQuantityChange}/>
        <Stack mt={1} justifyContent={'center'} alignItems={'center'} direction={'row'} spacing={2}>
            <Button color='primary' variant='contained' onClick={handleAdd}>Agregar</Button>
            <Button color='warning' variant='contained' onClick={handleClear}>Limpiar</Button>
        </Stack>
    </Stack>
}

export const Register = memo(_Register)