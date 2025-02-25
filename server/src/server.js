const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config/config.env" });
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("./routes/values"));
app.use(require("./routes/utilities"));
app.use(require("./routes/turnservertoken"));
app.use(require("./routes/rooms"));
// get driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err); 
  });
  console.log(`Server is running on port: ${port}`);
});