const express = require('express');
const router = express.Router();
const knex = require('../databases/connection');

router.post('/search_item',(req,res)=>{
    console.log('hii')
    let search_val = req.body.search_val.toLowerCase();
    var details=[]
    knex('todo').select('*').then((rows)=>{
        for(var i=0;i<rows.length;i++){
            let task_fetch = String(rows[i].task).toLowerCase();
            if(task_fetch.includes(search_val)){
                var task={
                    's_no': rows[i].s_no,
                    'task': rows[i].task,
                    'desc' : rows[i].description};
                details.push(task);};
            };
        if(details.length>0){
            res.render('home',{"userlist":details,message:'Searched Results Below :-)',flag:0});
        }else{
            res.render('home',{"userlist":details,message:"Didn't get Any Task :-(",flag:1});  
        }
        
    });

})


module.exports = router;