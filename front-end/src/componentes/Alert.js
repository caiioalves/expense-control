import { Box, Dialog, DialogTitle, IconButton, Typography } from "@mui/material";
import { useContext } from "react"
import CloseIcon from '@mui/icons-material/Close';
import Context from "../context/Context"

function Alert () {
   const { 
    message, setMessage
   } = useContext(Context);

  return (
    <Box>
    { 
        message.type === 'Erro' && (
          <Dialog
            onClose={() => setMessage({open: false, text: ''})} 
            open={message.open}
          >
          <Box
            display="flex" 
            flexDirection="column" 
            paddingLeft={3} 
            paddingRight={3} 
            justifyContent="center" 
            alignItems="center"
          >
          <DialogTitle fontWeight="bold" color="error">{message.type}</DialogTitle>
          <Typography variant="h8" mb={3}>{message.text}</Typography>
          <IconButton variant="contained" mb={2} onClick={() => setMessage({open: false, text: ''})} >
            <CloseIcon color="error"/>
          </IconButton>
        </Box>
      </Dialog>
        )
      } {
         message.type === 'Sucesso' && (
          <Dialog
            onClose={() => setMessage({open: false, text: ''})} 
            open={message.open}
          >
            <Box
              display="flex" 
              flexDirection="column" 
              paddingLeft={3} 
              paddingRight={3} 
              justifyContent="center" 
              alignItems="center"
            >
              <DialogTitle fontWeight="bold" color="green">{message.type}</DialogTitle>
              <Typography variant="h8" mb={3}>{message.text}</Typography>
            </Box>
          </Dialog>
      )
      }
    </Box>
  )
}

export default Alert;