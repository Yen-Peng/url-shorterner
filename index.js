const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

//middleware
app.use(cors());
app.use(express.json({extended: false})); //req.body

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

// Define Routes
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/url'));

app.get("*", (req,res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
