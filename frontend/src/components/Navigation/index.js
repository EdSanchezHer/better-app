import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import * as sessionActions from "../../store/session";
import * as questionActions from "../../store/questions";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.session.user.id);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [errors, setErrors] = useState([]);
	const [questionForm, setQuestionForm] = useState("none");

	const sessionUser = useSelector((state) => state.session.user);

	let sessionLinks = <ProfileButton user={sessionUser} />;

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

	const handleSubmit = async (e) => {
		e.preventDefault();

		const payload = {
			userId: userId,
			title: title,
			description: description,
		};

		setErrors([]);

		await dispatch(questionActions.addQuestion(payload)).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});

		await dispatch(questionActions.getQuestions());

		setTitle("");
		setDescription("");
		setQuestionForm("none");
	};

	return (
		<>
			<div className="nav-container">
				<Link to="/" className="main-title">
					Better
				</Link>
				<div>
					<input
						className="search"
						type="search"
						placeholder=" Search questions"
					></input>
				</div>
				<div>
					<button onClick={showForm} className="form-button">
						Ask Question
					</button>
				</div>
				<ul>
					<li>{isLoaded && sessionLinks}</li>
				</ul>
			</div>
			<div className="hidable-form" style={{ display: questionForm }}>
				<div className="modal">
					<form className="form-border shadow" onSubmit={handleSubmit}>
						<h1 className="title">Question</h1>
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
							<input
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

export default Navigation;
