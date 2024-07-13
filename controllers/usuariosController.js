const Usuario = require('../models/Usuario');
const bcryptjs = require("bcryptjs");
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async(req, res) =>{
    // vamos  a revisar  errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

   const {email, password} = req.body;

   try {
    // revisar que el usuario registrado sea unico 
    let usuario = await Usuario.findOne({email});

    if(usuario){
        return res.status(400).json({msg:"El usuario ya existe"});
    }

    // creamos el usuario
    usuario = new Usuario(req.body);

    usuario.password = await bcryptjs.hash(password, 10);
    // guardar el usuario en la base de datos 
    await usuario.save();

    // firmar el JWT 
    const payload = {
        usuario: {id: usuario.id},
    };

    jwt.sign(
     payload, process.env.SECRETA,
     {
        expiresIn: 3600, // 1  HORA
     },
     (error, token) =>{
        if(error)throw error;

        // mensaje de confirmacion
        res.json({token});
     }
    );
    
   } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error")    
   }
};

