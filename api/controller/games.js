const GameModal = require('../model/games');

const GameController = {

    createGame: function (req, res, next) {

        console.log("made it to create")
        let slug = req.body.slug;
        let name = req.body.name;
        let image = req.body.image;
        let user_id = req.session.userID;
        let game_id = 0;

        return GameModal.retrieveGameByName(name)
            .then(([results]) => {
                if (results.length == 0) {
                    //game_id = results[0].game_id
                    console.log(results[0])
                    return GameModal.create(slug, name, image)
                        .then(([results]) => {
                            if (results && results.affectedRows) {
                                return GameModal.retrieveLatestInsertion()
                                    .then(([results]) => {
                                        return GameModal.createUserGame(results[0].game_id, user_id)
                                            .then(([results]) => {
                                                if (results && results.affectedRows) {
                                                    console.log("Game added to user games")
                                                    res.json({ status: "OK", message: "Game added successfully", "redirect": "/" })
                                                }
                                                else {
                                                    console.log("Game not added to user games")
                                                    res.json({ status: "OK", message: "Game added unsuccessful", "redirect": "/" })
                                                }
                                            })
                                            .catch((err) => { next(err) })
                                    })
                                    .catch((err) => { next(err) })
                            }
                            else {
                                return Error("game could not be added")
                            }
                        })
                        .catch((err) => { next(err) })
                }
                else {
                    console.log(results[0])
                    return GameModal.createUserGame(results[0].game_id, user_id)
                        .then(([results]) => {
                            if (results && results.affectedRows) {
                                console.log("Game added to user games")
                                res.json({ status: "OK", message: "Game added successfully", "redirect": "/" })
                            }
                            else {
                                console.log("Game not added to user games")
                                res.json({ status: "OK", message: "Game added unsuccessful", "redirect": "/" })
                            }
                        })
                        .catch((err) => { next(err) })
                }
            })
            .catch((err) => { next(err) })

    },
    createUserGame: function (req, res, next) {
        let game_id = req.body.game_id;
        let user_id = req.body.user_id;

        return GameModal.createUserGame(game_id, user_id)
            .then(([results]) => {
                if (results && results.affectedRows) {
                    console.log("Game added to user games")
                    res.json({ status: "OK", message: "Game added successfully", "redirect": "/" })
                }
                else {
                    console.log("Game not added to user games")
                    res.json({ status: "OK", message: "Game added unsuccessful", "redirect": "/" })
                }
            })
            .catch((err) => { next(err) })
    },

    getGame: function (req, res, next) {
        let game = req.params.game;

        return GameModal.retrieveGameByName(game)
            .then(([results]) => {
                res.json(results);
            })
            .catch((err) => { next(err) })
    },

    getFavoriteGames: function (req, res, next) {
        let user_id = req.params.user_id;

        return GameModal.retrieveGamesByUserId(user_id)
            .then(([results]) => {
                res.json(results);
            })
            .catch((err) => { next(err) })
    }
}

module.exports = GameController