import { csrfFetch } from "./csrf";

// Action types
const LOAD = "questions/LOAD";

// Actions

const loadQuestions = (list) => ({
	type: LOAD,
	list,
});

// Dispatch Methods

export const getQuestions = () => async (dispatch) => {
	const res = await csrfFetch("/api/questions");

	if (res.ok) {
		const questions = await res.json();
		dispatch(loadQuestions(questions));
	}
};

// Reducer

const initialState = { questions: [] };

const questionReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD: {
			const allQuestions = {};
			action.list.forEach((question) => {
				allQuestions[question.id] = question;
			});
			return {
				...allQuestions,
				...state,
			};
		}
		default:
			return state;
	}
};

export default questionReducer;
