// run "node app.js"

const express = require("express");
const app = express();
const session = require('express-session');

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

// setup ejs & layouts
const moment = require('moment');
const expressLayouts = require("express-ejs-layouts");
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// setup mongodb
require("./config/database");

// route
const adminRouter = require("./routes/AdminRoute");
const userRouter = require("./routes/UserRoute");
const loginRegisRouter = require("./routes/LoginRegisRoute");
app.use("/admin", adminRouter);
app.use("", userRouter);
app.use("", loginRegisRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});
