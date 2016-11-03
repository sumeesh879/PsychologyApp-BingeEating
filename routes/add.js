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




add.get('/user', function (req, res,next) {
    verify_token.verify(req.session.token,function(err, decoded) {

        if(!err) {
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

        if(!err) {
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

        if(!err){

            mysql.getSupporter(req.body.email,function(model){
                if(model ==  null){
                    console.log("no data");
                    console.log(req.body);
                    mysql.putSupporter(req.body,function(user){
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

        if(!err){

            mysql.getUser(req.body.username,function(model){
                if(model ==  null){
                    console.log("no data");
                    console.log(req.body);
                    mysql.putUser(req.body,function(user){
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