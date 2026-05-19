const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const quizRoutes = require("./routes/quizRoutes");
const userRoutes = require("./routes/userRoutes");
const resultRoutes = require("./routes/resultRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/quizapp";

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.json({ message: "Quiz App API is running" });
});

app.use("/api/quiz", quizRoutes);
app.use("/api/user", userRoutes);
app.use("/api/result", resultRoutes);
app.use("/api/category", categoryRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
