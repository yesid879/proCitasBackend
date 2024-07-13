const express = require('express');
const conectarBD = require('../config/db');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// llamamos nuestra funcion conectarBD
conectarBD();
app.use(cors());

// habilitamos express.json
app.use(express.json({extended: true}));

// rutas aplicacion 
app.use('/api/citas', require('../routes/citasRuta'));
app.use('/api/clientes', require('../routes/cliente'));
app.use('/api/auth', require("../routes/auth"));
app.use('/api/usuarios', require ("../routes/usuarios"));

// rutas de prueba y configuracion
app.get('/',(req,res) =>{
    res.send("Bienvenidos estamos desde el navegador");
});

app.listen(port,() => console.log("estamos conectados por el servidor con el puerto:", port));