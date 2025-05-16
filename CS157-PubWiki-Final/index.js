const express = require("express");

const app = express();

app.use(express.static("./public"));
app.use(express.json({limit: '5mb'}));

const database = require("./database.js")

const wikiRoutes = require("./routes/wiki.js");
const userRoutes = require("./routes/user.js");
app.use("/api/wiki", wikiRoutes);
app.use("/api/user", userRoutes);

app.listen(3000);