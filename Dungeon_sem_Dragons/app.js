const express = require('express');
var cookieParser = require('cookie-parser');
const path = require('path');
const { createEngine } = require('express-react-views');
var app = express();
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const Usuario = require('./src/gamefiles/Usuario'); // pedindo requisição da classe usuario

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

    /*const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: 'localhost',
        user : 'root',
        password: '',
        database: 'DsemD'
    });

    
    connection.connect((err) => {
        if (err) throw err;
        console.log('Connected!');
      });*/


//para pegar as informações do corpo da aplicação (pegar os dados do form)

/*var mysql = require('mysql'); // começo da comunicação com o banco de dados
var connetion = mysql.createConnection({ // criando a comunicação com o
    host: 'localhost',                   // banco
    user: 'root',
    password: '123456' 
});*/

let usuarios = [];
app.use(express.static(path.join(__dirname, './public')));
var http = require('http');

app.get('/api/paginaInicial', (req, res) =>{
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log("Eviou os itens");
});

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

/*connetion.connect(function(err){
    if(err) return console.log(err);
    console.log('conectou!');
  });*/

/*app.get('/', function(req, res) {
    res.sendFile(`${__dirname}/public/paginas-html/index.html`);
}).get('/cadastro', (req, res) =>{
    res.sendFile(`${__dirname}/public/paginas-html/cadastro.html`);
}).get('/login', (req, res)=>{
    res.sendFile(`${__dirname}/public/paginas-html/login.html`);
}).post('/login', (req, res)=>{
   
    let reqBody = req.body;
    let senha = reqBody.senha;
    let email = reqBody.email;
    let novoUser = {email, senha};
    var isNotCadastrado = true;
    usuarios.forEach(usuario =>{
        if(usuario.email === email){
            isNotCadastrado = false;
        }
    });

    if(isNotCadastrado){
        usuarios.push(novoUser);
        console.log(usuarios);
        res.sendFile(`${__dirname}/public/paginas-html/login.html`);
    }else{
        res.redirect('/cadastro?errCad=true');
    }
    
}).get('/game-page', (req,res) =>{
    res.render('gamePage');
}).post('/game-page', (req, res)=>{
    let email = req.body.email;
    let senha = req.body.senha;
    var isValidUser = false;

    usuarios.forEach(usuario=>{
        if(usuario.email === email && usuario.senha === senha){
            isValidUser = true;
            return 0;
        }
    });
    if(isValidUser){
        var cookie = req.cookies.email;
        if (cookie === undefined){
            res.cookie("email",email, { 
                expires: new Date(Date.now()+10000),
                path: '/' });
            console.log('cookie criado');

        }
        else{
            console.log('cookie existente');
        }
        res.render('gamePage');
    }else{
        res.redirect('/login?errLogin=true');
    }
});

/*var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});*/
const port = process.env.PORT || 8080;
app.listen(port);
console.log("App now running on port", port);

/*var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });*/


  //connection.end();