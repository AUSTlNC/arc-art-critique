const express = require('express');
const Mongoose = require('mongoose');
const router = express.Router()
const Post = require('./../models/Post')
const Comment = require('./../models/Comment')
router.get('/')

// badwords filter used: https://www.npmjs.com/package/bad-words
var Filter = require('bad-words'),
    swearfilter = new Filter();

// spamfilter used : https://www.npmjs.com/package/spam-filter
const spamfilter = require('spam-filter')('naiveBayes')

router.post('/', async (req, res) => {
    const { userId, postId, comment} = req.body
    if(swearfilter.isProfane(comment)) {
        return res.json({status: 'error', error: 'Profanity detected. Consider changing your wording.'})
    }
    if(spamfilter.isSpam(comment)){
        return res.json({status: 'error', error: 'Spam detected. Consider changing your wording.'})
    }

    if(comment.length < 10){
        return res.json({status: 'error', error: 'Response too short. Must be more than 10 characters.'})
    }

    try {
        const response = await Comment.create({userId, postId, comment})
        console.log('Comment created successfully: ')
    } catch(error) {
        console.log(JSON.stringify(error))
        throw error
    }
    console.log(comment)
    return res.json({status: 'ok'})
})

router.post('/all', async(req, res) => {
    const {post_id} = req.body
    var tempID = Mongoose.Types.ObjectId(post_id);    
    Comment.find({postId: tempID}, (err, finded)=>{return res.json(finded)})
    
})

//user comment search for commented
router.get('/myComments', async (req, res) => {
        console.log('request:', req.query.userId);
        if (req.query.userId !== undefined) {
            var response = {};

            Comment.find({userId : req.query.userId}, function (err, data) {
                if (err) {
                    response = { "error": true, "user comment search": "Error fetching data" };
                } else {
                    response = { "error": false, "user comment search": data };
                        var postIds=data.map(d=>d.postId);
                        var postResponse={};
                        Post.find({_id: {$in: postIds}}, function (nerr, ndata) {
                            if (nerr) {
                                postResponse = { "error": true, "user commented posts": "Error fetching data" };
                            } else {
                                postResponse = { "error": false, "user commented posts": ndata };
                            }
                            res.json(postResponse);
                        })
                }
            });
        }
} )



module.exports = router
