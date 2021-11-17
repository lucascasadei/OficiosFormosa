
const validarCampos = require('../middlewares/validar-campos');
const validarJWR = require('../middlewares/validad-jwt');
const haveRole = require('../middlewares/validar-roles');

module.exports = {
    ...validarCampos,
    ...validarJWR,
    ...haveRole
    
}