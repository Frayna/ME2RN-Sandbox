
const express = require('express');
const app = express();
const UpdateRouter = express.Router();
const Update = require('../models/Update');

UpdateRouter.route('/').post(function (req, res) {
	const update = new Update(req.body);
	console.log("adding");
	update.save()
		.then(product => {
			res.json('update added successfully');
			console.log("update added");
		})
		.catch(err => {
			res.status(400).send(err);
		});
});

UpdateRouter.route('/').get(function (req, res) {
	Update.find( (err, update) => {
		if(err){
			console.log(err);
		}
		else {
			res.json(update);
		}
	});
});


module.exports = UpdateRouter;