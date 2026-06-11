const Celular = require("../models/celular");

exports.receberDados = async (req, res) => {
    console.log("LOG DE REQUISICAO");
    console.log("Horário:", new Date().toLocaleString());
    console.log("Body recebido:");
    console.log(JSON.stringify(req.body, null, 2));

    try {
        const dados = req.body;

        const novo = await Celular.create(dados);

        console.log("Documento salvo:");
        console.log(JSON.stringify(novo, null, 2));

        return res.status(201).json({
            status: "ok",
            message: "Dados salvos com sucesso",
            data: novo
        });

    } catch (error) {
        console.error("ERRO AO SALVAR:");
        console.error(error);

        return res.status(500).json({
            status: "erro",
            message: error.message
        });
    }
};

exports.verDados = async (req, res) => {
    try {
        const dados = await Celular.find().sort({ createdAt: -1 });

        return res.status(200).json({
            status: "ok",
            total: dados.length,
            data: dados
        });

    } catch (error) {
        return res.status(500).json({
            status: "erro",
            message: error.message
        });
    }
};