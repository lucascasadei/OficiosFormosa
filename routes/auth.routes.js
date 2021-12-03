const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn, renovarToken } = require('../controllers/auth.controllers');
const { validarJWR } = require('../middlewares/validad-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos
] ,login);

router.post('/google', [
    check('id_token', 'id_token de google es necesario').not().isEmpty(),
    validarCampos
] ,googleSingIn);

router.get('/', validarJWR, renovarToken)


module.exports = router;
