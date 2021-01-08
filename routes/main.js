const express = require('express');
const router = express.Router();
var knex = require('../databases/connection');

router.get('/',(req,res)=>{
    console.log('Hit')
    var details=[]
    knex('todo').select('*').then((rows)=>{
        for(var i=0;i<rows.length;i++){
            var task={
                's_no': rows[i].s_no,
                'task': rows[i].task,
                'desc' : rows[i].description};
            details.push(task);};
        if(req.session.flag==1){
            req.session.destroy();
            res.render('home',{"userlist":details,"message":"Task Added Successfully",flag:0});
        }else if(req.session.flag==2){
            req.session.destroy();
            res.render('home',{"userlist":details,"message":"All Task Cleared Successfully",flag:0});
        }else if(req.session.flag==3){
            req.session.destroy();
            res.render('home',{"userlist":details,"message":"Task Deleted Successfully",flag:0});
        }else if(req.session.flag==4){
            req.session.destroy();
            res.render('home',{"userlist":details,"message":"Task Updated",flag:0});
        }else if(req.session.flag==5){
            req.session.destroy();
            res.render('home',{"userlist":details,"message":"Please fill the box to update",flag:1});
        }
        else{
            res.render('home',{"userlist":details});
        }
        
    });

});


module.exports = router;