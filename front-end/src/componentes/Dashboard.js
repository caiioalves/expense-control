import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useState } from "react";
import Context from "../context/Context";
import BarChartIcon from "@mui/icons-material/BarChart";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { userName } = useContext(Context);

  const [teste, setTeste] = useState(true);

  const navigate = useNavigate();

  const handleClickLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Drawer
      sx={{ transition: "ease-in" }}
      variant="persistent"
      anchor={"left"}
      open={true}
    >
      {teste ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <IconButton onClick={() => setTeste(!teste)}>
            <MenuIcon />
          </IconButton>
        </Box>
      ) : (
        <Box display="flex" justifyContent="end" alignItems="center">
          <IconButton onClick={() => setTeste(!teste)}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      )}
      {!teste && (
        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          alignItems="center"
          mt={1}
          mb={3}
        >
          <Avatar sx={{ bgcolor: 'primary.main' }}>{userName[0]}</Avatar>
          <Typography>{userName}</Typography>
        </Box>
      )}
      <Divider sx={{ width: "100%" }} />
      <Box mt={4} p={1} display="flex" alignItems="center" flexDirection="row">
        <Button color="secondary" sx={{ fontWeight: 'bold' }} onClick={() => navigate('/')} startIcon={<HomeIcon />}>{!teste && "Despesas"}</Button>
      </Box>
      <Box p={1} display="flex" alignItems="center" flexDirection="row">
        <Button color="secondary" sx={{ fontWeight: 'bold' }} onClick={() => navigate('/statistics')} startIcon={<BarChartIcon />}>{!teste && "Estatísticas"}</Button>
      </Box>
      <Box mb={4} p={1} display="flex" alignItems="center" flexDirection="row">
        <Button color="secondary" sx={{ fontWeight: 'bold' }} onClick={() => navigate('/settings')} startIcon={<SettingsIcon />}>
          {!teste && "Configurações"}
        </Button>
      </Box>
      <Divider sx={{ width: "100%" }} />
      <Box p={1} display="flex" alignItems="center" flexDirection="row">
        <Button color="secondary" sx={{ fontWeight: 'bold' }} onClick={handleClickLogout} startIcon={<LogoutIcon />}>
          {!teste && "Sair"}
        </Button>
      </Box>
    </Drawer>
  );
}

export default Dashboard;
