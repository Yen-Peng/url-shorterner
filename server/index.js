const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const shortid = require("shortid");
const config = require("config");
const isUrl = require("is-valid-http-url");

//middleware
app.use(cors());
app.use(express.json({extended: false})); //req.body

// ROUTES //

app.get("/test"), async (req, res) => {
  return '1';
}

// @route POST /shorten
// desc   Create short URL
app.post("/shorten", async (req, res) => {
  const { longurl } = req.body;
  const baseUrl = config.get("baseUrl");

  // Check base url
  if (!isUrl(baseUrl)) {
    return res.status(401).json("Base url is invalid");
  }

  // Create url code
  const urlcode = shortid.generate();

  // Check long url
  
  if (isUrl(longurl)) {
    try {
      const url = await pool.query("SELECT * FROM urls WHERE longurl = $1", [
        longurl,
      ]);
      if (url.rows[0]) {
        res.json(url.rows[0]);
      } else {
        const shorturl = baseUrl + "/" + urlcode;

        // Insert into database
        const newUrl = await pool.query(
          "INSERT INTO urls (longurl, shorturl, urlcode) VALUES($1, $2, $3) RETURNING *",
          [longurl, shorturl, urlcode]
        );
        res.json(newUrl.rows[0]);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json("Original / long url is invalid");
  }
});

// @route GET /urls
// desc   Get all urls for display
app.get("/urls", async (req, res) => {
  try {
    const allUrls = await pool.query("SELECT * FROM urls");
    res.json(allUrls.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// @route GET /:code
// desc   Redirect to long/original URL
app.get("shorten/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const url = await pool.query(
      "SELECT * FROM urls WHERE urlcode = $1",
      [code]
    );
    if (url.rows[0]) {
      res.redirect(url.rows[0].longurl);
    } else {
      return res.status(404).json('No url found');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// @route DELETE /urls/:id
// desc   Redirect to long/original URL
app.delete("/urls/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUrl = await pool.query("DELETE FROM urls WHERE url_id = $1", [
      id,
    ]);
    res.json("Url was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});


// create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
