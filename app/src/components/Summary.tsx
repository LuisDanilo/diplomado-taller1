import { Stack, Typography } from "@mui/material";
import { memo } from "react";

function _Summary() {
    console.log("Render Summary")
    return <Stack justifyContent={'center'} alignItems={'center'} width={'30%'}>
        <Typography mb={1} variant='h4'>Su resumen</Typography>
        <Typography variant='h6'>Productos registrados</Typography>
        <Typography fontSize={'2rem'}>3</Typography>
        <Typography variant='h6'>Monto total</Typography>
        <Typography fontSize={'2rem'}>$ 3</Typography>
    </Stack>
}

export const Summary = memo(_Summary)