const userModel = require('../model/user.model');

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
        
        User.save()
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
            })
        }

        return res.status(200).send({
            error: false,
            message: usersFound.length ? 'users found' : 'No user available',
            data: usersFound
        })
    })
}
