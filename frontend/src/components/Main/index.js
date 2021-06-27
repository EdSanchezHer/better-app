import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getQuestions } from "../../store/questions";
import { Redirect, Link } from "react-router-dom";

import "./Main.css";

export default function Main() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const questions = useSelector((state) =>
		Object.values(state.questions).reverse()
	);

	useEffect(() => {
		dispatch(getQuestions());
		console.log(questions);
	}, [dispatch]);

	if (!sessionUser) return <Redirect to="/signup" />;

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
									<div className="answers">{question.description}</div>
								</div>
								<Link to={`/questions/${question.id}`}>
									<button className="find-button">See answers</button>
								</Link>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
