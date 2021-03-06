// Dependents
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
// heroku support
const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
// load from atlas heroku prep
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
