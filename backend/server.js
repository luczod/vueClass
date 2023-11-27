const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// config
const dbName = "partytime";
const port = 3002;
const app = express();

// routes
const authRouter = require("./routes/authRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const partyRouter = require("./routes/partyRoutes.js");

// middlewares
const verifyToken = require("./helpers/check-token");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// routes functions
app.use("/api/auth", authRouter);
app.use("/api/user", verifyToken, userRouter);
app.use("/api/party", partyRouter);

mongoose.connect(`mongodb://127.0.0.1/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.json({ message: "Rota teste." });
});

app.listen(port, () => {
  console.log(`O backend está rodando na porta http://localhost:${port}`);
});
