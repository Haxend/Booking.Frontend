export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export interface User {
    id: number;
    username: string;
}
interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: { user: User };
}
interface LoginFailureAction {
    type: typeof LOGIN_FAILURE;
    payload: { error: string };
}
interface LogoutAction {
    type: typeof LOGOUT;
}
export type AuthActionTypes = LoginSuccessAction | LoginFailureAction | LogoutAction;