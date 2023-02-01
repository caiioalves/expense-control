const express = require('express');
const validateToken = require('../middlewares/TokenValidation');
const WalletController = require('../controllers/WalletController');

const router = express.Router();

router.post('/token', validateToken, WalletController.getWalletData);
router.post('/post', validateToken, WalletController.postWalletData);
router.post('/delete', validateToken, WalletController.deleteWalletData);
router.post('/update', validateToken, WalletController.updateWalletData);

module.exports = router;