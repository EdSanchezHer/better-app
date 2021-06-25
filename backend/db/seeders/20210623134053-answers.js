"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Answers",
			[
				{
					userId: 1,
					questionId: 1,
					answer: "To be",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					userId: 1,
					questionId: 2,
					answer: "Always plan ahead and remove all distractions.",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					userId: 1,
					questionId: 3,
					answer: "Make a list of interests. Begin to explore it.",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Answers", null, {});
	},
};
