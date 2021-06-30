const ChatModel = require('../model/chat');

const ChatController = {
    createChat: function (req, res, next) {
        let user1_id = req.body.user1_id;
        let user2_id = req.body.user2_id;

        ChatModel.retrieveChatId(user1_id, user2_id)
            .then(([results]) => {
                if (results && results.length == 0) {
                    return ChatModel.create(user1_id, user2_id)
                }
                else {
                    throw new Error("Chat exists")
                }
            })
            .then((chatCreated) => {
                if (chatCreated) {
                    return ChatModel.retrieveChatId(user1_id, user2_id)
                }
                else {
                    throw new Error("Chat exists")
                }
            })
            .then(([results]) => {
                if (results) {
                    res.json(results[0]);
                }
                else {
                    throw new Error("Chat exists")
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
    getChat: function (req, res, next) {

        let user1_id = req.params.user1_id;
        let user2_id = req.params.user2_id;

        return ChatModel.retrieveChatId(user1_id, user2_id)
        .then(([results]) => {
            res.json(results[0]);
        })
        .catch((err) => { next(err)});
    },
    getChats: function (req, res, next) {

        let user_id = req.session.userID;

        return ChatModel.retrieveChats(user_id)
        .then(([results]) => {
            res.json(results);
        })
        .catch((err) => { next(err)});
    },
    getUserFromChat: function (req, res, next) {

        let post_id = req.params.post_id;
        let user_id = req.session.userID;

        console.log("userID: " + user_id)

        return ChatModel.retrieveUserFromChat(post_id, user_id)
        .then(([results]) => {
            res.json(results[0]);
        })
        .catch((err) => { next(err)});
    },


}

module.exports = ChatController;