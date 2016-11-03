/*
 ----------------------------------------------------------------
 Author: Pawan Araballi
 ----------------------------------------------------------------
 */

var express = require('express');
console.log('questions.js');
var add = express.Router();
var mysql = require('../models/mysql');

add.get('/user', function (req, res,next) {

    mysql.Questions( function(model) {
        console.log(model);
        res.json({statusCode: 200, message : " Questions ", data: model});
    });
});


add.get('/supporter', function (req, res,next) {

    mysql.Questions( function(model) {
        console.log(model);
        res.json({statusCode: 200, message : " Questions ", data: model});
    });
});



module.exports = add;