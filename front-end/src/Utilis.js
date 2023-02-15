import axios from "axios";

export const getData = async (token) => {
  const dados = await axios.post(
    "https://wallet-back-end-rexp.vercel.app/wallet/token",
    {},
    { headers: { token } }
  );
  return dados;
};

export const tokenValidation = async (
  token,
  navigate,
  // setArray,
  setData,
  setUserName,
  setEmail
) => {
  if (!token) {
    navigate("/login");
  }
  const dados = await getData(token);
  if (dados.data === "Token invalido") {
    navigate("/login");
  } else {
    // setArray(dados.data.walletData);
    setData(dados.data.walletData);
    setUserName(dados.data.username);
    setEmail(dados.data.email);
    // console.log(dados.data);
    // return dados.data.walletData
  }
};

export const filtroData = (categoria, data) => {
  const filtro = data.filter(
    (valor) => valor.Categoria === categoria
  );
  const soma = filtro.reduce(
    (prevVL, vl) => prevVL + +vl.Valor,
    0
  );

  return soma;
}

// export default getData;
