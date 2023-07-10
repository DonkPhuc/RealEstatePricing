import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;

const valuation = require("./routes/valuation");

app.use(bodyParser.json());
app.use(cors());

app.use("/v1/api", valuation);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
