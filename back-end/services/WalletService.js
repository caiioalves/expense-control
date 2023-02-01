const Wallet = require('../models/WalletModel');

const getWalletData = async(req, _res) => {
  const {id, username} = req.user
  console.log(req.user);
  const findWalletData = await Wallet.findAll({ where: {UserId: id} });
  return {status: 201, data: { walletData: findWalletData, username}}
}

const postWalletData = async(req, _res) => {
  const {id} = req.user
  const {Valor, Categoria, Descrição, MetodoDePagamento} = req.body

  const addWalletData = await Wallet.create({ Valor, Categoria, Descrição, MetodoDePagamento, UserId: id });
  return {status: 201, data: addWalletData}

}

const deleteWalletData = async(req, _res) => {
  const {id} = req.user
  const {Valor, Categoria, Descrição, MetodoDePagamento, idDelete} = req.body
  const removeWalletData = await Wallet.destroy({ where: {
    Valor, Categoria, Descrição, MetodoDePagamento, UserId: id, id: idDelete
  } });
  return {status: 201, data: removeWalletData}
}

const updateWalletData = async(req, _res) => {
  const {id} = req.user
  const {Valor, Categoria, Descrição, MetodoDePagamento, idUpdate} = req.body

  const updateWalletData = await Wallet.update(
    {Valor, Categoria, Descrição, MetodoDePagamento, UserId: id}, {where: {id: idUpdate}}
  );
  return {status: 201, data: updateWalletData}
}

module.exports = {
  getWalletData,
  postWalletData,
  deleteWalletData,
  updateWalletData
}