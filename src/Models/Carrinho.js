const mongoose = require("mongoose");
const CarrinhoSchema = new mongoose.Schema({

    nome: String,

    localizacao: String,

    ativo: {
        type: Boolean,
        default: true
    },

    criadoEm: {
        type: Date,
        default: Date.now
    }

})
module.exports = mongoose.model("Carrinho", CarrinhoSchema);
