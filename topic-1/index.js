require("dotenv").config();

const express = require("express");
const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "tmp");
const fileUpload = require("express-fileupload");
const routes = require("./router");
const errorHandlers = require("./middleware/errorHandlers");

const app = express();
const PORT = process.env.PORT || 4000;

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.use(express.static("public"));

app.use("/api", routes);

app.use(errorHandlers);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
