var mysql = require('mysql');
var knex = require('knex')({
    client:'mysql',
    connection : {
        host: 'localhost',
        user : 'root',
        password : 'Paritosh@123',
        database : 'todo'
    }
});
module.exports = knex ; 
