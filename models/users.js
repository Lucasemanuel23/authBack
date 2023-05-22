const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/reservas', { useNewUrlParser: true});

var Schema = mongoose.Schema;


const Usuarios = new Schema ({

    nome            : {type:String, required: true},
    email           : {type:String, required: true},
    senha           : {type:String, required: true},
    token           : {type:String, required: true},
    nsessao         : {type:String, required: true}
    
})

const UsuarioModel = mongoose.model('usuarios', Usuarios)

module.exports = {UsuarioModel}