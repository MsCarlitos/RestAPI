const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias.controller');

const { existeCategoria } = require('../helpers/cat-validators.validations');
const { validarCampos, validaJWT, esAdminRole } = require('../middlewares')


const router = Router();

router.get('/', obtenerCategorias);

router.get('/:id', [
    check('id', 'No es un ID valido.').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos,
], obtenerCategoria);

router.post('/',[ 
    validaJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(), 
    check('estado', 'El estado es obligatorio.').not().isEmpty(), 
], crearCategoria );

router.put('/:id', [
    validaJWT,
    check("nombre", 'El nombre es obligatorio.').not().isEmpty(),
    check('id').custom( existeCategoria),
    validarCampos
], actualizarCategoria);


router.delete('/:id', [
    validaJWT,
    esAdminRole,
    check('id', 'No es un ID valido.').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos,
], borrarCategoria);

module.exports = router;