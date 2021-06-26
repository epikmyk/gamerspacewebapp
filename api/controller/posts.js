const PostModal = require('../model/posts');

const PostController = {
    createPost: function (req, res, next) {
        let post = req.body.post;
        let image = req.body.image;
        let user_poster_id = req.session.userID;
        let user_receiver_id = req.body.user_receiver_id; 

        return PostModal.create(post, image, user_poster_id, user_receiver_id)
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
    getRecentPostsToUser: function (req, res, next) {
       let _id = req.session.userID;
       let username = req.params.username;
        console.log(req.session.userID)
        return PostModal.retrieveRecentPostsToUser(username, _id)
        .then(([results]) => {
            res.json(results);
        })
        .catch((err) => { next(err)})
    },
    getUserPostsAndFriendsPostsByUserId: function (req, res, next) {
        let _id = req.session.userID;
        let username = req.session.username
        console.log(req.session.userID)
        return PostModal.retrieveUserPostsAndFriendsPostsByUserId(_id)
        .then(([results]) => {
            if(results.length > 0) {
                res.json(results);
            }
            else {
                return PostModal.retrieveRecentPostsToUser(username, _id)
                .then(([results]) => {
                    if(results) {
                        res.json(results);
                    }
                    else {
                        throw Error("could not get posts")
                    }
                })
                .catch((err) => { 
                    if(err instanceof Error) {
                        res.json({ status: "OK", message: err.message, "redirect": '/' });
                    }
                    else {
                        res.json({ status: "OK", message: "err", "redirect": '/' });
                    }
                })
            }
        })
        .catch((err) => { 
            if(err instanceof Error) {
                res.json({ status: "OK", message: err.message, "redirect": '/' });
            }
            else {
                res.json({ status: "OK", message: "err", "redirect": '/' });
            }
        })
    },
    getPostById: function (req, res, next) {

        let post_id = req.params.id;
        let user_id = req.session.userID;

        return PostModal.retrievePostById(user_id, post_id)
        .then(([results]) => {
            res.json(results[0]);
        })
        .catch((err) => { next(err)});
    }
}

module.exports = PostController