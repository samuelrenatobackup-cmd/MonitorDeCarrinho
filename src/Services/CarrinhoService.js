const Carrinho = require("../Models/Carrinho");
const Notebook = require("../Models/Notebook");

async function listarCarrinhos() {
    return await Carrinho.find().sort({ criadoEm: -1 });
}

async function buscarCarrinhoPorId(id) {
    return await Carrinho.findById(id);
}

async function buscarNotebooksDoCarrinho(id) {
    const carrinho = await Carrinho.findById(id);
    if (!carrinho) return null;
    const notebooks = await Notebook.find({ carrinho: id });
    return { carrinho, notebooks };
}

async function criarCarrinho(dados) {
    const carrinho = new Carrinho(dados);
    return await carrinho.save();
}

async function atualizarCarrinho(id, dados) {
    return await Carrinho.findByIdAndUpdate(id, dados, { new: true });
}

async function deletarCarrinho(id) {
    return await Carrinho.findByIdAndDelete(id);
}

module.exports = {
    listarCarrinhos,
    buscarCarrinhoPorId,
    buscarNotebooksDoCarrinho,
    criarCarrinho,
    atualizarCarrinho,
    deletarCarrinho
};
