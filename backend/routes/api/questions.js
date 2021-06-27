const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");

const { Question, Answer } = require("../../db/models");

const router = express.Router();

const validateQuestion = [
	check("title")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a question."),
	handleValidationErrors,
];

// Get all questions
router.get(
	"/",
	asyncHandler(async (req, res) => {
		const questions = await Question.findAll();
		console.log(questions);
		return res.json(questions);
	})
);

// Post a question
router.post(
	"/",
	validateQuestion,
	asyncHandler(async (req, res) => {
		const { userId, title, description } = req.body;

		console.log(userId, title, description);

		const newQuestion = await Question.create({
			ownerId: userId,
			title: title,
			description: description,
		});

		return res.redirect("/");
	})
);
// Get one question

// router.get();

// Update a question

// Delete a question

// Add answer to question

// Get answers to question
router.get(
	"/:id/answers",
	asyncHandler(async (req, res) => {
		const questionId = req.params.id;
		const answers = await Answer.findAll({ where: { questionId } });

		return res.json(answers);
	})
);

module.exports = router;
