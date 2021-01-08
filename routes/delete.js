const express = require('express');
const knex = require('../databases/connection');
const router = express.Router();


router.get('/clear_all',(req,res)=>{
    knex('todo').truncate().then(()=>{
        req.session.flag=2;
        res.redirect('/');
    });
    
});

router.get('/delete_this/:id',(req,res)=>{
    let ID = req.params['id'];
    knex('todo').where({'s_no':ID}).del().then(()=>{
        knex('todo').select('*').then(async(rows)=>{
            for(var i=0;i<rows.length;i++){
                let taskname = rows[i].task;
                await knex('todo').where({'task':taskname}).update({'s_no':i+1}).then(()=>{ });
            };
            req.session.flag=3;
            res.redirect('/');   
        });
    });
});






module.exports = router;
