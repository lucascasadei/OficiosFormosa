const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { User, Category, Service } = require('../models');

const coleccionesPermitidas = [
    
    'category',
    'user',
    'service',
    'role'

];


const buscarUsers = async(termino = '', res = response) => {
    
    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const user = await User.findById(termino);
        return res.json({
            result: (user) ? [user] : []
        });
    }

    const expresionregular = new RegExp(termino, 'i');

    const user = await User.find({
        $or: [{name:expresionregular}, {correo:expresionregular}],
        $and:[{status: true}]
    });
    res.json({
        result: user
    });

}

const buscarCategory = async(termino = '', res = response) => {
    
    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const category = await Category.findById(termino);
        return res.json({
            result: (category) ? [category] : []
        });
    }

    const expresionregular = new RegExp(termino, 'i');

    const category = await Category.find({name: expresionregular, status:true});
    res.json({
        result: category
    });

}

const buscarService = async(termino = '', res = response) => {
    
    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const service = await Service.findById(termino)
                              .populate('category','name');
        return res.json({
            result: (service) ? [service] : []
        });
    }

    const expresionregular = new RegExp(termino, 'i');

    const service = await Service.find({name: expresionregular, status:true})
                          .populate('category','name');      
    res.json({
        result: service
    });

}


const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'category':
            buscarCategory(termino, res);
        break;
        case 'user':
            buscarUsers(termino, res);
        break;
        case 'service':
            buscarService(termino, res);
        break;

        default: 
            res.status(500).json({
                msg: 'Se me olvido hacer esta búsqueda'
            })
    }
}


module.exports = {
    buscar
}