const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const db = require("./lib/db");
const Post = require("./models/post");
const Comment = require("./models/comment");

/*
  We create an express app calling
  the express function.
*/
const app = express();

/*
  We setup middleware to:
  - parse the body of the request to json for us
  https://expressjs.com/en/guide/using-middleware.html
*/
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  const { method, url } = req;
  console.log("My custom Middleware");
  console.log(`${method} ${url}`);
  next();
});
/*
  Endpoint to handle GET requests to the root URI "/"
*/
app.get("/", (req, res) => {
  res.json({
    "/posts": "read and create new posts",
    "/posts/:id": "read, update and delete an individual post",
  });
});

app.get("/posts", (req, res) => {
  // in th (we can look for certain stuff)
  Post.find()
    .then((posts) => {
      res.status(200);
      res.json(posts);
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error: `Internal server error ${error}`,
      });
    });
});

app.post("/posts", (req, res) => {
  Post.create(req.body)
    .then((posts) => {
      res.status(200);
      res.json(posts);
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error: `Internal server error ${error}`,
      });
    });
});

app.post("/comments", (req, res) => {
  Comment.create(req.body)
    .then((comment) => {
      res.status(200);
      res.json(comment);
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error: `Internal server error ${error}`,
      });
    });
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;

  Post.findById(id)
    .then((post) => {
      if (post) {
        res.status(200);
        res.json(post);
        console.log(post);
      } else {
        res.status(404);
        res.json({
          error: `Id:${id} not found`,
        });
      }
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error: `Internal server error ${error}`,
      });
    });
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;

  Comment.findById(id)
    .then((comment) => {
      if (comment) {
        res.status(200);
        res.json(comment);
        console.log(comment);
      } else {
        res.status(404);
        res.json({
          error: `Id:${id} not found`,
        });
      }
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error: `Internal server error ${error}`,
      });
    });
});

app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;

  Post.findByIdAndUpdate(id, req.body)
    .then((post) => {
      if (post) {
        res.status(200);
        res.json(post);
        console.log(post);
      } else {
        res.status(404);
        res.json({
          error: `Id:${id} not found`,
        });
      }
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error: `Internal server error ${error}`,
      });
    });
});

app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;

  Post.findByIdAndDelete(id).then((post) => {
    res.status(204);
    res.json(post);
    console.log(`Deleted Post nUmber ${id} `);
  });
});

/*
  We have to start the server. We make it listen on the port 4000

*/

// localhost = 127.0.0.1
mongoose.connect("mongodb://localhost/blogs", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const mongodb = mongoose.connection;
mongodb.on("open", () => {
  app.listen(4000, () => {
    console.log("Listening on http://localhost:4000");
  });
});
