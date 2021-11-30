
const validarCampos = require('../middlewares/validar-campos');
const validarJWR    = require('../middlewares/validad-jwt');
const haveRole      = require('../middlewares/validar-roles');
const validarArchivoSubir = require('../middlewares/validar-archivo');

module.exports = {
    ...validarCampos,
    ...validarJWR,
    ...haveRole,
    ...validarArchivoSubir
    
}