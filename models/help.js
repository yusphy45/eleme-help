/**
 * Created by hanjinchi on 15/6/12.
 */
var mongodb = require('./db');
var marked = require('./marked-parser');
var ObjectId = require('mongodb').ObjectID;

function Help(obj) {
  this.question = obj.question || '';
  this.answer = obj.answer || '';
  this.user = obj.user || '';
  this.editor = obj.editor || '';
  this.hot = obj.hot || 'off';
  this.levelTopClass = obj.levelTopClass || '';
  this.levelSecondClass = obj.levelSecondClass || '';
  this.createTime = new Date();
  this.updateTime = new Date();
  this._id = obj._id ? ObjectId(obj._id) : '';
}

Help.prototype.createQa = function (callback) {

  var content = {
    question: this.question,
    answer: this.answer,
    user: this.user,
    editor: this.editor,
    hot: this.hot,
    levelTopClass: this.levelTopClass,
    levelSecondClass: this.levelSecondClass,
    createTime: this.createTime,
    updateTime: this.updateTime
  };

  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }

    db.collection('helpDocuments', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }

      collection.insert(content, {}, function (err, content) {
        mongodb.close();
        callback(err, content);
      })

    })
  });

};

Help.prototype.editQa = function (callback) {

  var id = this._id

  var content = {
    question: this.question,
    answer: this.answer,
    editor: this.editor,
    hot: this.hot,
    levelTopClass: this.levelTopClass,
    levelSecondClass: this.levelSecondClass
  };

  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }

    db.collection('helpDocuments', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }

      collection.findOneAndUpdate({_id: id}, {$set: content}, function (err, content) {
        mongodb.close();
        callback(err, content);
      })

    })
  });

};

Help.removeOne = function removeOne(query, callback){
  var id = ObjectId(query.id);
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }

    db.collection('helpDocuments', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }

      collection.findOneAndDelete({_id: id}, {}, function (err, content) {
        mongodb.close();
        callback(err, content);
      })

    })
  });

};

Help.allQA = function getAll(query, callback) {

  mongodb.open(function (err, db) {
      if (err) {
        return callback(err);
      }

      db.collection('helpDocuments', function (err, collection) {

        if (err) {
          mongodb.close();
          return callback(err);
        }

        collection.find(query,{}).sort({createTime: 1}).toArray(function (err, docs) {

          mongodb.close();

          if (err) {
            callback(err, null);
          }

          var content = [];

          docs.forEach(function (doc, index) {
            var temp = doc.answer;
            doc._id = doc._id.toString();
            doc.answer = marked(temp);
            content.push(doc);
          });

          callback(null, content);
        })

      })
    }
  )
  ;

}
;

Help.oneQa = function getOne(query, callback) {
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }

    db.collection('helpDocuments', function (err, collection) {

      if (err) {
        mongodb.close();
        return callback(err);
      }

      var condition = {
        _id: ObjectId(query.uri)
      };
      collection.findOne(condition, function (err, doc) {

        mongodb.close();

        if (err) {
          callback(err, null);
        }
        var result = {};

        result = doc;

        callback(null, result);
      })

    })
  });
};

module.exports = Help;

