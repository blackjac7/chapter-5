require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const routes = require("./router");
const errorHandlers = require("./middleware/errorHandlers");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: process.env.NODE_ENV == "development" ? "./tmp" : "/tmp", // if you're using GCP App Engine please don't comment this, because the ./tmp directory is read only and we need write too so we use /tmp
    })
);

app.use(express.static("public"));

app.use("/api", routes);

app.use(errorHandlers);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
