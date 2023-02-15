import { Box, Button, Paper, styled, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Dashboard from "../componentes/Dashboard";
import Context from "../context/Context";
import DeleteIcon from "@mui/icons-material/Delete";
import { MD5 } from "crypto-js";
import { tokenValidation } from "../Utilis";
import { useNavigate } from "react-router-dom";
// import EditIcon from "@mui/icons-material/Edit";

const Image = styled("img")({
  width: "100px",
});

function Settings() {
  const { setUserName, setData, setEmail, userName, email } = useContext(Context);
  const [hash, setHash] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const cryptoHash = MD5(email).toString();
    setHash(cryptoHash);
  }, [email]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    tokenValidation(token,
      navigate,
      setData,
      setUserName,
      setEmail)
  }, [navigate, setData, setEmail, setUserName]);

  return (
    <Box
      ml={10}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Dashboard />
      <Paper
        sx={{
          display: "flex",
          width: "80%",
          gap: 8,
          p: 5,
          borderRadius: "20px",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box>
          <Typography mb={2} variant="h6" fontWeight="bold" color="primary">
            Dados pessoais
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            gap={2}
          >
            <Typography>Nome:</Typography>
            <Typography color="primary">{userName}</Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            gap={2}
          >
            <Typography>Email:</Typography>
            <Typography color="primary">{email}</Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            gap={2}
          >
            <Typography>Senha:</Typography>
            <Typography color="primary">********</Typography>
          </Box>
          <Image
            src={`https://www.gravatar.com/avatar/${hash}`}
            alt="imagem de perfil"
          />
        </Box>
        <Box>
          <Typography mb={2} variant="h6" fontWeight="bold" color="error">
            Zona de Perigo
          </Typography>
          <Button color="error" variant="contained" endIcon={<DeleteIcon />}>
            Apagar todas as despesas
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Settings;
