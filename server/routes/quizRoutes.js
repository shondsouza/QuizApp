const express = require("express");
const router = express.Router();

const {
  getQuestions,
  addQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/quizController");

router.get("/:category", getQuestions);
router.get("/list/all", getAllQuestions);
router.post("/add", addQuestion);
router.put("/update/:id", updateQuestion);
router.delete("/delete/:id", deleteQuestion);

module.exports = router;
