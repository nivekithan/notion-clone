require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const port = process.env.PORT;

// Mongoose
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_PATH, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", console.error);

// Middlewares
app.use(require("cors")());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app routes
app.use("/post", require("./routers/post"));
app.use("/get", require("./routers/get"));
app.use("/put", require("./routers/put"));
app.use("/delete", require("./routers/delete"))

app.listen(port);
