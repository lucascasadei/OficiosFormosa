const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { createServer } = require('http');



const { dbConnection } = require('../database/configdb');
const { socketController } = require('../sockets/controller.stockets');

class Server {

    constructor() {
        //Importamos express
        this.app = express();

        //Importamos el puerto
        this.port = process.env.PORT;

        //Server
        this.server = createServer(this.app);

        //Server Socket
        this.io = require('socket.io')(this.server);


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

        //Sockets
        this.sockets();

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

    sockets() {
        this.io.on('connection', (socket) => socketController(socket, this.io))
    };

    // Escuchamos el puerto
    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;