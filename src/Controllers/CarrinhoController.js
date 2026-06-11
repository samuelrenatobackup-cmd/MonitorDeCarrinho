const carrinhoService = require("../services/carrinhoService");

async function listar(req, res) {
    try {
        const carrinhos = await carrinhoService.listarCarrinhos();
        res.json(carrinhos);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao listar carrinhos", detalhe: error.message });
    }
}


async function buscarPorId(req, res) {
    try {
        const carrinho = await carrinhoService.buscarCarrinhoPorId(req.params.id);
        if (!carrinho) return res.status(404).json({ erro: "Carrinho não encontrado" });
        res.json(carrinho);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar carrinho", detalhe: error.message });
    }
}


async function buscarNotebooks(req, res) {
    try {
        const resultado = await carrinhoService.buscarNotebooksDoCarrinho(req.params.id);
        if (!resultado) return res.status(404).json({ erro: "Carrinho não encontrado" });
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar notebooks do carrinho", detalhe: error.message });
    }
}

async function criar(req, res) {
    try {
        const carrinho = await carrinhoService.criarCarrinho(req.body);
        res.status(201).json(carrinho);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar carrinho", detalhe: error.message });
    }
}

async function atualizar(req, res) {
    try {
        const carrinho = await carrinhoService.atualizarCarrinho(req.params.id, req.body);
        if (!carrinho) return res.status(404).json({ erro: "Carrinho não encontrado" });
        res.json(carrinho);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar carrinho", detalhe: error.message });
    }
}

async function deletar(req, res) {
    try {
        const carrinho = await carrinhoService.deletarCarrinho(req.params.id);
        if (!carrinho) return res.status(404).json({ erro: "Carrinho não encontrado" });
        res.json({ mensagem: "Carrinho deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao deletar carrinho", detalhe: error.message });
    }
}

module.exports = { listar, buscarPorId, buscarNotebooks, criar, atualizar, deletar };
