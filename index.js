const express = require("express");
const path = require('path')
const bodyparser = require('body-parser');

const app = express();
const session = require('express-session');
const PORT = process.env.PORT || 3000;


app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(session({
    secret:'ABCDEFG',
    resave:false,
    saveUninitialized:true
}));


app.use(require('./routes/main'));
app.use(require('./routes/add_data'));
app.use(require('./routes/delete'));
app.use(require('./routes/search'));
app.use(require('./routes/edit_desc'));

app.listen(PORT,()=>{
    console.log('Running on',PORT);
});

