const notebookService = require("../Services/NotebookService");

async function listar(req, res) {
    try {
        const notebooks = await notebookService.listarNotebooks();
        res.json(notebooks);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao listar notebooks", detalhe: error.message });
    }
}

async function buscarPorId(req, res) {
    try {
        const notebook = await notebookService.buscarNotebookPorId(req.params.id);
        if (!notebook) return res.status(404).json({ erro: "Notebook não encontrado" });
        res.json(notebook);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar notebook", detalhe: error.message });
    }
}

async function criar(req, res) {
    try {
        const notebook = await notebookService.criarNotebook(req.body);
        res.status(201).json(notebook);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar notebook", detalhe: error.message });
    }
}

async function atualizar(req, res) {
    try {
        const notebook = await notebookService.atualizarNotebook(req.params.id, req.body);
        if (!notebook) return res.status(404).json({ erro: "Notebook não encontrado" });
        res.json(notebook);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar notebook", detalhe: error.message });
    }
}

async function deletar(req, res) {
    try {
        const notebook = await notebookService.deletarNotebook(req.params.id);
        if (!notebook) return res.status(404).json({ erro: "Notebook não encontrado" });
        res.json({ mensagem: "Notebook deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao deletar notebook", detalhe: error.message });
    }
}

module.exports = { listar, buscarPorId, criar, atualizar, deletar };
