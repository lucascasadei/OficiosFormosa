const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/configdb');

class Server {

    constructor() {
        //Importamos express
        this.app = express();

        //Importamos el puerto
        this.port = process.env.PORT;


        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            category: '/api/category',
            service: '/api/service',
            uploads: '/api/uploads',
            usuariosPath: '/api/usuarios',
        }

        //Conectar a la base de datos
        this.conectarDB();


        // Middlewares (Es una funcion que siempre se ejecuta cuando levantamos nuestro servidor)
        this.middlewares();


        //Llamamos a nuestras rutas
        this.routes();

    }

    async conectarDB() {
        
        await dbConnection();
    }

    middlewares() {

        //Cors
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());


        //Directorio Publico (Abre el directorio publico una vez inicia el servidor)
        //Como ya tiene un archivo index.html entonces lo abre primero
        this.app.use(express.static('public'));

        //Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));


    }

    // Vemos las rutas 
    routes() {

        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.buscar, require('../routes/buscar.routes'));
        this.app.use(this.paths.usuariosPath, require('../routes/user.routes'));
        this.app.use(this.paths.service, require('../routes/service.routes'));
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
        this.app.use(this.paths.category, require('../routes/category.routes'));

    }

    // Escuchamos el puerto
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;