// server.js

const express = require('express');
var fs = require('fs');
var http = require('http');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 4200;
const cors = require('cors');
const csv = require('csv-parser')
const config = require('./database/DB');
//const ProductRouter = require('./routes/ProductRouter');
const CharactersRouter = require('./routes/CharactersRouter')
const Update = require('./models/Update');

mongoose.set('useUnifiedTopology', true);

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
	() => {console.log('Database is connected') },
	err => { console.log('Can not connect to the database' +err)
	});

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/characters', CharactersRouter);
//app.use('/product', ProductRouter);

var httpServer = http.createServer(app);


httpServer.listen(PORT, function(){
    console.log('Server HTTP is running on Port: ',PORT);
});