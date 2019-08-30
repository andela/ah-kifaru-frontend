import { FAILURE_PROFILE, SUCCESS_PROFILE } from '../actionTypes';

const initialState = {
  profile: null,
  error: '',
  followers: [],
  followee: [],
  articles: []
};
const actions = [FAILURE_PROFILE, SUCCESS_PROFILE];

export default (state = initialState, { type, payload }) => {
  return actions.includes(type) ? { ...state, ...payload } : { ...state };
};
