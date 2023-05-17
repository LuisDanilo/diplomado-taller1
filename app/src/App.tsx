import { useCallback, useState } from 'react'
import './App.css'
import { Box, IconButton, Toolbar, Typography, AppBar, Stack, useMediaQuery, useTheme } from '@mui/material'
import { AboutModal } from './components/AboutModal'
import { MenuNavigation } from './components/MenuNavigation'
import { Menu } from './utils/enums'
import { Products } from './components/Products'
import { Register } from './components/Register'
import { Summary } from './components/Summary'



function App() {
  console.log("Render App")
  const [open, setOpen] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [menu, setMenu] = useState<Menu>(Menu.REGISTER)

  const theme = useTheme()

  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, [])

  const handleMenuChange = useCallback((m: Menu) => {
    m === Menu.ABOUT ? setOpenModal(true) : setMenu(m)
  }, [])

  const handleModalClose = useCallback(() => {
    setOpenModal(false)
  }, [])

  if (useMediaQuery(theme.breakpoints.down('lg'))) {
    return <h1>Not supported, please visit in desktop</h1>
  }

  return <Box>
    { openModal && <AboutModal onClose={handleModalClose}/> }
    <AppBar>
      <Toolbar>
        <IconButton onClick={handleDrawerOpen}>
          <Typography mx={2} color='white' fontSize={'1.2rem'}>&#x2630;</Typography>
        </IconButton>
        <Typography variant="h6" noWrap>
          {menu}
        </Typography>
      </Toolbar>
    </AppBar>
    { open && <MenuNavigation onClose={handleDrawerClose} onChange={handleMenuChange} />}
    <Stack direction={'row'}>
      { menu === Menu.PRODUCTS && <Products/>}
      { menu === Menu.REGISTER && <Register/>}
      <Summary/>
    </Stack>
  </Box>
}

export default App
