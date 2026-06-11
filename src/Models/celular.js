const mongoose = require("mongoose");

const CelularSchema = new mongoose.Schema({
    celular: {
        type: String,
        required: true
    },
    bateria: Object,
    cpu: Object,
    ram: Object,
    armazenamento: Object,
    sistema: Object,
    data: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Celular", CelularSchema);