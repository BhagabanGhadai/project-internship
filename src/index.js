const express = require("express");
const app = express();
const router = require("./routes/route");
const bodyparser = require("body-parser");

app.use(bodyparser.json());

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Bhagaban:L2vSe5ZRZjoVfhOA@cluster0.ojbuh.mongodb.net/group90Database",
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));

app.use("/functionup", router);

app.listen(process.env.PORT || 3000, () => {
  console.log("express running on PORT:", process.env.PORT || 3000);
});
