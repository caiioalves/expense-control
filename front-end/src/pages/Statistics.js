import { Box, Paper, styled } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Chart from "react-google-charts";
import { useNavigate } from "react-router-dom";
import Dashboard from "../componentes/Dashboard";
import Context from "../context/Context";
import { filtroData, tokenValidation } from "../Utilis";

const Gráfico = styled(Chart)({ });

function Statistics() {
  const { setUserName, setData, setEmail, data } = useContext(Context);
  const [dataChart, setDataChart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    tokenValidation(token, navigate, setData, setUserName, setEmail);
  }, [navigate, setData, setEmail, setUserName]);

  useEffect(() => {
    setDataChart([
      ["Categoria", "Valor gasto", { role: "style" }],
      ["Trabalho", filtroData('Trabalho', data), "red"], 
      ["Alimentação", filtroData('Alimentação', data), "purple"], 
      ["Transporte", filtroData('Transporte', data), "yellow"],
      ["Saúde", filtroData('Saúde', data), "green"], 
      ["Lazer", filtroData('Lazer', data), "orange"],
    ]);
  }, [data]);
  return (
    <Box
      ml={20}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      // bgcolor="red"
    >
      <Dashboard />
      <Paper
        elevation={5}
        sx={{
          display: "flex",
          width: "80%",
          flexDirection: 'column',
          borderRadius: "20px",
          justifyContent: "center",
          alignItems: "center",
          // bgcolor: 'red'
        }}
      >
        <Gráfico
          chartType="ColumnChart"
          width="90%"
          height="70vh"
          data={dataChart}
        />
      </Paper>
    </Box>
  );
}

export default Statistics;
