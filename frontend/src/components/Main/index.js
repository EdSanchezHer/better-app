import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getQuestions } from "../../store/questions";

import "./Main.css";

export default function Main() {
	const dispatch = useDispatch();
	const questions = useSelector((state) => Object.values(state.questions));

	useEffect(() => {
		dispatch(getQuestions());
		console.log(questions);
	}, [dispatch]);

	return (
		<>
			<div className="wrapper">
				<div className="sidebar">
					<p className="side-subtitle">Explore Categories</p>
					<a className="side-link ">Diet</a>
					<a className="side-link ">Life</a>
					<a className="side-link ">Advice</a>
					<a className="side-link ">Mindfulness</a>
					<a className="side-link ">Exercise</a>
				</div>
				<div className="questions-container">
					{questions.map((question) => {
						return (
							<div className="question-border shadow">
								<div>
									<h3 class="question">{question.title}</h3>
									<div className="answers">Answers go here</div>
								</div>
								<button className="answers-button">See all answers</button>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
