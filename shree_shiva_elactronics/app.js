const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
var bodyParser = require("body-parser");
const { error } = require("console");
var mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json(), express.urlencoded({ extended: false }));
app.use(bodyParser.json(), bodyParser.urlencoded());
app.use("/Image", express.static("./uplode"));

mongoose
  .connect(process.env.MOONGODB)
  .then((relsult) => {
    console.log("mahadev");
  })
  .catch((error) => {
    console.log(error);
  });

// app.use(cors({
//     origin: "*",
//     methods: ['GET']
// }))

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow DELETE requests
  })
);

const OrderRouting = require("./Routing/OrderRouting");
app.use("/OrderRouting", OrderRouting);

var AdminRouting = require("./Routing/AdminRouting");
app.use("/AdminRouting", AdminRouting);

var CustomerRouting = require("./Routing/CustomerRouting");
app.use("/CustomerRouting", CustomerRouting);

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("shiv_1");
});
