const express = require("express");
const router = express.Router();
const isUrl = require("is-valid-http-url");
const shortid = require("shortid");
const config = require("config");
const pool = require("../db");

// @route POST /api/shorten
// desc   Create short URL
router.post("/shorten", async (req, res) => {
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


// @route GET /api/urls
// desc   Get all urls for display
router.get("/urls", async (req, res) => {
  try {
    const allUrls = await pool.query("SELECT * FROM urls ORDER BY url_id DESC");
    res.json(allUrls.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// @route DELETE /api/urls/:id
// desc   Delete a url
router.delete("/urls/:id", async (req, res) => {
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

// @route DELETE /api/urls
// desc   Delete all urls
router.delete("/urls", async (req, res) => {
  try {
    const deleteUrl = await pool.query("DELETE FROM urls");
    res.json("All urls were deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
