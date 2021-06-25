"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Questions",
			[
				{
					ownerId: 1,
					title: "What is the meaning of life?",
					description: "Basics",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					ownerId: 1,
					title: "How to get better at working out?",
					description: "Health",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					ownerId: 1,
					title: "How to find a hobby?",
					description: "Life",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Questions", null, {});
	},
};
