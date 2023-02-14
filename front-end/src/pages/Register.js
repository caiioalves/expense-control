import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import styled from "@emotion/styled";
import InputCSS from "../componentes/InputCSS";
// import axios from "axios";

const CSSLink = styled(Link)({
  color: "#1976d2",
});

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [message, setMessage] = useState({ open: false, text: "" });

  const navigate = useNavigate();
  const regex = /\S+@\S+\.\S+/;

  const handleClick = async () => {
    console.log(name);
    if (name.length <= 5) {
      setMessage({
        open: true,
        text: "Insira um nome com mais de 5 caracteres",
        type: "Erro",
      });
    } else if (!regex.test(email)) {
      setMessage({ open: true, text: "Insira um email válido", type: "Erro" });
    } else if (password.length <= 5) {
      setMessage({
        open: true,
        text: "Insira uma senha com mais de 5 caracteres",
        type: "Erro",
      });
    } else {
      const dados = await axios.post(
        "https://wallet-back-end-rexp.vercel.app/user/register",
        {
          nomeDeUsuário: name,
          Email: email,
          Senha: password,
        }
      );
      if (typeof dados.data === "object") {
        setMessage({
          open: true,
          text: "Usuario cadastrado com sucesso",
          type: "Sucesso",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        alert(dados.data);
        // setMessage({ open: true, text: 'Insira uma senha com mais de 5 caracteres', type: 'Erro' })
      }
      // console.log(dados.data);
      // axios.post('http://localhost:3001/user/register', {
      //   nomeDeUsuário: name,
      //   Email: email,
      //   Senha: password
      //  })};
    }
  };

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        background:
          "radial-gradient(circle, rgba(33,126,213,1) 33%, rgba(0,212,255,1) 100%)",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "60%",
          width: { xs: "80%", md: "30%" },
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          borderRadius: 10,
        }}
      >
        <Typography color="primary" fontWeight="bold" variant="h5">
          Register
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          width="100%"
          gap={2}
        >
          <Box
            display="flex"
            flexDirection="column"
            sx={{ width: { xs: "70%", md: "60%" } }}
          >
            <InputCSS
              inputProps={{ style: { color: "#fff" } }}
              InputLabelProps={{ style: { color: "#fff" } }}
              error={errorName}
              onChange={({ target }) => {
                setName(target.value);
                if (target.value.length <= 5) {
                  setErrorName(true);
                } else {
                  setErrorName(false);
                }
              }}
              value={name}
              size="small"
              fullWidth
              label="Digite seu nome"
            />
            <Typography color="error" variant="caption" hidden={!errorName}>
              O nome deve ter mais de 5 caracteres
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            sx={{ width: { xs: "70%", md: "60%" } }}
          >
            <InputCSS
              inputProps={{ style: { color: "#fff" } }}
              InputLabelProps={{ style: { color: "#fff" } }}
              error={errorEmail}
              onChange={({ target }) => {
                setEmail(target.value);
                if (!regex.test(target.value)) {
                  setErrorEmail(true);
                } else {
                  setErrorEmail(false);
                }
              }}
              value={email}
              size="small"
              fullWidth
              label="Digite seu email"
            />
            <Typography color="error" variant="caption" hidden={!errorEmail}>
              Digite um formato de email valido
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            sx={{ width: { xs: "70%", md: "60%" } }}
          >
            <InputCSS
              inputProps={{ style: { color: "#fff" } }}
              InputLabelProps={{ style: { color: "#fff" } }}
              error={errorPassword}
              onChange={({ target }) => {
                setPassword(target.value);
                if (target.value.length <= 5) {
                  setErrorPassword(true);
                } else {
                  setErrorPassword(false);
                }
                console.log(target);
              }}
              value={password}
              size="small"
              fullWidth
              label="Digite sua senha"
            />
            <Typography color="error" variant="caption" hidden={!errorPassword}>
              A senha deve ter mais de 5 caracteres
            </Typography>
            <Box display="flex" flexDirection="row" mt={1}>
              <Typography color="#fff" variant="h8">
                Já possui cadrastro?
              </Typography>
              <CSSLink to="/login">Login</CSSLink>
            </Box>
          </Box>
        </Box>
        <Button onClick={handleClick} variant="contained">
          registrar
        </Button>
      </Paper>
      {message.type === "Erro" && (
        <Dialog
          onClose={() => setMessage({ open: false, text: "" })}
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
            <DialogTitle fontWeight="bold" color="error">
              {message.type}
            </DialogTitle>
            <Typography variant="h8" mb={3}>
              {message.text}
            </Typography>
            <IconButton
              variant="contained"
              mb={2}
              onClick={() => setMessage({ open: false, text: "" })}
            >
              <CloseIcon color="error" />
            </IconButton>
          </Box>
        </Dialog>
      )}{" "}
      {message.type === "Sucesso" && (
        <Dialog
          onClose={() => setMessage({ open: false, text: "" })}
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
            <DialogTitle fontWeight="bold" color="green">
              {message.type}
            </DialogTitle>
            <Typography variant="h8" mb={3}>
              {message.text}
            </Typography>
          </Box>
        </Dialog>
      )}
    </Box>
  );
}

export default Register;
