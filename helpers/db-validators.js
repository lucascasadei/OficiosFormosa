const Role = require('../models/role');
const User = require('../models/user');

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



module.exports = {
    isRoleValid,
    emailExist,
    existUserById
}