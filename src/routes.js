const express = require('express');
const { is } = require('express/lib/request');
const routes = express.Router();

const { times } = require('./times');
const DB = require('./times');

routes.post('/newTime', (req, res) => {
  const { nome, cidade, estado, serie, titulos, folhaPagamento } = req.body;

  if (
    nome != undefined &&
    cidade != undefined &&
    estado != undefined &&
    titulos != undefined &&
    folhaPagamento != undefined
  ) {
    const id = times.length + 1;

    DB.times.push({
      id,
      nome,
      cidade,
      estado,
      serie,
      titulos,
      folhaPagamento,
    });

    res.status(200).json({
      msg: 'Time adicionando com sucesso!',
    });
  } else {
    res.status(400).json({
      msg: 'Dados obrigatórios incompletos.',
    });
  }
});

routes.get('/getAllTimes', (req, res) => {
  res.status(200).json({
    times,
  });
});

routes.get('/getTime/:id', (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    const id = parseInt(req.params.id);
    const time = DB.times.find((c) => c.id == id);

    if (time != undefined) {
      res.status(200).json({
        time,
      });
    } else {
      res.status(404).json({
        msg: 'Time não encontrado',
      });
    }
  }
});

routes.get('/getTimePorNome/:nome', (req, res) => {
  if (req.params.nome == undefined || req.params.nome == '') {
    res.sendStatus(400);
  } else {
    const nome = req.params.nome.toLocaleLowerCase();
    const time = DB.times.find((c) => c.nome.toLowerCase() == nome);

    if (time != undefined) {
      res.status(200).json({
        time,
      });
    } else {
      res.status(404).json({
        msg: 'Time não encontrado',
      });
    }
  }
});

routes.put('/editTime/:id', (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    const id = parseInt(req.params.id);
    const time = DB.times.find((c) => c.id == id);

    if (time != undefined) {
      const { nome, cidade, estado, serie, titulos, folhaPagamento } = req.body;

      if (nome != undefined) time.nome = nome;
      if (cidade != undefined) time.cidade = nome;
      if (estado != undefined) time.estado = estado;
      if (serie != undefined) time.serie = serie;
      if (titulos != undefined) time.titulos = titulos;
      if (folhaPagamento != undefined) time.folhaPagamento = folhaPagamento;

      return res.status(200).json({
        msg: 'Time modificado!',
        time,
      });
    } else {
      return res.status(404).json({
        msg: 'Time não encontrado.',
      });
    }
  }
});

routes.delete('/deleteTime/:id', (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    const id = parseInt(req.params.id);
    const index = DB.times.findIndex((c) => c.id == id);

    if (index != -1) {
      DB.times.splice(index, 1);
      res.status(200).json({
        msg: 'Time excluído com sucesso!',
      });
    } else {
      return res.status(404).json({
        msg: 'Time não encontrado.',
      });
    }
  }
});

module.exports = routes;
