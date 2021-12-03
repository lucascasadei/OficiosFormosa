class Mensaje {
    constructor(uid, name, mensaje) {
        this.uid     = uid;
        this.name    = name;
        this.mensaje = mensaje;
    }
}

class ChatMensajes {
    constructor() {
        this.mensajes = [];
        this.user = {};
    }

    get ultimos10() {
        this.mensajes = this.mensajes.splice(0,10);
        return this.mensajes;
    }

    get usuariosArr() {
        return Object.values(this.user); 
    }

    enviarMensaje( uid, name, mensaje ){
        this.mensajes.unshift(
            new Mensaje(uid, name, mensaje)
        );
    }

    conectarUsuario(user, ){
        this.user[user.id] = user;

    }

    desconectarUsuario(id){
        delete this.user[id];
    }
}


module.exports = ChatMensajes;