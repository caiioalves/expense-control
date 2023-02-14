import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";
import Alert from "../componentes/Alert";
import AddIcon from "@mui/icons-material/Add";
import Dashboard from "../componentes/Dashboard";

function Home() {
  const { setMessage, setUserName, setData } = useContext(Context);

  const [valor, setValor] = useState(0);
  const [descriçao, setDescriçao] = useState("");
  const [selectCategoria, setSelectCategoria] = useState("Alimentação");
  const [selectPagamento, setSelectPagamento] = useState("Dinheiro");
  const [array, setArray] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [idUpdate, setIdUpdate] = useState();
  const [idDelete, setIdDelete] = useState();
  const [valorTotal, setValorTotal] = useState(0);
  // const [userName, setUserName] = useState("");
  const [add, setAdd] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState({ open: false, text: "" });
  const navigate = useNavigate();

  const getData = async (token) => {
    const dados = await axios.post(
      "https://wallet-back-end-rexp.vercel.app/wallet/token",
      {},
      { headers: { token } }
    );
    return dados;
  };

  useEffect(() => {
    const retorno = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      const dados = await getData(token);
      if (dados.data === "Token invalido") {
        navigate("/login");
      } else {
        setArray(dados.data.walletData);
        setData(dados.data.walletData);
        setUserName(dados.data.username);
      }
    };
    retorno();
  }, [navigate, setUserName, setData]);

  useEffect(() => {
    const soma = array.reduce((prevVL, vl) => prevVL + +vl.Valor, 0);
    setValorTotal(soma);
  }, [array]);

  const handleClick = async () => {
    if (valor < 1) {
      setMessage({
        open: true,
        text: "O valor nao pode ser menor que 1",
        type: "Erro",
      });
    } else if (descriçao.length < 5) {
      setMessage({
        open: true,
        text: "A descrição deve ter mais que 5 caracteres",
        type: "Erro",
      });
    } else if (descriçao.length > 40) {
      setMessage({
        open: true,
        text: `A descrição deve ter menos que 40 caracteres e possui ${descriçao.length}`,
        type: "Erro",
      });
    } else {
      const inpuValues = {
        Valor: valor,
        Categoria: selectCategoria,
        Descrição: descriçao,
        MetodoDePagamento: selectPagamento,
      };
      const token = sessionStorage.getItem("token");
      const dados = await axios.post(
        "https://wallet-back-end-rexp.vercel.app/wallet/post",
        inpuValues,
        { headers: { token } }
      );
      if (typeof dados.data !== "object") {
        setMessage({ open: true, text: dados.data, type: "Erro" });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        const getDados = await getData(token);
        setArray(getDados.data.walletData);
      }
      handleClickCancel();
      setAdd(false);
    }
  };

  const handleClickDelete = async ({ target }) => {
    setIdDelete(target.id);
    setDeleteAlert({
      open: true,
      text: "Certeza que deseja excluir essa despesa ?",
    });
  };

  const handleClickEdit = async ({ target }) => {
    setEditMode(true);
    console.log(target);
    const dados = array[target.value];
    console.log(dados);

    setValor(dados.Valor);
    setSelectCategoria(dados.Categoria);
    setDescriçao(dados.Descrição);
    setSelectPagamento(dados.MetodoDePagamento);
    setIdUpdate(target.id);
    setAdd(true);
  };
  const handleClickCancel = () => {
    setEditMode(false);
    setValor(0);
    setSelectCategoria("Alimentação");
    setDescriçao("");
    setSelectPagamento("Dinheiro");
    setIdUpdate();
    setAdd(false);
  };

  const handleClickSendDelete = async () => {
    const { Valor, Categoria, Descrição, MetodoDePagamento, id } =
      array[idDelete];
    const token = sessionStorage.getItem("token");
    await axios.post(
      "https://wallet-back-end-rexp.vercel.app/wallet/delete",
      {
        Valor,
        Categoria,
        Descrição,
        MetodoDePagamento,
        idDelete: id,
      },
      { headers: { token } }
    );
    const getDados = await getData(token);
    setArray(getDados.data.walletData);
    setDeleteAlert({ open: false, text: "" });
  };

  const handleClickSendEdit = async () => {
    if (valor < 1) {
      setMessage({
        open: true,
        text: "O valor nao pode ser menor que 1",
        type: "Erro",
      });
    } else if (descriçao.length < 5) {
      setMessage({
        open: true,
        text: "A descrição deve ter mais que 5 caracteres",
        type: "Erro",
      });
    } else {
      const inpuValues = {
        Valor: valor,
        Categoria: selectCategoria,
        Descrição: descriçao,
        MetodoDePagamento: selectPagamento,
        idUpdate,
      };
      const token = sessionStorage.getItem("token");
      await axios.post(
        "https://wallet-back-end-rexp.vercel.app/wallet/update",
        inpuValues,
        { headers: { token } }
      );
      handleClickCancel();
      setMessage({
        open: true,
        text: "Despesa atualizada com sucesso",
        type: "Sucesso",
      });
      setTimeout(() => {
        setMessage({ open: false, text: "" });
      }, 1000);
      const getDados = await getData(token);
      setArray(getDados.data.walletData);
    }
  };

  return (
    <Box
      ml={10}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Dashboard />
      {/* <AppBar
        color="primary"
        sx={{
          height: "7%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      > */}
      {/* <Typography ml={2} fontWeight="bold" variant="h6">
          {userName}
        </Typography>
        <IconButton onClick={handleClickLogout}>
          <LogoutIcon />
        </IconButton>
      </AppBar> */}
      {/* <Box mt={5}>
        <IconButton onClick={() => setAdd(true)}>
          <AddIcon color="primary" />
        </IconButton>
      </Box> */}
      <Dialog
        open={add}
        sx={{ borderRadius: "20px" }}
        onClose={() => {
          setAdd(false);
          setTimeout(handleClickCancel, 200);
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          padding={5}
          paddingLeft={8}
          paddingRight={8}
          justifyContent="center"
          gap={3}
          flexWrap="wrap"
        >
          <Typography
            color="primary"
            fontWeight="bold"
            alignSelf="center"
            variant="h5"
          >
            {editMode ? "Modo de edição" : "Inserir despesa"}
          </Typography>
          <TextField
            value={valor}
            onChange={({ target }) => setValor(target.value)}
            type="number"
            size="small"
            label="Valor"
          />
          <Select
            color="primary"
            value={selectCategoria}
            onChange={({ target }) => {
              setSelectCategoria(target.value);
            }}
            size="small"
          >
            <MenuItem value="Alimentação">Alimentação</MenuItem>
            <MenuItem value="Trabalho">Trabalho</MenuItem>
            <MenuItem value="Transporte">Transporte</MenuItem>
            <MenuItem value="Saúde">Saúde</MenuItem>
            <MenuItem value="Lazer">Lazer</MenuItem>
          </Select>
          <TextField
            value={descriçao}
            onChange={({ target }) => setDescriçao(target.value)}
            type="text"
            size="small"
            label="Descrição"
          />
          <Select
            value={selectPagamento}
            onChange={({ target }) => {
              setSelectPagamento(target.value);
            }}
            size="small"
          >
            <MenuItem value="Dinheiro">Dinheiro</MenuItem>
            <MenuItem value="Cartão de débito">Cartão de débito</MenuItem>
            <MenuItem value="Cartão de crédito">Cartão de crédito</MenuItem>
          </Select>
          {!editMode ? (
            <Button
              width="60%"
              size="small"
              onClick={handleClick}
              variant="contained"
              color="outhers"
              sx={{ mt: 3, fontWeight: "bold" }}
            >
              Adicionar despesa
            </Button>
          ) : (
            <Button
              size="small"
              onClick={handleClickSendEdit}
              variant="contained"
              color="outhers"
              sx={{ mt: 3, fontWeight: "bold" }}
            >
              Editar Despesa
            </Button>
          )}
        </Box>
      </Dialog>
      {/* <Box display="flex" flexDirection="row" width="100%" justifyContent="center" mt={5} gap={10}> */}
      <Paper
        elevation={3}
        sx={{
          borderRadius: "50%",
          width: '3%',
          height: '6vh',
          mt: 5,
          display: "flex",
          flexDirection: "row",
          // height: "10vh",
          justifyContent: 'center',
          alignItems: "center",
        }}
      >
        {/* <Button onClick={() => setAdd(true)} startIcon={<AddIcon />}>
          Adicionar despesa
        </Button> */}
         <IconButton onClick={() => setAdd(true)}>
            <AddIcon color="primary" />
          </IconButton>
          {/* <Typography>Adicionar despesa</Typography>  */}
      </Paper>
      {/* </Box> */}
      <TableContainer
        component={Paper}
        elevation={5}
        sx={{
          mt: 5,
          maxHeight: { xs: "50vh", md: "65vh" },
          width: "95%",
          borderRadius: "20px",
        }}
      >
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "medium" }}
                align="center"
              >
                Valor
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "medium" }}
                align="center"
              >
                Categoria
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "medium" }}
                align="center"
              >
                Descrição
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "medium" }}
                align="center"
              >
                Método de pagamento
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "medium" }}
                align="center"
              >
                Editar
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "medium" }}
                align="center"
              >
                Excluir
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {array.map((valor, i) => (
              <TableRow key={i}>
                <TableCell align="center">{`R$ ${valor.Valor}`}</TableCell>
                <TableCell align="center">{valor.Categoria}</TableCell>
                <TableCell align="center">{valor.Descrição}</TableCell>
                <TableCell align="center">{valor.MetodoDePagamento}</TableCell>
                <TableCell align="center">
                  <Button
                    value={i}
                    id={valor.id}
                    onClick={handleClickEdit}
                    color="warning"
                    sx={{ fontSize: '11px', fontWeight: 'bold' }}
                    size="small"
                    variant="contained"
                  >
                    Editar
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    id={i}
                    onClick={handleClickDelete}
                    color="error"
                    sx={{ fontSize: '11px', fontWeight: 'bold' }}
                    size="small"
                    variant="contained"
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          height="10vh"
        >
          <Typography
            color="primary"
            fontWeight="bold"
            ml={2}
            variant="h7"
          >{` Valor total: R$ ${valorTotal}`}</Typography>
        </Box> */}
      </TableContainer>
      {/* <Box width="100%" display="flex" justifyContent="flex-start"> */}
        <Paper
          elevation={3}
          sx={{
            pl: 3,
            pr: 3,
            borderRadius: "10px",
            mt: 2,
            display: "flex",
            flexDirection: "row",
            gap: 0,
            height: "10vh",
            alignItems: "center",
          }}
        >
          <Typography>Total de gastos: </Typography>
          <Typography
            fontWeight="bold"
            color="primary"
          >{`R$ ${valorTotal}`}</Typography>
        </Paper>
      {/* </Box> */}
      <Alert />
      <Dialog open={deleteAlert.open}>
        <Box
          display="flex"
          flexDirection="column"
          paddingLeft={3}
          paddingRight={3}
          justifyContent="center"
          alignItems="center"
        >
          <DialogTitle fontWeight="bold" color="error">
            Deletar
          </DialogTitle>
          <Typography variant="h8" mb={3}>
            {deleteAlert.text}
          </Typography>
          <Box mb={2} display="flex" flexDirection="row" gap={2}>
            <Button
              onClick={handleClickSendDelete}
              size="small"
              variant="contained"
              color="primary"
            >
              Sim
            </Button>
            <Button
              onClick={() => {
                setDeleteAlert({ open: false, text: "" });
                setIdDelete();
              }}
              size="small"
              variant="contained"
              color="error"
            >
              Não
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}

export default Home;
