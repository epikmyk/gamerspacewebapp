const { retrieveFriendStatus } = require('../model/friends');
var FriendsModel = require('../model/friends')

const FriendsController = {
    addFriend: function (req, res, next) {
        let friend_id = req.body.friend_id;
        let user_id = req.session.userID;
        return FriendsModel.create(0, user_id, friend_id)
            .then(([results]) => {
                if (results && results.affectedRows) {
                    res.json({ status: "OK", message: "Friend request was successful", "redirect": "/" })
                }
                else {
                    res.json({ status: "OK", message: "Friend request was unsuccessful", "redirect": "/" })
                }
            })
            .catch((err) => { next(err) })
    },
    getFriendStatus: function (req, res, next) {
        let user_id = req.params.user_id
        let friend_id = req.params.friend_id

        return FriendsModel.retrieveFriendStatus(user_id, friend_id)
            .then(([results]) => {
                if (results.length == 1) {
                    console.log(results[0])
                    res.json(results[0])
                }
                else {
                    res.json({ status: "No friend match found" })
                }
            })
            .catch((err) => { next(err) })
    }
}

module.exports = FriendsController;