/**
 * Created by hanjinchi on 15/6/16.
 */
var setting = require('../setting');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var Client = require('mongodb').MongoClient;

var instance = new Db(setting.db, new Server(setting.host, 27017, {}), {});

Client.connect('mongodb://eleme:uAreBestEleMe@localhost:27017/help',function(err,db){
  instance = db;
});

module.exports = instance;
