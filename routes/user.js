const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const POST = mongoose.model("POST");
const USER = mongoose.model("USER");
const requireLogin = require("../middlewares/requireLogin");

// to get user profile
router.get("/user/:id", (req, res) => {
    Promise.all([
     USER.findOne({ _id: req.params.id }).select("-password"),
     POST.find({ postedBy: req.params.id }).populate("postedBy", "_id")
     ])
     .then(([user,post]) => {
         if (!user) {
             return res.status(404).json({ error: "User not found" });
         }
         res.status(200).json({ user, post });
     })
         .catch(err => {
 return res.status(500).json({ error: "Internal Server Error" });     
    });
 });

// //to follow user
// router.put("/follow", requireLogin, (req, res) => {
//     USER.findByIdAndUpdate(req.body.followId, {
//         $push: { followers: req.user._id }
//     }, {
//         new: true
//     }, (err, result) => {
//         if (err) {
//             return res.status(422).json({ error: err })
//         }
//         USER.findByIdAndUpdate(req.user._id, {
//             $push: { following: req.body.followId }
//         }, {
//             new: true
//         }).then(result => {
//             res.json(result)

//         })
//             .catch(err => { return res.status(422).json({ error: err }) })
//     }
//     )
// })

// //to unfollow user
// router.put("/unfollow", requireLogin, (req, res) => {
//     USER.findByIdAndUpdate(req.body.followId, {
//         $pull: { followers: req.user._id }
//     }, {
//         new: true
//     }, (err, result) => {
//         if (err) {
//             return res.status(422).json({ error: err })
//         }
//         USER.findByIdAndUpdate(req.user._id, {
//             $pull: { following: req.body.followId }
//         }, {
//             new: true
//         })
//         .then(result => {
//             res.json(result)
//         })
//         .catch(err => { 
//             return res.status(422).json({ error: err }) })
//     }
//     )
// })

// to follow user
router.put("/follow", requireLogin, async (req, res) => {
    try {
        const updatedUser = await USER.findByIdAndUpdate(
            req.body.followId,
            { $push: { followers: req.user._id } },
            { new: true }
        );

        const result = await USER.findByIdAndUpdate(
            req.user._id,
            { $push: { following: req.body.followId } },
            { new: true }
        );

        res.json(result);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
});

// to unfollow user
router.put("/unfollow", requireLogin, async (req, res) => {
    try {
        const updatedUser = await USER.findByIdAndUpdate(
            req.body.followId,
            { $pull: { followers: req.user._id } },
            { new: true }
        );

        const result = await USER.findByIdAndUpdate(
            req.user._id,
            { $pull: { following: req.body.followId } },
            { new: true }
        );

        res.json(result);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
});

// to upload profile pic
router.put("/uploadProfilePic", requireLogin, (req, res) => {
    USER.findByIdAndUpdate(req.user._id, {
        $set: { Photo: req.body.pic }
    }, {
        new: true
    }
    )
    .then(result=>{
        res.json(result);
    }
    )
    .catch(err=>{
        return res.status(422).json({ error: err })
    })
})




module.exports = router;