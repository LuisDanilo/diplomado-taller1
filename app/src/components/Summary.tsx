import { Stack, Typography } from "@mui/material";
import { memo } from "react";

function _Summary(props: any) {
    return <Stack justifyContent={'center'} alignItems={'center'} width={'30%'} position={'fixed'} right={'0'} top={'30vh'}>
        <Typography mb={1} variant='h4'>Su resumen</Typography>
        <Typography variant='h6'>Productos registrados</Typography>
        <Typography fontSize={'2rem'}>{props.summary.products}</Typography>
        <Typography variant='h6'>Monto total</Typography>
        <Typography fontSize={'2rem'}>$ {props.summary.prices}</Typography>
    </Stack>
}

export const Summary = memo(_Summary)