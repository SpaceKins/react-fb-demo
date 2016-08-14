const fs=require('fs');
const path= require('path');
const express=require('express');
const bodyParser=require('body-parser');

const app=express();

app.set('port',(process.env.PORT || 3000));

const COMMENTS_FILE=path.join(__dirname,'comments.json');

app.use('/',express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Cache-Control','no-cache');
  next();
})

app.get('/api/comments',function(req,res){
    fs.readFile(COMMENTS_FILE,function(err,data){
      if(err){
        console.log(err);
        process.exit(1);
      }

      res.json(JSON.parse(data));
    })
});

app.listen(app.get('port'),function(){
  console.log(`Server listening on port ${app.get('port')}`);   // JS Template literal
})