const express = require('express');
const db = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app=express();
const port =3000;
db();
app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use('/',require('./routes/index'));

app.listen(port,(error)=>{
    if(!error){
        console.log("Server is Successfully Running "+ port);
    console.log("http://localhost:"+port);
    }else{
        console.log(error.message);

    }
});