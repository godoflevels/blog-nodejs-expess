const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Routes GET / HOME
router.get('/', async (req, res) => {
  try {
    const locals = {
      title: "godoflevel Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([ {$sort: { createdAt: -1 } } ]).skip(perPage * (page - 1)).limit(perPage).exec();

    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    res.render('index', { locals, data, current: page, nextPage: hasNextPage ? nextPage : null });
  } catch (error) {
    console.log(error);
  }
});














router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/contact', (req, res) => {
  res.render('contact');
})



// function insertPostData() {
//   Post.insertMany([
//     {
//       title: "Working with Environment Variables in Node.js",
//       body: "Learn how to store configuration values securely using environment variables and the dotenv package."
//     },

//     {
//       title: "Error Handling in Express.js",
//       body: "Understand how to handle errors in Express applications using middleware, try/catch, and custom error responses."
//     },

//     {
//       title: "Using Middleware in Express",
//       body: "Learn what middleware is, how it works, and how to create your own middleware functions in Express.js."
//     },

//     {
//       title: "Introduction to REST API Design",
//       body: "Learn the basic principles of REST APIs, including resources, HTTP methods, status codes, and request structure."
//     },

//     {
//       title: "Working with Query Parameters",
//       body: "Learn how to read and use query parameters in Express routes for filtering, sorting, and pagination."
//     },

//     {
//       title: "Using Route Parameters in Express",
//       body: "Understand how dynamic route parameters work and how to access them through req.params."
//     },

//     {
//       title: "Connecting Node.js to MongoDB",
//       body: "Learn how to connect a Node.js application to MongoDB using Mongoose and manage the database connection."
//     },

//     {
//       title: "Creating CRUD Operations with Mongoose",
//       body: "Learn how to create, read, update, and delete MongoDB documents using Mongoose models."
//     },

//     {
//       title: "Pagination in Node.js Applications",
//       body: "Learn how to split large amounts of data into pages using query parameters, limit, and skip."
//     },

//     {
//       title: "File Uploads with Node.js",
//       body: "Learn how to handle file uploads in Express applications using multipart form data and libraries such as Multer."
//     },

//     {
//       title: "Understanding Cookies and Sessions",
//       body: "Learn how cookies and sessions work and how they can be used to keep users logged in."
//     },

//     {
//       title: "Password Hashing with bcrypt",
//       body: "Learn how to securely hash and verify passwords using bcrypt in Node.js applications."
//     }
//   ]);
// }

// insertPostData();


module.exports = router;