import { Drawer, Button, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Menu } from "../utils/enums"
import { memo } from "react"

function MyListItem(props: any) {
    // console.log("Render MyListItem")
    return <ListItem onClick={props.onClick}>
        <ListItemButton>
            <ListItemIcon>✨</ListItemIcon>
            <ListItemText primary={props.children}/>
        </ListItemButton>
    </ListItem>
}


function _MenuNavigation(props: any) {
    // console.log("Render MenuNavigation")

    const handleRegisterClick = () => {
        props.onChange(Menu.REGISTER)
        props.onClose()
    }

    const handleProductsClick = () => {
        props.onChange(Menu.PRODUCTS)
        props.onClose()
    }

    
    const handleAboutClick = () => {
        props.onChange(Menu.ABOUT)
        props.onClose()
    }

    return <Drawer open={true} onClose={props.onClose}>
        <Button variant='text' onClick={props.onClose}>
        <Typography mx={2} fontSize={'1.5rem'} width={'100%'} align='right'>&lt;</Typography>
        </Button>
        <Divider />
        <List>
        <MyListItem onClick={handleRegisterClick}>
            Registro de productos
        </MyListItem>
        <MyListItem onClick={handleProductsClick}>
            Listado de productos
        </MyListItem>
        <Divider/>
        <MyListItem onClick={handleAboutClick}>
            Acerca de
        </MyListItem>  
        </List>
    </Drawer>
}

export const MenuNavigation = memo(_MenuNavigation)