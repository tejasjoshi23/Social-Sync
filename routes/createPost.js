const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const POST = mongoose.model("POST")

// Route
router.get("/allposts", requireLogin,
 (req, res)=>{
    POST.find()
        .populate("postedBy", "_id name Photo")
        .populate("comments.postedBy", "_id name") 
        .sort("-createdAt")
        .then(post => res.json(post))
        .catch(err => console.log(err))
})

router.post("/createPost", requireLogin, (req, res)=>{
    const {body, pic} = req.body;
    if(!body || !pic){
        return res.status(422).json({error: " Please add title and body "})
    }
    req.user
    const post = new POST ({
        body,
        photo : pic,
        postedBy: req.user
    })
    post.save()
    
    .then((result)=>{
        return res.json({post:result})
    })
    .catch(err => console.log(err))
    // res.json("OKKii")
})

router.get("/myposts", requireLogin, (req, res)=>{
    POST.find({postedBy: req.user._id})
    .populate('postedBy', "_id name  ")
    .populate("comments.postedBy", "_id name") 
    .sort("-createdAt")
    .then(myposts =>{
        res.json(myposts)
    })
})

router.put("/like", requireLogin, (req, res)=>{
    POST.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    }, 
    {
        new:true
    }).populate("postedBy","_id name Photo")
    .then((result)=>{
            res.json(result)
    })
    .catch(err => {
        return res.status(422).json({ error: err });
    });
})

router.put("/unlike", requireLogin, (req, res)=>{
    POST.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    }, {
        new:true
    }).populate("postedBy","_id name Photo")
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        return res.status(422).json({ error: err });
    });
})

router.put("/comment" ,requireLogin , (req, res)=>{
    const comment = {
        comment : req.body.text,
        postedBy : req.user._id 
    };
    POST.findByIdAndUpdate(req.body.postId, {
        $push : {comments : comment}
    }, 
        {
            new : true
        })      
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name Photo")
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            return res.status(422).json({ error: err });
        }); 
})

//to show following post
router.get("/myfollowingpost", requireLogin, (req, res) => {
    POST.find({ postedBy: { $in: req.user.following } })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .then(post => {
            res.json(post)
        })
        .catch(err => { console.log(err) })
})

/*// API to delete Post
router.delete("/deletePost/:postId", requireLogin , (req, res)=>{
    POST.findOne({id:req.params.postId})
    .populate("postedBy", "_id")
    .then(post => {
        if (!post) {
            return res.status(422).json({ error: 'Post not found' });
        }

        if (post.postedBy._id.toString() === req.user._id.toString()) {
            return post.remove()
                .then(result => {
                    return res.json({ message: 'Successfully deleted' });
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).json({ error: 'Failed to delete post' });
                });
        } else {
            return res.status(403).json({ error: 'Unauthorized to delete this post' });
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ error: 'Failed to retrieve post' });
    });
});
*/
/*
// Api to delete post
router.delete("/deletePost/:postId", requireLogin, (req, res) => {
    POST.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: err })
            }

            if (post.postedBy._id.toString() == req.user._id.toString()) {

                post.remove()
                    .then(result => {
                        return res.json({ message: "Successfully deleted" })
                    }).catch((err) => {
                        console.log(err)
                    })
            }
        })
})
*/
module.exports = router