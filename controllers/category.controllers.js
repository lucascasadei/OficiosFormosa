const { response } = require("express");
const { Category } = require('../models');


//ObtenerCategorias - paginado - total - populate
const ObtenerCategorias = async(req, res = response) => {
  
    const { limite = 5, desde = 0 } = req.query;
    const query = {status: true};

    const [total, category] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user','name')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        category

    });
}


//ObtenerCategoria por :id - populate {}

const ObtenerCategoria = async(req, res = response) => {

    const { id } = req.params;
    const category = await Category.findById(id).populate('user', 'name');

    res.json(category);

}


//Crearcategorias
const createCategory = async(req, res = response) => {


    const name = req.body.name.toUpperCase();

    const categyDB = await Category.findOne({name});

    if(categyDB) {
        return res.status(400).json({
            msg: `La categoria ${ categyDB.name }, ya existe`
        });
    }

    //Generar la data a guardar
    const data = {
        name, 
        user: req.user._id
    }

    const category = new Category(data);

    //Guardar en DB
    await category.save();
    res.status(201).json(category);

    


}

//ActualizarCategoria

const ActualizarCategoria = async(req, res = response) => {

    const { id } = req.params;
    const { status, user, ...data} = req.body;

    data.name = data.name.toUpperCase();
    //data.name  = req.body.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, {new: true});
    res.json(category);
}

//BorrarCategoria
const BorrarCategoria = async(req, res = response) => {

    const { id } = req.params;
    const cateoriaBorrada = await Category.findByIdAndUpdate(id, { status: false}, { new: true});

    res.json(cateoriaBorrada);
}

module.exports = {
    createCategory,
    ObtenerCategorias,
    ObtenerCategoria,
    ActualizarCategoria,
    BorrarCategoria
}