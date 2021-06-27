const CommentModal = require('../model/comments');

const CommentController = {
    createComment: function (req, res, next) {
        let comment = req.body.comment;
        let image = req.body.image;
        let user_id = req.session.userID;
        let post_id = req.body.post_id; 

        return CommentModal.create(comment, image, user_id, post_id)
            .then(([results]) => {
                if (results && results.affectedRows) {
                    console.log("Comment successful")
                    res.json({ status: "OK", message: "Comment was created", "redirect": "/" })
                }
                else {
                    console.log("Post unsuccessful")
                    res.json({ status: "OK", message: "Comment was not created", "redirect": "/" })
                }
            })
            .catch((err) => { next(err)})
    },
    getComments: function (req, res, next) {
        let post_id = req.params.post_id;

        console.log(post_id)

        return CommentModal.retrieveComments(post_id)
        .then(([results]) => {
            res.json(results);
        })
        .catch((err) => { next(err) })
    }
}

module.exports = CommentController;