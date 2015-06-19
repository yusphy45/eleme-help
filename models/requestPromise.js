/**
 * Created by hanjinchi on 15/6/19.
 */
var rq = require('request');
var q = require('q');

var requestPromise = function (options) {

  var deferred = q.defer();

  rq(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      deferred.resolve(body);
    } else {
      deferred.reject(error);
    }
  });

  return deferred.promise;
};

module.exports = requestPromise;