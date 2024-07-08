const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://poojarydeepak15:yashmith@cluster0.0rohejj.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = mongoose;
