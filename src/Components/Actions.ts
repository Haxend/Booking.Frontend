import { Dispatch } from 'redux';
import { AuthActionTypes, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from './Types';

export const loginAction = (username: string, password: string) => {
    return async (dispatch: Dispatch<AuthActionTypes>) => {
        try {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: { id: 1, username: username } },
            });
        } catch (error) {
            dispatch({
                type: LOGIN_FAILURE,
                payload: { error: 'Ошибка.' },
            });
        }
    };
};

export const logoutAction = () => {
    return async (dispatch: Dispatch<AuthActionTypes>) => {
        dispatch({
            type: LOGOUT,
        });
    };
};

export const registerAction = (username: string) => {
    return async (dispatch: Dispatch<AuthActionTypes>) => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: { id: 2, username: username } },
        });
    };
};
