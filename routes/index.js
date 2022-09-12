const express = require("express");
const router = express.Router();
const pool = require("../db");

// @route GET /:code
// desc   Redirect to long/original URL
router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const url = await pool.query("SELECT * FROM urls WHERE urlcode = $1", [
      code,
    ]);
    if (url.rows[0]) {
      res.redirect(url.rows[0].longurl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

module.exports = router;
