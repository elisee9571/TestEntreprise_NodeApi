const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;
const hostname = "localhost";

app.use(bodyParser.json());
app.use(cors());

// use routes
app.use("/users", require("./router/users.js"));

app.listen(port, hostname, () => {
    console.log(`Server started on http://${hostname}:${port}/`);
});