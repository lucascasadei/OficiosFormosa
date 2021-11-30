
const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);


const { response } = require("express");
const { model } = require("mongoose");
const { subirArchivo } = require("../helpers");

const { User, Service} = require('../models');

const CargarArchivo = async(req, res = response) => {


    try {

        // Imagenes
        //const nombre = await subirArchivo(req.files, ['txt','md'], 'textos');
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({msg});
    }
    

}

const ActualizarImagen = async(req, res = response) => {


    const {id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'users':
            modelo = await User.findById(id)
            if(!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            
            break;

        case 'service':
            modelo = await Service.findById(id)
            if(!modelo) {
                return res.status(400).json({
                    msg: `No existe un servicio con el id ${id}`
                });
            }
            
            break;
    
        default:
            return res.status(500).json({msg: 'Se me olvidó validar esto'});
    }

    // Limpiar imagenes previas
    if(modelo.photo) {  
        // Hay que borrar la imagen del servidor
        const pathPhoto = path.join(__dirname, '../uploads', coleccion, modelo.photo);
        if(fs.existsSync(pathPhoto)){
            fs.unlinkSync(pathPhoto);
        }
    
    }


    try {
        
    } catch (error) {
        
    }


    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.photo = nombre;

    await modelo.save();


    res.json(modelo);

}

const mostrarImagen = async(req, res = response) => {

    const {id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'users':
            modelo = await User.findById(id)
            if(!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            
            break;

        case 'service':
            modelo = await Service.findById(id)
            if(!modelo) {
                return res.status(400).json({
                    msg: `No existe un servicio con el id ${id}`
                });
            }
            
            break;
    
        default:
            return res.status(500).json({msg: 'Se me olvidó validar esto'});
    }

    // Limpiar imagenes previas
    if(modelo.photo) {  
        // Hay que borrar la imagen del servidor
        const pathPhoto = path.join(__dirname, '../uploads', coleccion, modelo.photo);
        if(fs.existsSync(pathPhoto)){
            return res.sendFile(pathPhoto)
        }
    
    }

    const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImagen);

}

const ActualizarImagenCloudinary = async(req, res = response) => {


    const {id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'users':
            modelo = await User.findById(id)
            if(!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            
            break;

        case 'service':
            modelo = await Service.findById(id)
            if(!modelo) {
                return res.status(400).json({
                    msg: `No existe un servicio con el id ${id}`
                });
            }
            
            break;
    
        default:
            return res.status(500).json({msg: 'Se me olvidó validar esto'});
    }

    // Limpiar imagenes previas
    if(modelo.photo) {  
        
        const nombreArr = modelo.photo.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [ public_id ] = nombre.split('.');

        cloudinary.uploader.destroy( public_id );
        
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    modelo.photo = secure_url;

    await modelo.save();
    res.json(modelo);

}



module.exports = {
    ActualizarImagenCloudinary,
    ActualizarImagen,
    CargarArchivo,
    mostrarImagen
}