const express = require('express');
const EnderecoController = require('./EnderecoController');

const router = express.Router();

router.post('/endereco', EnderecoController.buscarCepSalvarEndereco);

module.exports = router;
