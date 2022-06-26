const express = require("express");
const path = require("path");
const cors = require("cors");
const apiRouter = require("./routes/apiRoutes");
require("dotenv").config();

const app = express();
app.use(cors());

app.use("/api", apiRouter);

app.use(express.static(path.join(__dirname, "/client/build")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
