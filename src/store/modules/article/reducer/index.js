import { PENDING_ARTICLE, COMPLETE_ARTICLE } from '../articleType';

const initialState = {
  isLoading: false
};

const authTypes = [PENDING_ARTICLE, COMPLETE_ARTICLE];

const articleReducer = (state = initialState, { type, payload }) => {
  return authTypes.includes(type) ? { ...state, ...payload } : state;
};
export default articleReducer;
