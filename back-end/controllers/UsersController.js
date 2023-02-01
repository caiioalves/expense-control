const UsersSevice = require('../services/UsersService');

const registerUser = async(req, res) => {
  const dados = await UsersSevice.registerUser(req, res);
  res.status(dados.status).json(dados.data);
}

const loginUser = async(req, res) => {
  const dados =  await UsersSevice.loginUser(req, res);
  res.status(dados.status).json(dados.data);
}

module.exports = {
  registerUser,
  loginUser
}