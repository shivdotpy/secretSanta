const userModel = require('../model/user.model');
const _ = require('lodash');
const fs = require('fs');

module.exports.addOneUser = (req, res) => {
	const User = new userModel({
		name: req.body.name,
		email: req.body.email
	});

	User.save((err, userSaved) => {
		if (err) {
			return res.status(500).send({
				error: true,
				message: 'Error while saving a user email'
			});
		}

		return res.status(200).send({
			error: false,
			message: 'User saved successfully'
		});
	});
};

module.exports.addmanyUser = (req, res) => {
	const usersArray = req.body.users;

	usersArray.forEach((user) => {
		const User = new userModel({
			name: user.name,
			email: user.email
		});

		User.save();
	});

	return res.send({
		error: false,
		message: 'Error while saving users'
	});
};

module.exports.getAllUsers = (req, res) => {
	userModel.find({}, (err, usersFound) => {
		if (err) {
			return res.status(500).send({
				error: true,
				message: 'Something went wrong while getting users',
				data: err
			});
		}

		return res.status(200).send({
			error: false,
			message: usersFound.length ? 'users found' : 'No user available',
			data: usersFound
		});
	});
};

module.exports.execute = (req, res) => {
	userModel.find({}, (err, usersFound) => {
		const shuffledUsers = _.shuffle(usersFound);
		let pairedUsers = [];

		for (let i = 0; i < shuffledUsers.length; i++) {
			let user = {};
			if (i === shuffledUsers.length - 1) {
				user = {
					name: shuffledUsers[i].email,
					email: shuffledUsers[i].email,
					santaName: shuffledUsers[0].name,
					santaEmail: shuffledUsers[0].email
				};
			} else {
				user = {
					name: shuffledUsers[i].name,
					email: shuffledUsers[i].email,
					santaName: shuffledUsers[i + 1].name,
					santaEmail: shuffledUsers[i + 1].email
				};
			}
			pairedUsers.push(user);
		}

		fs.writeFileSync('matching.json', JSON.stringify({ users: pairedUsers }));

		res.send({
			error: false,
			message: 'Operation executed successfully'
		});
	});
};

module.exports.getMySecretSanta = (req, res) => {
	const users = JSON.parse(fs.readFileSync('matching.json')).users;

	users.forEach((userArr) => {
		if (userArr.email === req.body.email) {
			return res.status(200).send({
				error: false,
				message: `Your secret santa is ${userArr.santaName}`,
				santaName: userArr.santaName,
				santaEmail: userArr.santaEmail
			})
		}
	});
};
