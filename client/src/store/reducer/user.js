import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helpers/utility';

const initialState = {
    userId: null
};

const userEditing = (state, action) => {
    return updateObject(state, { userId: action.userId });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_EDITING: return userEditing(state, action);
        default:
            return state;
    }
};

export default reducer;