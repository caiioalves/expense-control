import { styled, TextField } from "@mui/material";

const InputCSS = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: "#fff",
      },
      '&:hover fieldset': {
        borderColor: "#fff",
      },
      '&.Mui-focused fieldset': {
        borderColor: "#fff",
      },
    }
});

export default InputCSS;