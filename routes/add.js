/*
 ----------------------------------------------------------------
 Author: Pawan Araballi
 ----------------------------------------------------------------
 */

var express = require('express');
console.log('questions.js');
var add = express.Router();
var mysql = require('../models/mysql');
var verify_token = require('../models/verify');



add.post('/admin', function (req, res,next) {
    mysql.putLoginDetails(req.body,function (model) {
       if(model!=null && decoded.tag == 'admin') {
           res.json({statusCode:200 , message : 'admin added'});
       }else{
           res.json({statusCode:200 , message : 'admin not added'});
       }
    });

});
add.get('/user', function (req, res,next) {
    verify_token.verify(req.session.token,function(err, decoded) {

        if(!err && decoded.tag == 'admin') {
            mysql.getAllSupporter(function(model){
                var data = JSON.stringify(model);
                res.render('pages/add_user',{data:data});
                    });

        }
        else{
            console.log(err);
            user = null ;
            req.session.token = null ;
            res.render('pages/logout',{statusCode:200 , message : 'invalid session please login'});

        }
    });

});



add.get('/supporter', function (req, res,next) {
    verify_token.verify(req.session.token,function(err, decoded) {

        if(!err && decoded.tag == 'admin') {
            res.render('pages/add_supporter');
        }
        else{
            console.log(err);
            user = null ;
            req.session.token = null ;
            res.render('pages/logout',{statusCode:200 , message : 'invalid session please login'});

        }
    });

});

add.post('/supporter', function (req, res,next) {

    verify_token.verify(req.session.token,function(err, decoded) {

        if(!err  && decoded.tag == 'admin'){

            mysql.getSupporter(req.body.email,function(model){
                if(model ==  null){
                    var data = req.body;
                    console.log(data);
                    var login_details = {
                        username : data.email,
                        password : data.password,
                        tag : 'supporter'

                    }
                    delete data.password;

                    mysql.putSupporter(data,function(user){
                        console.log(user);
                    });
                    mysql.putLoginDetails(login_details,function(user){
                        console.log(user);
                    });
                    res.redirect('/admin/home');

                }else{

                    res.render('pages/add_supporter',{error : 'user already exists'});

                }
            });

        }else{
            console.log(err);
            user = null ;
            req.session.token = null ;
            res.render('pages/logout',{statusCode:200 , message : 'invalid session please login'});

        }
    });
});
add.post('/user', function (req, res,next) {

    verify_token.verify(req.session.token,function(err, decoded) {

        if(!err && decoded.tag == 'admin'){

            mysql.getUser(req.body.username,function(model){
                if(model ==  null){
                    console.log("no data");
                    var data = req.body;
                    console.log(data);
                    var login_details = {
                        username : data.username,
                        password : data.password,
                        tag : 'user'

                    }
                    mysql.putLoginDetails(login_details,function(user){
                        console.log(user);
                    });
                    delete data.password;
                    mysql.putUser(data,function(user){
                        console.log(user);
                    });
                    res.redirect('/admin/home');

                }else{

                    res.render('pages/add_user',{error : 'user already exists'});

                }
            });

        }else{
            console.log(err);
            user = null ;
            req.session.token = null ;
            res.render('pages/logout',{statusCode:200 , message : 'invalid session please login'});

        }
    });
});




module.exports = add;