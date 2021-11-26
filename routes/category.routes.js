const { Router } = require('express');
const { check } = require('express-validator');

const { existeCategoriaPorId } = require('../helpers/db-validators'); 

const {
    validarCampos, 
    validarJWR,
    isAdminRole
} = require('../middlewares');

const { 
        createCategory, 
        ObtenerCategorias, 
        ObtenerCategoria, 
        ActualizarCategoria,
        BorrarCategoria
    } = require('../controllers/category.controllers');
const router = Router();

//Obtener todas las categorias - publico
router.get('/', ObtenerCategorias);

//Obtener una categoria en especifico por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
],ObtenerCategoria);

//Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    validarJWR,
    validarCampos
] , createCategory);


//Actualizar una categoria - privado - cualquier persona con un token valido
router.put('/:id',[
    validarJWR,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],ActualizarCategoria);

//Eliminar una categoria - privado - cualquier persona con token valido
router.delete('/:id', [
    validarJWR,
    isAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
    check('id').custom(existeCategoriaPorId),
    validarCampos
],BorrarCategoria);



module.exports = router;