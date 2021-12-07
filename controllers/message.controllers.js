
const { response } = require("express");
const Menssage = require('../models/message');



//ObtenerMensaje por :id - populate {}
const ObtenerMessage = async(req, res = response) => {

    const { id } = req.params;
    const message = await Menssage.findById(id);
    
    if(!message){
        res.status(400).json({
            msg: `El mensaje con el id ${id} no encontrado`
        });
    }else {
        res.json(message);
    }

    

}


module.exports = {
    ObtenerMessage
}