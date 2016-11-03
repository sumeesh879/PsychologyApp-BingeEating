

var mysql = require('mysql');
var saltrounds = 5;
var knex = require('knex')({
	client:'mysql',
	connection: {
		host : 'mydbase.cwgnanpueibv.us-east-1.rds.amazonaws.com',
      	user : 'indra',
      	password : 'qqqqqqqq',
      	port : '3306',
      	database: "BingeEating"
	}
});

var bookshelf = require('bookshelf')(knex);
 
var Question = bookshelf.Model.extend({
  tableName: 'Question'
});

var Admin = bookshelf.Model.extend({
  tableName: 'Admin'
});
var Supporter = bookshelf.Model.extend({
  tableName: 'Supporter'
});
var User = bookshelf.Model.extend({
  tableName: 'User'
});

module.exports.Questions = function(callback) {
new Question()
.fetchAll()
.then(callback);
}

module.exports.getAdmin = function(user,callback) {
new Admin({email: user })
.fetch()
.then(callback);
}

module.exports.getSupporter = function(user,callback) {
new Supporter({email: user })
.fetch()
.then(callback);
}

module.exports.putSupporter = function(user,callback) {
	new Supporter({email: user })
		.fetch()
		.then(callback);
}


module.exports.putUser = function(user,callback) {
	new Supporter({email: user })
		.fetch()
		.then(callback);
}


