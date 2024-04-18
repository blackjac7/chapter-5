require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const routes = require("./router");
const errorHandlers = require("./middleware/errorHandlers");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.use(express.static("public"));

app.use("/api", routes);

app.use(errorHandlers);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
