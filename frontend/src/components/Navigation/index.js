import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />;
	} else {
		sessionLinks = (
			<>
				<NavLink className="link" to="/login">
					Log In
				</NavLink>
				<NavLink className="link" to="/signup">
					Sign Up
				</NavLink>
			</>
		);
	}

	return (
		<div className="nav-container">
			<ul>
				<li>
					<NavLink className="link" exact to="/">
						Home
					</NavLink>
					{isLoaded && sessionLinks}
				</li>
			</ul>
		</div>
	);
}

export default Navigation;
