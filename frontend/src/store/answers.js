import { csrfFetch } from "./csrf";

export const LOAD_ANSWERS = "answers/LOAD_ANSWERS";
export const ADD_ANSWER = "answers/ADD_ANSWER";

const load = (answers) => ({
	type: LOAD_ANSWERS,
	answers,
});

const add = (answer) => ({
	type: ADD_ANSWER,
	answer,
});

export const getAnswers = (id) => async (dispatch) => {
	const res = await csrfFetch(`/api/questions/${id}/answers`);

	if (res.ok) {
		const answers = await res.json();
		dispatch(load(answers));
	}
};

export const addAnswer = (answer, questionId) => async (dispatch) => {
	const res = await csrfFetch(`/api/questions/${questionId}/answers`, {
		method: "post",
		header: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(answer),
	});

	if (res.ok) {
		const answer = await res.json();
		dispatch(add(answer));
		return answer;
	}
};

// const initialState = {};

const answersReducer = (state = {}, action) => {
	switch (action.type) {
		case LOAD_ANSWERS: {
			const newAnswers = {};
			action.answers.forEach((answer) => {
				newAnswers[answer.id] = answer;
			});
			return {
				...state,
				...newAnswers,
			};
		}
		case ADD_ANSWER: {
			return { ...state, [action.answer.id]: { ...state[action.answer] } };
		}
		default:
			return state;
	}
};

export default answersReducer;
