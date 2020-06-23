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
const Update = require('./models/Update');

// récupere la date du fichier
const getFileUpdatedDate = (path) => {
  const stats = fs.statSync(path)
  return stats.mtime
}
const file = "C:\\Users\\gourr\\AppData\\Roaming\\Factorio\\script-output\\BlackMarket2-prices.csv";
const results = [];

//const update = new Update(req.body);

setInterval(() => {
	console.log("TEST")
	Update.find({time : getFileUpdatedDate(file)}, (err, docs) => { 
		if(docs.length)
			console.log("RESULT", docs)
		else {
			// TODO const update = new Update({time : getFileUpdatedDate(file), })
		}

	})
}, 5 * 1000);



//console.log(getFileUpdatedDate(file))
fs.createReadStream(file)
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => results.push(data))
  .on('end', () => {
//    console.log(results);
  });

mongoose.connect(config.DB).then(
	() => {console.log('Database is connected') },
	err => { console.log('Can not connect to the database' +err)
	});

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//app.use('/product', ProductRouter);

var httpServer = http.createServer(app);


httpServer.listen(PORT, function(){
    console.log('Server HTTP is running on Port: ',PORT);
});