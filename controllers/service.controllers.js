const { response } = require("express");
const { Service } = require('../models');


//ObtenerService - paginado - total - populate
const ObtenerService = async(req, res = response) => {
  
    const { limite = 5, desde = 0 } = req.query;
    const query = {status: true};

    const [total, service] = await Promise.all([
        Service.countDocuments(query),
        Service.find(query)
            .populate('user','name')
            .populate('category','name')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        service

    });
}


//ObtenerService por :id - populate {}
const ObtenerServiceid = async(req, res = response) => {

    const { id } = req.params;
    const service = await Service.findById(id)
                            .populate('user', 'name')
                            .populate('category', 'name');

    res.json(service);

}


//Crearservice
const createService = async(req, res = response) => {


    const {satus, user, ...body} = req.body;

    const serviceDB = await Service.findOne({name: body.name});

    if(serviceDB) {
        return res.status(400).json({
            msg: `El servicio ${ serviceDB.name }, ya existe`
        });
    }

    //Generar la data a guardar
    const data = {
        ...body,
        name: body.name.toUpperCase(), 
        user: req.user._id
    }

    const service = new Service(data);

    //Guardar en DB
    await service.save();
    res.status(201).json(service);

    
}

//ActualizarService
const ActualizarService = async(req, res = response) => {

    const { id } = req.params;
    const { status, user, ...data} = req.body;

    if(data.name) {
        data.name = data.name.toUpperCase();
    }
    //data.name  = req.body.name.toUpperCase();
    data.user = req.user._id;

    const service = await Service.findByIdAndUpdate(id, data, {new: true});
    res.json(service);
}


//BorrarService
const BorrarService = async(req, res = response) => {

    const { id } = req.params;
    const serviceBorrada = await Service.findByIdAndUpdate(id, { status: false}, { new: true});

    res.json(serviceBorrada);
}

module.exports = {
    createService,
    ObtenerService,
    ObtenerServiceid,
    ActualizarService,
    BorrarService
}