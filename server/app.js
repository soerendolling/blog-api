const express = require("express");
const cors = require("cors");
const db = require("./lib/db");

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
  db.findAll()
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
  db.insert(req.body)
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
  // if (!req.body.title && req.body.body){

  // }

  db.insert(req.body)
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

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
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

app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;

  db.updateById(id, req.body)
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
  db.deleteById(id).then((post) => {
    res.status(204);
    res.json(post);
    console.log(`Deleted Post nUmber ${id} `);
  });
});

/*
  We have to start the server. We make it listen on the port 4000

*/
app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
