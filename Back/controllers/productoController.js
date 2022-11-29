const producto = require("../models/producto");

exports.leerProducto = async ( req, res ) => {
    res.json({ msg: "ejecutó leer Producto"});
}
exports.crearProducto = async ( req, res ) => {
    res.json({ msg: "ejecutó crear Producto"});    
}
exports.actualizarProducto = async ( req, res ) => {
    res.json({ msg: "ejecutó actualizar Producto"});    
}
exports.borrarProducto = async ( req, res ) => {
    res.json({ msg: "ejecutó borrar Producto"});    
}