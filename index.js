var express = require('express');
var sessions = require('express-session');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json()); //sending data in json format using restEasy,fiddler or a postman
app.use(bodyParser.urlencoded({extended: false})); //for HTML or EJS

app.use(sessions({
    secret: 'sssshhhh',
    saveUninitialized: true,
    resave: false
}));

var sess;
app.get('/',function(req, res){
    res.sendFile(__dirname+'/views/index.html');
});

app.post('/login',function(req, res){
    //res.sendFile(__dirname+'/views/index.html');
    sess = req.session;
    if(req.body.username == 'user' && req.body.password == 'user'){
        sess.userDetail = req.body.username;
    }
    res.redirect('/redirects');
});

app.get('/redirects', function(req, res){
    sess = req.session;
    if(sess.userDetail){
        res.redirect('/admin');
    }
    else{
        res.write('<h1> Please enter your details</h1>');
        res.end('<a href='+'/'+'>Login</a>');
    }
});

app.get('/admin', function(req, res){
    sess = req.session;
    if(sess.userDetail){
        res.write('<h1> Hello '+ sess.userDetail +'</h1>');
        res.end('<a href='+'/logout'+'>Logout</a>');
    }
    else{
        res.write('<h1> Please Login First</h1>');
        res.end('<a href='+'/'+'>Login</a>');
    }
});

app.get('/logout', function(req, res){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/');
        }
    })
})

app.listen(3000, function(){
    console.log('The server is running at port 3000!!');
});