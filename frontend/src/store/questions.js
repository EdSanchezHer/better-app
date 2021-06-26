import { csrfFetch } from "./csrf";

// Action types
const LOAD = "questions/LOAD";
const ADD_QUESTION = "questions/ADD";

// Actions

const loadQuestions = (list) => ({
	type: LOAD,
	list,
});

// const addQuestion = (question) => ({
// 	type: ADD_QUESTION,
// 	question,
// });

// Dispatch Methods

export const getQuestions = () => async (dispatch) => {
	const res = await csrfFetch("/api/questions");

	if (res.ok) {
		const questions = await res.json();
		dispatch(loadQuestions(questions));
	}
};

export const addQuestion = (data) => async (dispatch) => {
	console.log(data);
	const response = await csrfFetch(`/api/questions`, {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
};
// export const login = (user) => async (dispatch) => {
// 	const { credential, password } = user;
// 	const response = await csrfFetch("/api/session", {
// 		method: "POST",
// 		body: JSON.stringify({
// 			credential,
// 			password,
// 		}),
// 	});
// 	const data = await response.json();
// 	dispatch(setUser(data.user));
// 	retu

// Reducer

const initialState = { questions: {} };

const questionReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD: {
			const allQuestions = {};
			action.list.forEach((question) => {
				allQuestions[question.id] = question;
			});
			return allQuestions;
		}
		default:
			return state;
	}
};

export default questionReducer;
