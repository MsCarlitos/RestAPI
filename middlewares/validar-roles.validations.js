const { request, response } = require("express");


const esAdminRole = (req = request, resp = response, next) => {

    if (!req.usuario) {
        return response.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero.'
        });
    }
    const { role, nombre } = req.usuario;

    if (role !== "ADMIN_ROLE") {
        return response.status(401).json({
            msg: `${nombre} no es adminoistrador.`,
        });
    }

    next();
}

const tieneRole = (...roles) => {
    return (req = request, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero.'
            });
        }

        if( !roles.includes( req.usuario.rol )) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            })
        }
        next()
    }
}

module.exports = { esAdminRole, tieneRole };