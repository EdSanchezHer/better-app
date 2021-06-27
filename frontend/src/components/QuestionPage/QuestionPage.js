import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { addAnswer, getAnswers } from "../../store/answers";
import { getQuestions, removeQuestion } from "../../store/questions";

import "./QuestionPage.css";

export default function QuestionPage() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [answer, setAnswer] = useState("");
	const [questionForm, setQuestionForm] = useState("none");
	const [errors, setErrors] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const { questionId } = useParams();
	const question = useSelector((state) => state.questions[questionId]);
	const userId = useSelector((state) => state.session.user.id);
	const usersQuestion = question.ownerId === userId;
	const answers = useSelector((state) =>
		Object.values(state.answers)
			.filter((answer) => {
				return answer.questionId == questionId;
			})
			.reverse()
	);

	let ans = "Answer";

	if (answers.length > 1 || answers.length === 0) {
		ans = "Answers";
	}

	function formatDate(string) {
		var options = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		};
		return new Date(string).toLocaleDateString([], options);
	}

	const removeItem = (e) => {
		dispatch(removeQuestion(e.target.id));
		history.push("/");
	};

	const handleSubmit = async (e) => {
		// e.preventDefault();
		// const payload = {
		// 	userId: userId,
		// 	title: title,
		// 	description: description,
		// };
		// setErrors([]);
		// await dispatch(questionActions.addQuestion(payload)).catch(async (res) => {
		// 	const data = await res.json();
		// 	if (data && data.errors) setErrors(data.errors);
		// });
		// await dispatch(questionActions.getQuestions());
		// setTitle("");
		// setDescription("");
		// setQuestionForm("none");
		return;
	};

	const submitAnswer = async (e) => {
		if (e.keyCode !== 13) return;

		const payload = { userId: userId, questionId: questionId, answer: answer };

		await dispatch(addAnswer(payload, questionId));

		await dispatch(getAnswers(questionId));

		setAnswer("");
	};

	useEffect(() => {
		dispatch(getQuestions());
		dispatch(getAnswers(questionId));
	}, [dispatch]);

	const showForm = () => {
		if (questionForm === "block") return;
		setQuestionForm("block");
	};

	useEffect(() => {
		if (questionForm === "none") return;

		const hideForm = (e) => {
			if (e.target.className === "modal") setQuestionForm("none");
		};

		document.addEventListener("click", hideForm);

		return () => document.removeEventListener("click", hideForm);
	}, [questionForm]);

	return (
		// Hidden form for editing
		// Input for answers
		// Display all answers
		<>
			<div className="page-container ">
				<div className="question-border shadow question-container">
					<h1 className="question-title">{question.title}</h1>
					<h2 className="question-description">{question.description}</h2>
					<div className="buttons">
						{usersQuestion && (
							<button
								onClick={removeItem}
								id={question.id}
								className="delete-button"
							>
								Delete question
							</button>
						)}
					</div>
				</div>
				<h4>
					{answers.length} {ans}
				</h4>
				<hr></hr>
				<div>
					{answers.map((answer) => {
						return (
							<>
								<div className="comment">
									<div>
										<p>{answer.answer}</p>
										<p className="date">{formatDate(answer.updatedAt)}</p>
									</div>
									<div>
										{answer.userId == userId && (
											<button onClick={showForm} className="update-button">
												Edit comment
											</button>
										)}
										{answer.userId == userId && (
											<button
												onClick={removeItem}
												id={question.id}
												className="delete-button"
											>
												Delete question
											</button>
										)}
									</div>
								</div>
								<hr className="drop"></hr>
							</>
						);
					})}
					<input
						onKeyUp={submitAnswer}
						placeholder="Add answer"
						className="input-field"
						type="text"
						value={answer}
						onChange={(e) => setAnswer(e.target.value)}
					/>
				</div>
			</div>
			<div className="hidable-form" style={{ display: questionForm }}>
				<div className="modal">
					<form className="form-border shadow" onSubmit={handleSubmit}>
						<h1 className="floating-title">Question</h1>
						<ul>
							{errors.map((error, idx) => (
								<li key={idx}>{error}</li>
							))}
						</ul>
						<label>
							Question
							<input
								placeholder="Your question"
								className="input-field"
								type="input"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
							/>
						</label>
						<label>
							Description (Optional)
							<textarea
								placeholder="Add more details"
								className="input-field"
								type="text"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</label>
						<button className="form-button" type="submit">
							Submit question
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
