const { response } = require("express");
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require("../helpers/generar-jwt");


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verficiar si el correo existe
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        //Verificar si el usuario tiene status: true
        if(!user.status){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - status: false'
            });
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);

        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - status: false'
            });
        }

        //Generar el JWT
        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salio mal'
        });
    }

    

}

module.exports = {
    login
} 