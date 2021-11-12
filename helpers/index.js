
const dbValidations  = require('./db-validators.validations');
const catValidations = require('./cat-validators.validations');
const generarJWT     = require('./generar-jwt.validations');
const googleVerify   = require('./google-verify.validations');
const subirArchivo   = require('./subir-archivo.validation');

module.exports = {
    ...dbValidations,
    ...catValidations,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo,
}