const { response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validarJWR = async(req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPROVATEKEY);
        
        //Leer el usuario que corresponde al uid
        const user = await User.findById( uid );

        //Verificar si el usuario existe
        if(!user){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en la BD'
            });
        }

        //Verificar si el uid tiene estado en true
        if(!user.status){

            return res.status(401).json({
                msg: 'Token no valido - usuario con estado: false'
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }

    console.log(token);

    next();

}

module.exports = {
    validarJWR
}