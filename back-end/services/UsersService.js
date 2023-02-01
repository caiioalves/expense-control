const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const User = require('../models/UsersModel');
const dotenv = require('dotenv');

dotenv.config();

const registerUser = async(req, _res) => {
    try {
      const { nomeDeUsuário, Email, Senha } = req.body;
      const password =  await bcrypt.hash(Senha, 10);

      const findEmail = await User.findOne({ where: {Email} });
     
      if(findEmail !== null ) {
        return {status: 202, data: 'Email já cadastrado'}
      } else {
        const createUser = await User.create({ 
          nomeDeUsuário,
          Email,
          Senha: password
        });
        return {status: 201, data: createUser }
      }
    } 
    catch (error) {
      return {status: 202, data: 'Forma de envio de dados incorreta' }
    }
}

const loginUser = async(req, _res) => {

   try {
     const { Email, Senha } = req.body;
     let retorno = '';
 
     const findUser = await User.findOne({ where: {Email} });
     console.log(findUser);

     if(findUser === null) {
       retorno = {status: 202, data: 'Email não cadastrado'};
     } else if (!bcrypt.compareSync(Senha, findUser.Senha)) {
       retorno = {status: 202, data: 'Senha incorreta'};
     } else {
       const token = sign({ id: findUser.id, username: findUser.nomeDeUsuário }, process.env.SECRET)
       retorno = {status: 201, data: {token}};
     }
     return retorno;
   } catch (error) {
    return {status: 202, data: 'Forma de envio de dados incorreta'}
   }
}

module.exports = {
  registerUser,
  loginUser
};