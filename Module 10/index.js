const express = require('express');
const database = require("./database.js");
const usersRoutes = require("./routes/user.js");

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use("/api/user", usersRoutes);


app.listen(3000, () => console.log('server started'));
