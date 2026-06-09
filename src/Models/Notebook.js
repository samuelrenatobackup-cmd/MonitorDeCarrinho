const NotebookSchema = new mongoose.Schema({

    nome: String,

    patrimonio: String,

    numeroSlot: Number,

    processador: String,

    ramTotal: Number,

    armazenamentoTotal: Number,

    sistema: String,

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

})