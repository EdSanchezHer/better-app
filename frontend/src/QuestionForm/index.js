// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, Redirect, useHistory } from "react-router-dom";

// import "./QuestionForm.css";

// function QuestionForm({ questionForm }) {
// 	const dispatch = useDispatch();
// 	const userId = useSelector((state) => state.session.user.id);
// 	const [title, setTitle] = useState("");
// 	const [description, setDescription] = useState("");
// 	const [errors, setErrors] = useState([]);

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();

// 		const payload = {
// 			userId: userId,
// 			title: title,
// 			description: description,
// 		};

// 		setErrors([]);

// 		await dispatch(questionActions.addQuestion(payload)).catch(async (res) => {
// 			const data = await res.json();
// 			if (data && data.errors) setErrors(data.errors);
// 		});

// 		await dispatch(questionActions.getQuestions());
// 	};

// 	return (
// 		<>
// 			<div className="hidable-form" style={{ display: questionForm }}>
// 				<div className="modal">
// 					<form className="form-border shadow" onSubmit={handleSubmit}>
// 						<h1 className="title">Question</h1>
// 						<ul>
// 							{errors.map((error, idx) => (
// 								<li key={idx}>{error}</li>
// 							))}
// 						</ul>
// 						<label>
// 							Question
// 							<input
// 								placeholder="Your question"
// 								className="input-field"
// 								type="input"
// 								value={title}
// 								onChange={(e) => setTitle(e.target.value)}
// 								required
// 							/>
// 						</label>
// 						<label>
// 							Description (Optional)
// 							<input
// 								placeholder="Add more details"
// 								className="input-field"
// 								type="text"
// 								value={description}
// 								onChange={(e) => setDescription(e.target.value)}
// 							/>
// 						</label>
// 						<button className="form-button" type="submit">
// 							Submit question
// 						</button>
// 					</form>
// 				</div>
// 			</div>
// 		</>
// 	);
// }

// export default QuestionForm;
