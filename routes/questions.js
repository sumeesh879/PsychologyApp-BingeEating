/* 
----------------------------------------------------------------	
Author: Pawan Araballi  
----------------------------------------------------------------
*/

var express = require('express');
console.log('questions.js');
var questions = express.Router();
var mysql = require('../models/mysql');
var verify_token = require('../models/verify');

questions.get('/', function (req, res,next) {
console.log('questions');


    verify_token.verify(req.query.token,function(err, decoded) {

        if(!err && decoded.tag == 'user') {
            mysql.Questions( function(model) {
                console.log(model);
                res.json({statusCode: 200, message : " Questions ", data: model});
            });
        }
        else{
            console.log(err);
            res.json({statusCode: 200, message : " invalid user ", data: null});
        }
    });


});

module.exports = questions;