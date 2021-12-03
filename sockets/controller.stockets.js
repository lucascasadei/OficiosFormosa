const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers");
const { ChatMensajes } = require('../models');
const  Message  = require('../models/message');



const chatMensajes = new ChatMensajes();

const socketController = async(socket = new Socket(), io) => {

    //console.log('cliente conectado', socket.id);
    const user  = await comprobarJWT(socket.handshake.headers['x-token']);
    if(!user) {
        return socket.disconnect();
    }
    
    //Agregar el usuario conectado
    chatMensajes.conectarUsuario(user);
    io.emit('usuarios-activos',     chatMensajes.usuariosArr)
    socket.emit('recibir-mensajes', chatMensajes.ultimos10);
    
    // Concectarlo a una sala especial
    socket.join(user.id); //globar, socket.id, ususario.id

    //Limpiar cuando alguien se desconeta
    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario(user.id);
        io.emit('usuarios-activos', chatMensajes.usuariosArr)
    })

    socket.on('enviar-mensaje', ({ uid, mensaje}) => {

        if(uid) {
            //Mensaje privado
            //console.log( mensaje);
            const message = new Message({emisor: user.id, receptor: uid, message: mensaje})
            message.save();
            socket.to(uid).emit('mensaje-privado',{de: user.name, message: mensaje, emisor: user.id, receptor: uid});

        }else {
            chatMensajes.enviarMensaje(user.id, user.name, mensaje);
            //enviar a todos
            io.emit('recibir-mensajes', chatMensajes.ultimos10);
        }

       
    })
}


module.exports = {
    socketController
}