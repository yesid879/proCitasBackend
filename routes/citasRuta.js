const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');

// creamos nuestras rutas para  el crud

router.post('/', citaController.agregarCitas);
router.get('/', citaController.mostrarCitas);
router.put('/:id', citaController.actualizarCitas);
router.delete('/:id', citaController.eliminarCitas);


module.exports = router;