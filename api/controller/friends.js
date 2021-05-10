const { retrieveFriendStatus } = require('../model/friends');
var FriendsModel = require('../model/friends');
const UserModel = require('../model/users');

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
    deleteFriend: function (req, res, next) {
        let user_id = req.params.user_id;
        let friend_id = req.params.friend_id;

        return FriendsModel.deleteFriend(user_id, friend_id)
            .then(([results]) => {
                if (results && results.affectedRows) {
                    res.json({ status: "OK", message: "Friend deletion was successful", "redirect": "/" })
                }
                else {
                    res.json({ status: "OK", message: "Friend deletion was unsuccessful", "redirect": "/" })
                }
            })
            .catch((err) => { next(err) })
    },
    acceptFriendRequest: function (req, res, next) {
        let user_id = req.body.user_id;
        let friend_id = req.body.friend_id;

        return FriendsModel.updateStatus(1, friend_id, user_id)
        .then(([results]) => {
            if(results && results.affectedRows) {
                return FriendsModel.create(1, user_id, friend_id)
            }
            else {
                throw Error("Could not update friend request")
            }
        })
        .then(([results]) => {
            if (results && results.affectedRows) {
                res.json({ status: "OK", message: "Friend request was successful", "redirect": "/" })
            }
            else {
                throw Error("Could not accept friend request")
            }
        })
        .catch((err) => {
            if (err instanceof Error) {
                res.json({ status: "OK", message: err.message, "redirect": '/' });
            }
            else {
                next(err);
            }
        });
    },
    getFriendStatus: function (req, res, next) {
        let username = req.params.username
        let friendUsername = req.params.friendUsername
        let friends = [{ username: username, user_id: "" }, { username: friendUsername, user_id: "" }]
        console.log("friends" + friends[1].username)

        return UserModel.retrieveUserByUsername(username)
            .then(([results]) => {
                if (results.length == 1) {
                    friends[0].user_id = results[0].user_id
                    return friends;
                }
                else {
                    throw Error("No friend match found")
                }
            })
            .then((friend) => {
                return UserModel.retrieveUserByUsername(friend[1].username)
            })
            .then(([results]) => {
                if (results.length == 1) {
                    friends[1].user_id = results[0].user_id;
                    return friends;
                }
                else {
                    throw Error("No friend match found")
                }
            })
            .then((friends) => {
                return FriendsModel.retrieveFriendStatus(friends[0].user_id, friends[1].user_id)
            })
            .then(([results]) => {
                if (results.length == 1) {
                    console.log(results[0])
                    res.json(results[0])
                }
                else {
                    res.json({ status: "No friend match found" })
                }
            })
            .catch((err) => {
                if (err instanceof Error) {
                    res.json({ status: 2, message: err.message, "redirect": '/' });
                }
                else {
                    next(err)
                }
            })
    },
    getFriendRequests: function (req, res, next) {
        let user_id = req.session.userID

        return FriendsModel.retrieveFriendRequests(user_id)
            .then(([results]) => {
                res.json(results)
            })
            .catch((err) => { next(err) })

    }
}

module.exports = FriendsController;