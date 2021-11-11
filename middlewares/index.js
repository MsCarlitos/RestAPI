
const validaCampos = require('./validar-campos.middleware');
const validaRoles = require('./validar-roles.validations');
const validaJWT = require('./validar-jwt.middleware');

module.exports = {
    ...validaCampos,
    ...validaRoles,
    ...validaJWT,
}