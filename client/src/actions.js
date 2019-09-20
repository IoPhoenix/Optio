import {
    LOGOUT,
    FETCH_USER_DATA_SUCCESS,
    FETCH_USERS_SUCCESS,
    ADD_NEW_LIST,
    ADD_NEW_POLL,
    API_REQUEST_FAILURE,
    REGISTER_VOTE_SUCCESS,
    GET_FRIENDS_POLLS_SUCCESS
} from "./constants.js";

import fetchDataAPI from "./api/fetchDataAPI";
import postDataAPI from "./api/postDataAPI";

export const loadUserData = data => dispatch => {
    return fetchDataAPI
        .fetchUserData(data)
        .then(response => {
            dispatch(fetchUserDataSuccess(response));
        })
        .catch(error => {
            dispatch(apiRequestFailure(error));
        });
};

export const loadUsers = id => dispatch => {
    return fetchDataAPI
        .fetchUsers(id)
        .then(response => {
            dispatch(fetchUsersSuccess(response, id));
        })
        .catch(error => {
            dispatch(apiRequestFailure(error));
        });
};

export const getFriendsPolls = data => dispatch => {
    return fetchDataAPI
        .fetchFriendsPolls(data)
        .then(response => {
            dispatch(getFriendsPollsSuccess(response));
        })
        .catch(error => {
            dispatch(apiRequestFailure(error));
        });
};

export const registerVote = data => dispatch => {
    return postDataAPI
        .registerVote(data)
        .then(response => {
            dispatch(registerVoteSuccess(response));
        })
        .catch(error => {
            dispatch(apiRequestFailure(error));
        });
};

export function fetchUsersSuccess(response, id) {
    return {
        type: FETCH_USERS_SUCCESS,
        response,
        id
    };
}

export function getFriendsPollsSuccess(response) {
    return {
        type: GET_FRIENDS_POLLS_SUCCESS,
        response
    };
}

export function fetchUserDataSuccess(response) {
    return {
        type: FETCH_USER_DATA_SUCCESS,
        response
    };
}

export function registerVoteSuccess(response) {
    return {
        type: REGISTER_VOTE_SUCCESS,
        response
    };
}

export function addNewList(data) {
    return {
        type: ADD_NEW_LIST,
        data
    };
}

export function addNewPoll(data) {
    return {
        type: ADD_NEW_POLL,
        data
    };
}

export const logOut = () => {
    return {
        type: LOGOUT
    };
};

export function apiRequestFailure(error) {
    return {
        type: API_REQUEST_FAILURE,
        error
    };
}