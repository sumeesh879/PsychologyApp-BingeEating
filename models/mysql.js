
var bcrypt = require('bcrypt');
var mysql = require('mysql');
var saltRounds = 5;
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
var Login = bookshelf.Model.extend({
	tableName: 'Login'
});

module.exports.Questions = function(callback) {
new Question()
.fetchAll()
.then(callback);
}
module.exports.getLoginDetails = function(user,callback) {
	console.log(user)
	new Login({username: user })
		.fetch()
		.then(callback);
}
module.exports.putLoginDetails = function(data,callback) {
	data.password = bcrypt.hashSync(data.password, saltRounds);
	console.log(data);
	new Login(data).save()
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

module.exports.getAllSupporter = function(callback) {
	new Supporter()
		.fetchAll()
		.then(callback);
}
module.exports.getUser = function(user,callback) {
	new User({username: user })
		.fetch()
		.then(callback);
}
module.exports.putSupporter = function(user,callback) {
	console.log(user.username);

	new Supporter(user).save()
		.then(callback);

}

module.exports.getUserForSupporter = function(user,callback) {
	console.log(user);

	new User().where({supporter : user}).fetchAll().then(callback);
}

module.exports.putUser = function(user,callback) {
	user.password = bcrypt.hashSync(user.password, saltRounds);
	console.log(user.username+' and '+user.password);

	new User(user).save()
		.then(callback);
}


