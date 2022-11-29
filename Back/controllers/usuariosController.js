const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

exports.crearUsuario = async ( req, res) => {
    //console.log(req.body);
    //res.json({ msg: "desde controller post el primer request"})
    const { password, email } = req.body;

    try{
        //revisar que sea un único correo
        let usuario = await Usuario.findOne({ email });

        if (usuario){
            return res.status(400).json({ msg : "El usuario ya existe"});
        }

        //crear un nuevo usuario
        usuario = new Usuario(req.body);

        //hash
        usuario.password = await bcryptjs.hash(password, 10); //10 es la cantidad de rondas que hace para encriptar el password

        //Guardar usuario en la bd
        const usuarioAlmacenado = await usuario.save();
        res.json(usuarioAlmacenado);

    }catch(error){
        console.log(error);
    }
};