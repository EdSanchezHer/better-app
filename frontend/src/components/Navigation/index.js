import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	// if (sessionUser) {
	let sessionLinks = <ProfileButton user={sessionUser} />;
	// } else {
	// sessionLinks = (
	// 	<>
	// 		<NavLink className="link" to="/login">
	// 			Log In
	// 		</NavLink>
	// 		<NavLink className="link" to="/signup">
	// 			Sign Up
	// 		</NavLink>
	// 	</>
	// );
	// }

	return (
		<>
			<div className="nav-container">
				<Link path="/" className="main-title">
					{" "}
					Better{" "}
				</Link>
				<div>
					<input
						className="search"
						type="search"
						placeholder=" Search questions"
					></input>
				</div>
				<ul>
					<li>{isLoaded && sessionLinks}</li>
				</ul>
			</div>
		</>
	);
}

export default Navigation;
