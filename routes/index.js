var express = require('express');
var router = express.Router();
var Help = require('../models/help');
var requestPromise = require('../models/requestPromise');
var basePath = 'http://localhost:3000';

router.questionIndex = function (req, res) {

  var options = {
    url: req.query.class ? '/help/questionall?levelTopClass=' + req.query.class : '/help/questionall',
    baseUrl: basePath,
    json: true
  };

  requestPromise(options).then(function (response) {
    res.render('help-list', {content: response.data});
  }, function (reason) {
    res.render('error', {message: reason.message, stack: reason.stack});
  });

};

router.questionGetAll = function (req, res) {

  res.set({'Content-Type': 'text/json', 'Encodeing': 'utf8'});
  Help.allQA(req.query, function (err, content) {
    if (err) {
      content = [];
    }
    res.status(200).send({data: content});
  });

};

router.questionPost = function (req, res) {

  res.set({'Content-Type': 'text/json', 'Encodeing': 'utf8'});

  var help = new Help(req.body);

  help.createQa(function (err) {
    if (err) {
      res.send({status: "failed"});
    } else {
      res.send({status: "success"});
    }
  });

};

router.questionPut = function (req, res) {

  res.set({'Content-Type': 'text/json', 'Encodeing': 'utf8'});

  var help = new Help(req.body);

  help.editQa(function (err) {
    if (err) {
      res.send({status: "failed"});
    } else {
      res.send({status: "success"});
    }
  });

};

router.questionDelete = function (req, res) {

  res.set({'Content-Type': 'text/json', 'Encodeing': 'utf8'});

  Help.removeOne(req.params, function (err) {
    if (err) {
      res.send({status: "failed"});
    } else {
      res.send({status: "success"});
    }
  });

};

router.questionGetOne = function (req, res) {

  res.set({'Content-Type': 'text/json', 'Encodeing': 'utf8'});

  Help.oneQa(req.query, function (err, content) {
    if (err) {
      content = {};
    }
    res.status(200).send({data: content});
  });

};

router.questionPostView = function (req, res) {

  res.render('help-add', req.body);

};

router.questionPutView = function (req, res) {

  var options = {
    url: '/help/question?uri=' + req.params.id,
    baseUrl: basePath,
    json: true
  };

  requestPromise(options).then(function (response) {
    res.render('help-edit', {content: response.data});
  }, function (reason) {
    res.render('error', {message: reason.message, stack: reason.stack});
  });

};

router.questionDeleteView = function (req, res) {

};


module.exports = router;
