const express = require('express');
const router = express.Router();
const knex = require('../databases/connection');

router.post('/add_data',(req,res)=>{
    knex.select('*').from('todo').then((rows)=>{
        let ID = rows.length + 1;
        let task = req.body.task;
        let description=req.body.description;
        if(task!='' && description!=''){
            knex('todo').insert({'s_no':ID,'task':task,'description':description}).then(()=>{
                req.session.flag=1;
                res.redirect('/')
                console.log('done')
            });
        };   
    });
})

module.exports=router;
