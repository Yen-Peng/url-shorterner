const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json({extended: false})); //req.body

// ROUTES //

app.get("/test"), async (req, res) => {
  return '1';
}

// Define Routes
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/url'));


const PORT = process.env.PG_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
