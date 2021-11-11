const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos.controller");

const {
  existeProducto,
  existeCategoria,
} = require("../helpers/cat-validators.validations");
const { validarCampos, validaJWT, esAdminRole } = require("../middlewares");

const router = Router();

router.get("/", obtenerProductos);

router.get(
  "/:id",
  [
    check("id", "No es un ID valido.").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  obtenerProducto
);

router.post(
    "/",
    [
      validaJWT,
      check("nombre", "El nombre es obligatorio").not().isEmpty(),
      check("categoria", "No es un id de Mongo").isMongoId(),
      check("categoria").custom(existeCategoria),
      validarCampos,
    ],
    crearProducto
  );
  
router.put(
  "/:id",
  [
    validaJWT,
    check("nombre", "El nombre es obligatorio.").not().isEmpty(),
    check("categoria", "No es in ID válido..").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  actualizarProducto
);

router.delete(
  "/:id",
  [
    validaJWT,
    esAdminRole,
    check("id", "No es un ID valido.").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
