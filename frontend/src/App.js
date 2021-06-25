import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import Main from "./components/Main";
import * as sessionActions from "./store/session";
import { useSelector } from "react-redux";

function App() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);

	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	const routes = (
		<Switch>
			<Route path="/login">
				<LoginFormPage />
			</Route>
			<Route path="/">
				<SignupFormPage />
			</Route>
		</Switch>
	);

	if (!sessionUser) {
		return <SignupFormPage /> && routes;
	} else
		return (
			<>
				<Navigation isLoaded={isLoaded} />
				<Main />
			</>
		);
}

export default App;
