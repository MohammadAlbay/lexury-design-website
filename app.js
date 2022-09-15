const express = require("express");
const path = require("path");

const app = express();

app.use("/static", express.static(path.resolve(__dirname, "static")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "static", "html", "index.html"));
});

app.listen(80, () => console.log("Server running..."));