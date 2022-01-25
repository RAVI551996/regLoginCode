const router =require('express').Router();
const varify= require('./verifyToken')
const Post = require("../model/postModal");
const { verify } = require('jsonwebtoken');
const verifyToken = require('./verifyToken');

//CREATE POST
router.post("/" ,verifyToken, async (req, res) => {
    const userId = req.user._id ;
    req.body.userId = userId;
    const newPost = new Post(req.body);

    try {
        // const token = req.header('auth-token');
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //UPDATE POST
  router.put("/:id",verifyToken, async (req, res) => {
    const userId = req.user._id ;
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //DELETE POST
  router.delete("/:id",verifyToken, async (req, res) => {
    const userId = req.user._id ;
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          await post.delete();
          res.status(200).json("Post has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can delete only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET POST
  router.get("/:id", verifyToken, (req, res) => {
    const userId = req.user._id ;
    try {
      const post =  Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET ALL POSTS
  router.get("/",verifyToken, async (req, res) => {
    //   console.log(req.user)
    const userId = req.user._id ;
    const catName = req.query.cat;
    try {
      let posts;
      if (userId) {
        posts = await Post.find({ userId });
      } else if (catName) {
        posts = await Post.find({
          categories: {
            $in: [catName],
          },
        });
      } else {
        posts = await Post.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports =router;