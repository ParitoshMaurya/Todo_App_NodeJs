const express = require('express');
const router = express.Router();
const knex = require('../databases/connection');



router.get('/edit/:id',(req,res)=>{
    knex('todo').select('*').where({'s_no':req.params['id']}).then((rows)=>{
        let details=[{'s_no':rows[0].s_no,'task':rows[0].task,'desc':rows[0].description}];
        res.render('home',{"userlist":details,"edit":true});
    });
});

router.post('/editdata/:id',(req,res)=>{
    let ID = req.params['id'];
    let newDesc = req.body.edit_data;
    if(newDesc!=''){
        knex('todo').where({'s_no':ID}).update({'description':newDesc}).then(()=>{
            req.session.flag=4;
            res.redirect('/');
        });
    }else{
        req.session.flag=5
        res.redirect('/');
    };
    
});

module.exports = router;