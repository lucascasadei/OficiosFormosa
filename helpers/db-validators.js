const Role = require('../models/role');
const {User, Category, Servicio} = require('../models');

const isRoleValid = async(role = '') => {

    const existRole = await Role.findOne({role});
    if (!existRole) {
        throw new Error(`El role ${ role } no esta registrado en la BD`)
    }
}

const emailExist = async(email='' ) => {
    const existEmail = await User.findOne({email});

    if (existEmail) {
        throw new Error(`El email ${email} ya esta registrado`)
    }
}

const existUserById = async(id) => {
    const existUser = await User.findById(id);

    if (!existUser) {
        throw new Error(`El id no existe ${id} ya esta registrado`)
    }
}

/*
Categoria
*/
const existeCategoriaPorId = async(id) => {
    const existCategory = await Category.findById(id);

    if (!existCategory) {
        throw new Error(`El id no existe ${id}`)
    }
}


/*
Servicio
*/
const existeServiceId = async(id) => {
    const existServicio = await Servicio.findById(id);

    if (!existServicio) {
        throw new Error(`El id no existe ${id}`)
    }
}



module.exports = {
    isRoleValid,
    emailExist,
    existUserById,
    existeCategoriaPorId,
    existeServiceId
}