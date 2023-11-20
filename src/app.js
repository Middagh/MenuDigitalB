const express = require("express");
const { dbConnection } = require("./src/database/config");
const cors = require("cors");
const app = express();

require("dotenv").config();

dbConnection();

app.use(express.json());
app.use(cors());
//app.use("/admin", require("./src/routes/admin"));
app.use("/auth", require("../src/routes/login"));
app.use("/auth", require("../src/routes/register"));
//app.use("/contact", require("./src/routes/contactFormSend"));

app.listen(process.env.PORT, () => {
  console.log(`Servidor en el puerto ${process.env.PORT}`);
});
