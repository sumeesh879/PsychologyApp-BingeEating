
var jwt = require('jsonwebtoken');
var express = require('express');
var bcrypt = require('bcrypt');
var saltRounds = 5;
console.log('admin.js');
var login = express.Router();
var mysql = require('../models/mysql');

login.get('/admin', function (req, res,next) {

    console.log(req.session);

    var user = req.query.email;
    var password = req.query.password;
    console.log(user);
    if(user == null || password == null){
        res.render('pages/admin_login',{statusCode : 200 , message : "" , error: null});
    }else{
        mysql.getAdmin(user,function(model) {
            if(model ==  null){
                console.log("no data");
                res.render('pages/admin_login',{statusCode : 200 , message : "invalid credentials" , error: "invalid credentials"});

            }else{
                if((model.get('passw')).toString() === password){
                var token = jwt.sign({ user: user }, 'test' ,  {expiresIn:'1800000', jwtid: 'jwtid' });
                req.session.token = token;
                res.redirect('/admin/home');
                }
                else{
                    res.render('pages/admin_login',{statusCode : 200 , message : "invalid credentials" , error: "invalid credentials"});

                }
            }
        })

    }
});


login.get('/supporter', function (req, res,next) {

    console.log(req.session);

    var user = req.query.email;
    var password = req.query.password;
    if(user == null || password == null){
        res.render('pages/supporter_login',{statusCode : 200 , message : "" , error: null});
    }else{
        mysql.getSupporter(email,function(model) {
            if(model ==  null){
                console.log("no data");
                res.render('pages/supporter_login',{statusCode : 200 , message : "invalid credentials" , error: "invalid credentials"});

            }else{
                console.log(model);
                var hashpass = model.get('passw');
                console.log(hashpass);
                if( bcrypt.compareSync(password, hashpass)){
                    var token = jwt.sign({ user: user }, 'test' ,  {expiresIn:'1800000', jwtid: 'jwtid' });
                    req.session.token = token;
                    res.redirect('/admin/home');
                }
                else{
                    res.render('pages/supporter_login',{statusCode : 200 , message : "invalid credentials" , error: "invalid credentials"});

                }
            }
        })

    }
});
module.exports = login;