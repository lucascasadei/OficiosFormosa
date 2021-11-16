const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/configdb');

class Server {

    constructor() {
        //Importamos express
        this.app = express();

        //Importamos el puerto
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

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


    }

    // Vemos las rutas 
    routes() {

        this.app.use('/api/usuarios', require('../routes/user.routes'));
    }

    // Escuchamos el puerto
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;