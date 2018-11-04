const express = require('express');
const hbs = require('hbs');
const fs= require('fs');
var app = express();
hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');


hbs.registerHelper('getcurrentYear',()=>{
    return new Date().getYear()
});


app.use((req,res,next)=>{
    var now = new Date().toString();
    var log=`${now},${req.method} ,${req.baseUrl}`;
    fs.appendFile('server.log',`${log}`+'\n',(err)=>{
        if(err){
            console.log('Unable to Connect');
        }
    });
    console.log(`${log}`+'\n');
    next();
})
// app.use((req,res,next)=>{
//     res.render('maintainance.hbs');
// });

app.use(express.static(__dirname+'/public'));
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})
app.get('/',(req,res) => {
    //res.send('<h1>root page</h1>');
    res.render('HOME.hbs',{
        pageTitle:'home page',
        welcomeMsg:'welcome to my page',
        
    });
 

});
app.get('/project',(req,res) => {
    //res.send('<h1>root page</h1>');
    res.render('project.hbs',{
        pageTitle:'Deploy ur projecthere',
        welcomeMsg:'deploy',
        
    });
 

});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About page',
      
    });
});
app.get('/bad',(req,res)=>{
    res.send({
        'error Message':'unable to handle error'
    });
});
app.listen((3000),()=>{
    console.log('App is running at port 3000')
});