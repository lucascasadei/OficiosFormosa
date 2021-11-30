const { Router } = require('express');
const { check } = require('express-validator');
const { CargarArchivo, ActualizarImagen, mostrarImagen, ActualizarImagenCloudinary } = require('../controllers/uploads.controllers');
const { coleccionesPermitidas } = require('../helpers');

const { validarCampos, validarArchivoSubir } = require('../middlewares');

const router = Router();

router.post('/', validarArchivoSubir, CargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser un id de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['users','service'])),
    validarCampos
], //ActualizarImagen
ActualizarImagenCloudinary);

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser un id de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['users','service'])),
    validarCampos
], mostrarImagen);


module.exports = router;