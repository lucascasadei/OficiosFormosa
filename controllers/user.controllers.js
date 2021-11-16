const { response } = require('express');
const bcrypts = require('bcryptjs');
const User = require('../models/user');


const usuariosGet = async(req, res = response) => {

    //const {mensaje} = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = {status: true};

    const [total, user] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        user
        /*total,
        user*/
    });
}


const usuariosPut = async(req, res = response) => {

    const {id} = req.params;
    const { _id, password, google, email, ...rest} = req.body;

    //Validad contra base de datos
    if (password) {
        const salt = bcrypts.genSaltSync();
        rest.password = bcrypts.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json({
        user
    });
}

const usuariosPost = async(req, res) => {

    
    const {name, password, email, google, role, status} = req.body;
    const user = new User({name, password, email, google, role, status});

    //Verficar si el correo existe 
    /*const existEmail = await User.findOne({email});

    if (existEmail) {
        return res.status(400).json({
            msg: 'El correo ya esta registrado'
        });
    }*/

    //Encriptar la contraseña
    const salt = bcrypts.genSaltSync();
    user.password = bcrypts.hashSync(password, salt);

    //Guardar en base de datos 
    await user.save();

    res.json({
        msg: 'post API - controlador',
        user
    });
}

const usuariosDelete = async(req, res) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    //const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, { status: false});

    res.json({
        user
    });
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - controlador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}