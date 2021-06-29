const GameModal = require('../model/games');

const GameController = {

    createGame: function (req, res, next) {

        console.log("made it to create")
        let slug = req.body.slug;
        let name = req.body.name;
        let image = req.body.image;
        let user_id = req.session.userID;

        return GameModal.create(slug, name, image, user_id)
            .then(([results]) => {
                if (results && results.affectedRows) {
                    console.log("Post successful")
                    res.json({ status: "OK", message: "Post was created", "redirect": "/" })
                }
                else {
                    console.log("Post unsuccessful")
                    res.json({ status: "OK", message: "Post was not created", "redirect": "/" })
                }
            })
            .catch((err) => { next(err)})

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
        let username = req.params.username;

        return GameModal.retrieveGamesByUserId(username)
            .then(([results]) => {
                res.json(results);
            })
            .catch((err) => { next(err) })
    },
    getMutualFavoriteGames: function (req, res, next) {
        let user_id = req.params.user_id;
        let profile_user_id = req.params.profile_user_id;

        return GameModal.retrieveMutualFavoriteGames(user_id, profile_user_id)
        .then(([results]) => {
            res.json(results);
        })
        .catch((err) => { next(err) })
    }
 }

module.exports = GameController