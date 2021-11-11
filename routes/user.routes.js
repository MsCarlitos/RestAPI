const { Router } = require('express');
const { check } = require('express-validator');

const { emailExiste, esRoleValido, existeUsuarioPorId } = require('../helpers/db-validators.validations');

const { validarCampos, validaJWT, tieneRole, esAdminRole } = require('../middlewares')

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete } = require('../controllers/user.controller');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID valido.').isMongoId(),
    check('password', 'El password debe de ser superior a 6 caracteres.').isLength({ min: 6 }),
    check('id').custom(existeUsuarioPorId),
    check('role').custom(esRoleValido),
    validarCampos,
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'El password debe de ser superior a 6 caracteres.').isLength({ min: 6 }),
    check('correo', 'El correo no es valido.').isEmail(),
    check('correo').custom(emailExiste),
    check('role').custom(esRoleValido),
    validarCampos,
], usuariosPost);

router.delete('/:id',
    validaJWT, [
    esAdminRole,
    tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'No es un ID valido.').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos,
], usuariosPatch);

router.patch('/:id', usuariosDelete);

module.exports = router;