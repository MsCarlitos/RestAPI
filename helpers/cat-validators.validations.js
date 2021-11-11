const {Categoria} = require("../models")
const {Producto} = require("../models")

const existeCategoria = async( id ) => {
    const existeId = await Categoria.findById(id)

    if( !existeId ){
        throw new Error `El ID ${ id } es incorrecto.`
    }
}

const existeProducto = async( id ) => {
    const existeId = await Producto.findById(id)

    if( !existeId ){
        throw new Error `El ID ${ id } es incorrecto.`
    }
}

module.exports = {
    existeCategoria,
    existeProducto,
}