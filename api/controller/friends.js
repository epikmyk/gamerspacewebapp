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
    getFriendStatus: function (req, res, next) {
        let username = req.params.username
        let friendUsername = req.params.friendUsername
        let friends = [{username: username, user_id: ""}, {username: friendUsername, user_id: ""}]
        console.log("friends" + friends[1].username)
        
        return UserModel.retrieveUserByUsername(username)
        .then(([results]) => {
            if(results.length == 1) {
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
            if(results.length == 1) {
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
            if(err instanceof Error) {
                res.json({ status: "OK", message: err.message, "redirect": '/' });
            }
            else {
                next(err) 
            }
        })
    }
}

module.exports = FriendsController;