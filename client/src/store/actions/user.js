import * as actionTypes from './actionTypes';

export const setUserEditing = (userId) => {
    return {
        type: actionTypes.USER_EDITING,
        userId: userId
    };
};

