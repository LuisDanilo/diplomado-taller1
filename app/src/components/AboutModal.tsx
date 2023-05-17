import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material"
import { memo } from "react"

function _AboutModal(props: any) {
    console.log("Render AboutModal")
    return <Dialog open={true} onClose={props.onClose}>
        <DialogTitle>
            Acerca de este demo
        </DialogTitle>
        <DialogContent>
            Hey
        </DialogContent>
        <DialogActions>
            <Button variant='contained' onClick={props.onClose}>Okay</Button>
        </DialogActions>
    </Dialog>
}

export const AboutModal = memo(_AboutModal)