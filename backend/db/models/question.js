"use strict";
module.exports = (sequelize, DataTypes) => {
	const Question = sequelize.define(
		"Question",
		{
			ownerId: DataTypes.INTEGER,
			title: { type: DataTypes.STRING, allowNull: false },
			description: { type: DataTypes.TEXT, allowNull: true },
		},
		{}
	);
	Question.associate = function (models) {
		Question.belongsTo(models.User, { foreignKey: "ownerId" });
		Question.hasMany(models.Answer, { foreignKey: "questionId" });
	};
	Question.listAll = async function () {
		return await Question.findAll();
	};
	return Question;
};
