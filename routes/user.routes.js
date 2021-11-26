const { Router } = require('express');
const { check } = require('express-validator');

//Middleware
/*const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWR } = require('../middlewares/validad-jwt');
const { isAdminRole,haveRole } = require('../middlewares/validar-roles');*/

const {
    validarCampos, 
    validarJWR, 
    isAdminRole, 
    haveRole
} = require('../middlewares');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/user.controllers');

const { isRoleValid, 
        emailExist,
        existUserById } = require('../helpers/db-validators');

//Aqui voy a configurar las rutas
const router = Router();


router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(isRoleValid),
    validarCampos
] ,usuariosPut);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe tener mas de 6 caracteres').isLength({min:6}),
    check('role', 'No es un rol válido').isIn(['Admin_Role','User_Role']),
    check('email','El email no es válido').isEmail(),
    check('email').custom(emailExist),
    check('role').custom(isRoleValid),
    validarCampos
] ,usuariosPost);

router.delete('/:id',
validarJWR,
//isAdminRole,
haveRole('Admin_Role','Ventas_Role'),
check('id', 'No es un Id válido').isMongoId(),
check('id').custom(existUserById),
validarCampos,
usuariosDelete);

router.patch('/', usuariosPatch);



module.exports = router;