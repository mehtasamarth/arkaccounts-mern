import axios from '../../helpers/axios'

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (userId, companyId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        companyId: companyId,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (loginDetails) => {
    return dispatch => {
        dispatch(authStart());
        let url = 'user/login';
        axios.post(url, loginDetails)
            .then(response => {
                console.log(response);
                if (response.data && response.data.responseCode) {
                    if (response.data.responseCode === "200") {
                        // const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                        // localStorage.setItem('token', response.data.idToken);
                        // localStorage.setItem('expirationDate', expirationDate);
                        let userId = response.data.responseData._id;
                        let companyId = response.data.responseData.companyId ? response.data.responseData.companyId : null;
                        // console.log(userId, companyId);
                        localStorage.setItem('userId', userId);
                        localStorage.setItem('companyId', companyId);
                        dispatch(authSuccess(userId, companyId));
                    }
                    else {
                        dispatch(authFail("Invalid Username or Password"));
                    }
                }
            })
            .catch(err => {
                dispatch(authFail("Invalid Username or Password"));
            });
    };
};

export const authLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('companyId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};


export const checkAuthStatus = () => {
    return dispatch => {
        const userId = localStorage.getItem('userId');
        const companyId = localStorage.getItem('companyId');
        if (userId) {
            dispatch(authSuccess(userId, companyId));
        }
    }
}