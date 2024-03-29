const Usuario = require('../models/usuario');
const Role = require('../models/role');
const { collection } = require('../models/usuario');

const esRoleValido = async(role = "") => {
    const existeRol = await Role.findOne({ role });
    if( !existeRol ) {
        throw new Error (`El rol ${ role } no esta registrado en la BD.`);
    }
}

const emailExiste = async( correo='' ) => {
    const existeEmail = await Usuario.findOne({ correo })
    if( existeEmail ) {
        throw new Error (`El correo ${ correo } ya esta registrado.`)
    }
}

const existeUsuarioPorId = async( id ) => {
    const existeUsuario = await Usuario.findById( id )
    if( !existeUsuario ) {
        throw new Error (`El usuario con ID ${ id } no se encuentra en la base de datos.`)
    }
}

const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {
    
    const incluida = colecciones.includes( coleccion );
    if( !incluida ) {
        throw new Error (`La coleccion ${ coleccion } no es permitida - ${ colecciones }`)
    }
    return true;
}

module.exports = {
    emailExiste,
    esRoleValido,
    existeUsuarioPorId,
    coleccionesPermitidas
}