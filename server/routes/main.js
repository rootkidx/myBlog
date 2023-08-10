const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { marked } = require('marked');


/**
 * GET /
 * HOME
*/
router.get('', async (req, res) => {
  try {
    const locals = {
      title: "Rootkid Blog",
      description: ""
    }

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});


/**
 * GET /
 * Post :id
*/
router.get('/post/:id', async (req, res) => {
  
 
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const contentHTML = marked(data.body);

    const locals = {
      title: data.title,
      description: "",
      contentHTML: contentHTML,
    }

    res.render('post', {
      locals,
      data,
      currentRoute: `/post/${slug}`
    });
  } catch (error) {
    console.log(error);
  }

});


/**
 * POST /
 * Post - searchTerm
*/
router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: "Seach",
      description: ""
    }

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
      ]
    });

    res.render("search", {
      data,
      locals,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});


/**
 * GET /
 * About
*/
router.get('/about', (req, res) => {
  try {
    const locals = {
      title: "Rootkid Blog",
      description: ""

    }

    res.render('about', {
      currentRoute: '/about'
    });
    
  } catch (error) {
    console.log(error);
  }

});

/**
 * GET /
 * Contact
*/
router.get('/contact', (req, res) => {
  try {
    const locals = {
      title: "Rootkid Blog",
      description: ""

    }

    res.render('contact', {
      currentRoute: '/contact'
    });
    
  } catch (error) {
    console.log(error);
  }

});


// function insertPostData () {
//   Post.insertMany([
//     {
//       title: "Building APIs with Node.js",
//       body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js"
//     }
//   ])
// }

// insertPostData();


module.exports = router;