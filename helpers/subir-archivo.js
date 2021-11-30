const path = require('path');
const { v4: uuidv4 } = require('uuid');
uuidv4(); 


const subirArchivo = (files, extensionesValidas = ['png','jpg','jpeg','gif'], carpeta ='') => {

    return new Promise((resolve, reject) => {

    const { archivo } = files;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[nombreCortado.length -1];

    // Validar la extension 
    if(!extensionesValidas.includes(extension)){

        reject(`La extension ${extension}´no es permitida - ${extensionesValidas}`);

    }

    const nombreTemporar = uuidv4() + '.' + extension;
    const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemporar);

    archivo.mv(uploadPath, (err) => {
        if (err) {
            reject(err);
        }

        resolve(nombreTemporar);
       });


    });

    

}


module.exports = {
    subirArchivo
}