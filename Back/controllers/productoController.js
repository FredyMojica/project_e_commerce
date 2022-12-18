const producto = require("../models/producto");

exports.leerProductoHome = async ( req, res ) => {
    try{
        const producto1 = await producto.find();
        res.json({ producto1 });
    }catch(error){
        console.log(error);
    }
}

exports.leerProductos = async ( req, res ) => {
    const {id: categoriaId } = req.params;
    const productos = await producto.find().where("categoriaId").equals(categoriaId);
    res.json(productos);
}

exports.leerProducto = async ( req, res ) => {
    const { id: productoId } = req.params;
    const producto1 = await producto.findById(productoId);
    res.json({ producto: producto1 });
}


exports.crearProducto = async ( req, res ) => {
    try{
        const producto1 = new producto(req.body);
        producto1.creador = req.usuario.id;
        producto1.save();
        res.json(producto1);
    }catch(error){
        console.log(error);
    }
}
exports.actualizarProducto = async ( req, res ) => {
    const { id } = req.params;
    const producto1 = await producto.findById(id);
    console.log("Producto", JSON.stringify(producto1))
    
    if(!producto1){
        return res.status(400).json({msg:"Producto no encontrado"});
    }

    if(producto1.creador.toString() !== req.usuario.id.toString()){
        return res.status(400).json({ msg: "Acción no válida para este usuario"})
    }

    producto1.nombre = req.body.nombre || producto1.nombre;
    producto1.descripcion = req.body.descripcion || producto1.descripcion;
    producto1.stock = req.body.stock || producto1.stock;
    producto1.precio = req.body.precio || producto1.precio;
    producto1.imagen = req.body.imagen || producto1.imagen;

    producto1.save();
    res.json({ producto: producto1 });
}
exports.borrarProducto = async ( req, res ) => {
    try{
        await producto.deleteOne({_id: req.params.id });
        res.json({ msg: "Producto eliminado"});
    }catch(error){
        console.log(error);
    }
}