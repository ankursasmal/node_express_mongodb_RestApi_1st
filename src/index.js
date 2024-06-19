require('dotenv').config();
 let fs=require('fs');
let path=require('path');
 // for all route
let route=require('./route/Allrouts')
let express=require('express');
let app=express();
const PORT=process.env.PORT || 3000;
// db import
require('./bd/connect');
 // for read json
app.use(express.json());
// for recognize html elemet
app.use(express.urlencoded({extended:false}))
 

// it is importent to add public folder else css,scrit not work
let staticPath=path.join(__dirname,'../public');
app.use(express.static(staticPath));

// for set view engine
app.set('view engine','ejs');

//  for all rout

app.use(route);

app.listen(PORT,'127.0.0.1',()=>{
    console.log('connection Success');
})