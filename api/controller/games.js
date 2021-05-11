const GameModal = require('../model/games');

const GameController = {

    createGame: function (req, res, next) {
        let slug = req.body.slug;
        let name = req.body.name;
        let image = req.body.image; 

        return GameModal.create(slug, name, image)
            .then(([results]) => {
                if (results && results.affectedRows) {
                    console.log("Game added")
                    res.json({ status: "OK", message: "Game added successfully", "redirect": "/" })
                }
                else {
                    console.log("Game not added")
                    res.json({ status: "OK", message: "Game added unsuccessful", "redirect": "/" })
                }
            })
            .catch((err) => { next(err)})
    },
    createUserGame: function (req, res, next) {
        let game_id = req.body.game_id;
        let user_id = req.body.user_id; 

        return GameModal.create(game_id, user_id)
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
            .catch((err) => { next(err)})
    },
    
    getGame: function (req, res, next) {
        let game = req.params.game;

        return GameModal.retrieveGameByName(game)
        .then(([results]) => {
            res.json(results);
        })
        .catch((err) => { next(err)})
    }
}

module.exports = GameController