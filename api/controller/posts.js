const PostModal = require('../model/posts');

const PostController = {
    createPost: function (req, res, next) {
        let post = req.body.post;
        let user_poster_id = req.session.userID;
        let user_receiver_id = user_poster_id; //change this later to receiver id, make a get userid api from users table

        return PostModal.create(post, user_poster_id, user_receiver_id)
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
    getRecentPostsToUserId: function (req, res, next) {
        let _id = req.session.userID;
        console.log(req.session.userID)
        return PostModal.retrieveRecentPostsToUserId(_id)
        .then(([results]) => {
            res.json({post: results});
        })
        .catch((err) => { next(err)})
    },
    getUserPostsAndFriendsPostsByUserId: function (req, res, next) {
        let _id = req.session.userID;
        console.log(req.session.userID)
        return PostModal.retrieveUserPostsAndFriendsPostsByUserId(_id)
        .then(([results]) => {
            if(results.length > 0) {
                res.json({post: results});
            }
            else {
                return PostModal.retrieveRecentPostsToUserId(_id)
            }
            
        })
        .then(([results])=> {
            res.json({post: results});
        })
        .catch((err) => { next(err)})
    }
}

module.exports = PostController