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
                throw new Error("Username already exists.")
            }
        })
        .then((emailDoesNotExist) => {
            if(emailDoesNotExist) {
                return password;
            }
            else {
                throw new Error("Email already exists.")
            }
        })
        .then((hashedPassword) => {
            return UserModel.create(username, hashedPassword, email);
        })
        .then((userCreated) => {
            if(userCreated) {
                res.json({ status: "OK", message: "User registration successful", "redirect": '/login'});
            }
            else {
                throw new Error("User account could not be created")
            }
        })
        .catch((err) => {
            if(err instanceof Error) {
                res.json({status: "OK", message: err.message, "redirect": '/' });
            }
            else {
                next(err);
            }
        });
    },
    logIn: function (req, res, next) {
        let username = req.body.username;
        let password = req.body.password;

        UserModel.authenticate(username, password)
        .then((userData) => {
            console.log("login successful")
            if(username) {
                req.session.username = userData.user;
                req.session.userID = userData.uid;
                res.json({ status: "OK", message: "login successful", "redirect": "/" })
            }
            else {
                throw new Error("Username or password is incorrect", "/login", 200)
            }
        })
        .catch((err) => {
            console.log("not successful")
            if(err instanceof Error) {
                res.json({status: "OK", message: err.message, "redirect": '/' });
            }
            else {
                next(err);
            }
        })
    },
    logOut: function (req, res, next) {
        req.session.destroy((err) => {
            if (err) {
                console.log("Session could not be destroyed");
                next(err);
            }
            else {
                console.log("Session destroyed")
                res.clearCookie('cookieKey');
                res.redirect("/");
            }
        })
    },
    getLoggedInUsername: function (req, res, next) {
        if(req.session.username) {
            res.json({username: req.session.username});
        }
    }
}

module.exports = UserController;