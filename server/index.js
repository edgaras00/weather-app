const express = require("express");
const cors = require("cors");
const apiRouter = require("./api/routes/apiRoutes");
require("dotenv").config();

const app = express();
app.use(cors());

app.use("/api", apiRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
