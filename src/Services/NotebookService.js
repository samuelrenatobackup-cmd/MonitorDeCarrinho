const Notebook = require("../Models/Notebook");

async function listarNotebooks() {
    return await Notebook.find().populate("carrinho").sort({ criadoEm: -1 });
}

async function buscarNotebookPorId(id) {
    return await Notebook.findById(id).populate("carrinho");
}

async function criarNotebook(dados) {
    const notebook = new Notebook(dados);
    return await notebook.save();
}

async function atualizarNotebook(id, dados) {
    return await Notebook.findByIdAndUpdate(id, dados, { new: true }).populate("carrinho");
}

async function deletarNotebook(id) {
    return await Notebook.findByIdAndDelete(id);
}

module.exports = {
    listarNotebooks,
    buscarNotebookPorId,
    criarNotebook,
    atualizarNotebook,
    deletarNotebook
};
