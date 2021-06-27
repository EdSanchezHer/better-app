import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAnswers } from "../../store/answers";
import { getQuestions } from "../../store/questions";

export default function QuestionPage() {
	const dispatch = useDispatch();
	const { questionId } = useParams();
	const question = useSelector((state) => state.questions[questionId]);
	const userId = useSelector((state) => state.session.user.id);
	const answers = useSelector((state) => Object.values(state.answers));

	const usersQuestion = question.ownerId === userId;

	useEffect(() => {
		dispatch(getQuestions());
		dispatch(getAnswers(questionId));
		console.log(answers);
	}, [dispatch]);

	return (
		// Hidden form for editing
		// Input for answers
		// Display all answers
		<>
			<div className="question-border shadow">
				<h1>{question.title}</h1>
				<h2>{question.description}</h2>
				{usersQuestion && <button>Delete question</button>}
				{usersQuestion && <button>Edit question</button>}
			</div>
			<div>
				<input></input>
				{answers.map((answer) => {
					{
						if (answer.questionId == questionId) {
							return <div>{answer.answer}</div>;
						}
					}
				})}
			</div>
		</>
	);
}
