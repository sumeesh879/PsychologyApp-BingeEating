
var jwt = require('jsonwebtoken');
var express = require('express');
var bcrypt = require('bcrypt');
var supporter = express.Router();
var mysql = require('../models/mysql');
var verify_token = require('../models/verify');

supporter.get('/home', function (req, res,next) {

    verify_token.verify(req.session.token,function(err, decoded) {

        if(!err && decoded.tag == 'supporter '){
            console.log(decoded.user);
            user = decoded.user;
            mysql.getUserForSupporter(user,function (model) {
                console.log(model);
                var data = JSON.stringify(model);
                res.render('pages/s_dashboard',{data:data});
            });





        }else{
            console.log(err);
            user = null ;
            req.session.token = null ;
            res.render('pages/logout',{statusCode:200 , message : 'invalid session please login'});

        }
    });
});



module.exports = supporter;