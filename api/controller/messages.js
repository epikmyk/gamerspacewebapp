const MessageModel = require('../model/messages');

const MessageController = {
    createMessage: function (req, res, next) {
        let message = req.body.message;
        let user_id = req.session.userID;
        let chat_id = req.body.chat_id; 

        return MessageModel.create(message, user_id, chat_id)
            .then(([results]) => {
                if (results && results.affectedRows) {
                    console.log("Message successful")
                    res.json({ status: "OK", message: "Message was created", "redirect": "/" })
                }
                else {
                    console.log("Post unsuccessful")
                    res.json({ status: "OK", message: "Message was not created", "redirect": "/" })
                }
            })
            .catch((err) => { next(err)})
    },
    getMessages: function (req, res, next) {
        let chat_id = req.params.chat_id;

        return MessageModel.retrieveMessages(chat_id)
        .then(([results]) => {
            res.json(results);
        })
        .catch((err) => { next(err) })
    }
}

module.exports = MessageController;