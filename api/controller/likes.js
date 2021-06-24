const { changeLike } = require('../model/likes');
const LikeModal = require('../model/likes');

const LikeController = {

    likePost: function (req, res, next) {
        let like_post = req.body.like_post;
        let user_id = req.body.user_id;
        let post_id = req.body.post_id;

        LikeModal.retrieveLike(user_id, post_id)
        .then(([results]) => {
            if(results.length == 1) {
                if(results[0].like_post == 0) {
                    return LikeModal.changeLike(1, user_id, post_id);
                }
                else {
                    return LikeModal.changeLike(0, user_id, post_id);
                }
            }
            else {
                return LikeModal.create(1, user_id, post_id);
            }
        })
        .then(([results]) => {
            if (results && results.affectedRows) {
                console.log("Like successful");
                res.json({ status: "OK", message: "Like was updated", "redirect": "/" })
            }
            else {
                console.log("Like unsuccessful");
                res.json({ status: "OK", message: "Like was not updated", "redirect": "/" })
            }
        })
        .catch((err) => {next(err)});
    },
    getLike: function (req, res, next) {
        let user_id = req.session.userID;
        let post_id = req.params.post_id;
        LikeModal.retrieveLike(user_id, post_id)
        .then(([likes]) => {
            if (likes.length == 1) {
                res.json(likes[0])
            }
            else {
                res.json({message: "No likes found"});
            }
            
        })
    },
}

module.exports = LikeController;