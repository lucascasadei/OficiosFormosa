const { Router } = require('express');
const { check } = require('express-validator');

const { existeCategoriaPorId,existeServiceId } = require('../helpers/db-validators'); 

const {
    validarCampos, 
    validarJWR,
    isAdminRole
} = require('../middlewares');

const { 
        createService, 
        ObtenerService, 
        ObtenerServiceid, 
        ActualizarService,
        BorrarService
    } = require('../controllers/service.controllers');
const router = Router();

//Obtener todas los servicios - publico
router.get('/', ObtenerService);

//Obtener una categoria en especifico por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeServiceId),
    validarCampos,
],ObtenerServiceid);

//Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWR,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('category','No es un id de Mongo').isMongoId(),
    validarCampos
] , createService);


//Actualizar una categoria - privado - cualquier persona con un token valido
router.put('/:id',[
    validarJWR,
    validarCampos,
    //check('category','No es un id de Mongo').isMongoId(),
    check('id').custom(existeServiceId),
    validarCampos
],ActualizarService);

//Eliminar una categoria - privado - cualquier persona con token valido
router.delete('/:id', [
    validarJWR,
    isAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
    check('id').custom(existeServiceId),
    validarCampos
],BorrarService);



module.exports = router;