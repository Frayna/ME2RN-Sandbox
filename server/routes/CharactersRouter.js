
const express = require('express');
const app = express();
const CharactersRouter = express.Router();
const Update = require('../models/Update');

CharactersRouter.route('/').post(function (req, res) {
    console.log(Date(Date.now().toString()), req.body);
    res.json({response : "OK"});
});

CharactersRouter.route('/').get(function (req, res) {
	Update.find( (err, update) => {
		if(err){
			console.log(err);
		}
		else {
			res.json(update);
		}
	});
});


module.exports = CharactersRouter;