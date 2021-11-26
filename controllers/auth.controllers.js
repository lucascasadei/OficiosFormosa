const { response } = require("express");
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");


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

const googleSingIn = async(req, res = response) => {

    const { id_token } = req.body;

    try {

        const { name, picture, email} = await googleVerify(id_token);
        //console.log(name, picture, email);

        let user = await User.findOne({email});

        if(!user) {
            const data = {
                name,
                email,
                password: ':o',
                picture,
                role: 'User_Role',
                google: true
            }

            user = new User(data);
            await user.save();
        }

        //Si el usuario en DB
        if(!user.status) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        //Generar el JWT
        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        });
        
    } catch (error) {
        //console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        });
    }

    


}

module.exports = {
    login,
    googleSingIn
} 