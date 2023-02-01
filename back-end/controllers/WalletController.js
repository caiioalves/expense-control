const WalletSevice = require('../services/WalletService');

const getWalletData = async(req, res) => {
  const dados = await WalletSevice.getWalletData(req, res);
  res.status(dados.status).json(dados.data);
}

const postWalletData = async(req, res) => {
  const dados = await WalletSevice.postWalletData(req, res);
  res.status(dados.status).json(dados.data);
}

const deleteWalletData = async(req, res) => {
  const dados = await WalletSevice.deleteWalletData(req, res);
  res.status(dados.status).json(dados.data);
}

const updateWalletData = async(req, res) => {
  const dados = await WalletSevice.updateWalletData(req, res);
  res.status(dados.status).json(dados.data);
}

module.exports = {
  getWalletData,
  postWalletData,
  deleteWalletData,
  updateWalletData
}
  