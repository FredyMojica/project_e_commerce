const Categoria = require("../models/categoria");
const Producto = require("../models/producto");

//req: lo q se puede leer desde postman
//res: lo qe se envía hacia postman

exports.leerProducto = async(req, res) =>{
    try{
        const producto = await Producto.find({creador : req.usuario.id});
        res.json({producto});
    }catch(error){
        console.log(error);
    }
}
exports.crearProducto = async(req, res) =>{
    
    const {categoriaId} = req.body;
    try{
        const categoriaExiste = await Categoria.findById(categoriaId);
        if(!categoriaExiste){
            return res.status(400).json({msg:"Ingrese una categoría válida."});
        }

        const producto = new Producto(req.body);
        await producto.save();

        res.json(producto);
        
    }catch(error){
        console.log(error);
    }
}
exports.actualizarProducto = async(req, res) =>{
    const {id} = req.params;
    const producto = await Producto.findById(id);
    if(!producto){
        return res.status(404).json({msg:"Producto no encontrado"});
    }

    // if(producto.creador.toString() !== req.usuario.id.toString()){
    //     return res.status(400).json({msg:"Acción no válida para esta categoría"});
    // }

    producto.nombre = req.body.nombre || producto.nombre;
    producto.descripcion = req.body.descripcion || producto.descripcion;
    producto.stock = req.body.stock || producto.stock;
    producto.precio = req.body.stock || producto.precio;
    producto.imagen = req.body.imagen || producto.imagen;
    producto.save();
    res.json({producto});
}
exports.borrarProducto = async(req, res) =>{
    try{
        await Producto.deleteOne({_id: req.params.id}); //
        res.json({msg: "Producto eliminado"});
    }catch(error){
        console.log(error);
    }
}


// exports.leerProducto = async(req, res) =>{
//     res.json({msg:"aquí se ejecutó leer producto"});
// }
// exports.crearProducto = async(req, res) =>{
//     res.json({msg:"aquí se ejecutó crearc producto"});
// }
// exports.actualizarProducto = async(req, res) =>{
//     res.json({msg:"aquí se ejecutó actualizar producto"});
// }
// exports.borrarProducto = async(req, res) =>{
//     res.json({msg:"aquí se ejecutó borrar producto"});
// }
