import { AuthActionTypes, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, User } from "./Types";

export interface AuthState {
    isAuthenticated: boolean;
    user: null | User;
    error: string
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    error: ''
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                error: ''
            };
        case LOGIN_FAILURE: {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: action.payload.error
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: ''
            };
        }
        default:
            return state;
    }
}

export default authReducer;
