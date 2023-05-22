import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { Box, IconButton, Toolbar, Typography, AppBar, Stack, useMediaQuery, useTheme } from '@mui/material'
import { AboutModal } from './components/AboutModal'
import { MenuNavigation } from './components/MenuNavigation'
import { Menu } from './utils/enums'
import { Products } from './components/Products'
import { Register } from './components/Register'
import { Summary } from './components/Summary'


function App() {
  const [open, setOpen] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [menu, setMenu] = useState<Menu>(Menu.REGISTER)
  const [summary, setSummary] = useState({ products: 0, prices: 0})

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

  const handleRegister = useCallback((data: any) => {
    setSummary(c => ({ products: c.products + data.products, prices: c.prices + data.prices }))
  }, [])

  useEffect(() => {
    fetch('http://localhost:3000/summary').then(res => res.json()).then(data => setSummary(data))
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
    <Stack direction={'row'} position={'relative'}>
      { menu === Menu.PRODUCTS && <Products onRegister={handleRegister}/>}
      { menu === Menu.REGISTER && <Register onRegister={handleRegister}/>}
      <Summary summary={summary}/>
    </Stack>
  </Box>
}

export default App
