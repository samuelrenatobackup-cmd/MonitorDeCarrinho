let ultimoDado = null; 

exports.receberDados = (req, res) => {
  ultimoDado = req.body;

  console.log("📩 Dados recebidos:", ultimoDado);

  res.json({
    status: "ok",
    message: "dados recebidos com sucesso",
    data: ultimoDado
  });
};

exports.verDados = (req, res) => {
  if (!ultimoDado) {
    return res.json({
      status: "vazio",
      message: "nenhum dado recebido ainda"
    });
  }

  res.json({
    status: "ok",
    data: ultimoDado
  });
};