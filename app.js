const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const config = require("config");

const app = express();

app.use(express.json({ extended: true }));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/link.routes"));
app.use("/t", require("./routes/redirect.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

async function start() {
  const PORT = config.get("port") || 5000;
  const MONGO_URI = config.get("mongoUri");

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () => {
      console.log("Server has been started on port " + PORT);
    });
  } catch (error) {
    console.error("Server error:", error);
    process.exit(1);
  }
}

start();
