import { csrfFetch } from "./csrf";

export const LOAD_ANSWERS = "answers/LOAD_ANSWERS";

const load = (answers) => ({
	type: LOAD_ANSWERS,
	answers,
});

export const getAnswers = (id) => async (dispatch) => {
	const res = await csrfFetch(`/api/questions/${id}/answers`);

	if (res.ok) {
		const answers = await res.json();
		dispatch(load(answers));
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
		default:
			return state;
	}
};

export default answersReducer;
