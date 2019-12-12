const userModel = require('../model/user.model');
const _ = require('lodash');
const fs = require('fs');

module.exports.addOneUser = (req, res) => {
	const User = new userModel({
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
			email: user
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
		const pairedUsers = _.chunk(shuffledUsers, 2);

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
		if (userArr[0].email === req.body.email) {
			if (userArr.length === 1) {
				return res.status(200).send({
					error: false,
					message: 'Sorry you have no match in our system'
				});
			}

			return res.status.send({
				error: false,
				message: `Your secret santa is ${userArr[1].email}`
			});
		} else if (userArr[1].email === req.body.email) {
			return res.status(200).send({
				error: false,
				message: `Your secret santa is ${userArr[0].email}`
			});
		}
	});
};
