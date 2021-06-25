const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");

const { Question } = require("../../db/models");

const router = express.Router();

// Get all questions
router.get(
	"/",
	asyncHandler(async (req, res) => {
		const questions = await Question.listAll();
		return res.json(questions);
	})
);

// Post a question
router.post(
	"/",
	asyncHandler(async (req, res) => {
    const question = await 
  })
);
// Get one question

// Update a question

// Delete a question

// Add answer to question

// Get answers to question

module.exports = router;
