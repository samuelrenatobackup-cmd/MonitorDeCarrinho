const mongoose = require("mongoose");

const NotebookSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: true
    },

    localizacao: String,

    patrimonio: String,

    numeroDisp: Number,

    processador: String,

    ramTotal: Number,

    armazenamentoTotal: Number,

    sistema: String,

    bateria: {
        nivel: Number,
        tecnologia: String,
        saude: String,
        status: String,
        temperatura: Number
    },

    carrinho: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carrinho"
    },

    status: {
        type: String,
        enum: ["guardado", "retirado", "offline"],
        default: "offline"
    },

    criadoEm: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Notebook", NotebookSchema);