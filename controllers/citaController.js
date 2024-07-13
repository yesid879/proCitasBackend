const Cita = require('../models/Cita');

// funcion agregar citas
exports.agregarCitas = async (req, res) => {

    try {
        let citas = new Cita(req.body);
        await citas.save();
        res.send({ citas });


    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "hubo un error al agregar una cita" });
    }
}

// nuestra funcion mostrar citas
exports.mostrarCitas = async (req, res) => {

    try {

        const citas = await Cita.find();
        res.json({ citas })

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "hubo un error al mostrar citas" });
    }
}

// actulizar citas 
exports.actualizarCitas = async (req, res) => {
    try {
        const citas = await Cita.findOneAndUpdate(
            { _id: req.params.id }, req.body);

        if (!citas)
            res.status(404).json({ msg: "cita no encontrada"});

        else
            res.json({ citas })
    

        
    } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "hubo un error al actualizar una cita" });
}
}

exports.eliminarCitas = async (req, res) => {
    try {

        let citas = await Cita.findById(req.params.id);
        if(!citas){
            res.status(404).send('Cita no encontrado');
        }else{
            await Cita.findOneAndDelete({_id: req.params.id});
            res.json({msg:"la cita ha sido eliminada"})
        }
        
    } catch (error) {
         console.log(error);
        res.status(500).send('Hubo un error al eliminar una cita');
    }
}