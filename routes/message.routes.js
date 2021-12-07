const { Router } = require('express');
const { check } = require('express-validator');
const { ObtenerMessage } = require('../controllers/message.controllers');
const { validarCampos } = require('../middlewares');
const Menssage = require('../models/message');

const router = Router();

//ObtenerService mensajes por :id
/*router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
],ObtenerMessage);*/






module.exports = router;