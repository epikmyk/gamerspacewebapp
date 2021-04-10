var UserModel = require('../model/users');

const UserController = {
    createUser: function (req, res, next) {
        let email = req.body.email;
        let username = req.body.username;
        let password = req.body.password;

        UserModel.usernameExists(username)
        .then((usernameDoesNotExist) => {
            if(usernameDoesNotExist) {
                return UserModel.emailExists(email);
            }
            else {
                throw new Error('Username already exists.')
            }
        })
        .then((emailDoesNotExist) => {
            if(emailDoesNotExist) {
                return password;
            }
            else {
                throw new Error('Email already exists.')
            }
        })
        .then((hashedPassword) => {
            return UserModel.create(username, hashedPassword, email);
        })
        .then((userCreated) => {
            if(userCreated) {
                res.json({ status: "OK", message: "User registration successful", "redirect": '/'});
            }
            else {
                throw new Error('User account could not be created')
            }
        })
        .catch((error) => {
            if(error instanceof Error) {
                res.json({status: "OK", message: error.message, "redirect": '/' });
            }
            next(err);
        });
    }
}

module.exports = UserController;