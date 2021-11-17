const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos,validarJWT } = require('../middlewares/validar-campos.middleware');
const { validaJWT } = require('../middlewares/validar-jwt.middleware');

const { login, googleSignin, renovarToken } = require('../controllers/auth.controller');

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio.').isEmail(),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    validarCampos,
], login);

router.post('/google', [
    check('id_token', 'El id_token es necesario.').not().isEmpty(),
    validarCampos,
], googleSignin);

router.get('/', validaJWT, renovarToken );

module.exports = router;