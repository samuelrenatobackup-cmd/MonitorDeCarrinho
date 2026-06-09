const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB conectado");
    } catch (error) {
        console.log("Erro ao conectar:", error.message);
    }
}

module.exports = connectDB;