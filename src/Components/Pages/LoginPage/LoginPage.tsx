import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { Component } from "react";
import '../LoginPage/LoginPage.scss'

interface LoginFormState {
    login: string;
    password: string;
}

const client = axios.create({
    baseURL: 'http://localhost:5230/',
});

// Асинхронная функция логина
async function loginAsync(login: string, password: string) {
    const config: AxiosRequestConfig = {
        headers: {
            'Accept': 'application/json',
        } as RawAxiosRequestHeaders,
    };

    try {
        const data = { 'email': login, 'password': password };
        const response: AxiosResponse = await client.post(`auth`, data, config);

        console.log('ответ: '+JSON.stringify(response));   
        console.log('ответ: ' + response.data.accessToken);
        localStorage.setItem('id_token', response.data.accessToken);
        axios.defaults.headers.common = { 'Authorization': `Bearer ${response.data.accessToken}` }
        alert('Успешно залогинен на сервере под логином ' + login);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response != null)
                alert((err.response.data));
            else if (err.code === 'ERR_NETWORK')
                alert('Сервер недоступен');
            else
                alert('Непонятная ошибка');
        } else {
            alert('handleUnexpectedError(' + err + ')');
        }
    }

}

// Синхронная функция логина
function login(login: string, password: string) {
    const config: AxiosRequestConfig = {
        headers: {
            'Accept': 'application/json',
        } as RawAxiosRequestHeaders,
    };
    const data = { 'email': login, 'password': password }
    console.log(data);
    client.post('auth', data, config)
        .then((response) => {
            console.log(response.status);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
            alert('error login on backend' + error);
        });
}

export class LoginPage extends Component<{}, LoginFormState> {
    constructor(props: any) {
        super(props);
        this.state = {
            login: "",
            password: ""
        };
    }

    setLogin = (e: any) => {
        this.setState({ login: e.target.value });
    }

    setPassword = (e: any) => {
        this.setState({ password: e.target.value });
    }

    render() {

        return <div className="container">
            <div className="form">
                <div className="login-form">

                    <input type="text"
                        name="username"
                        placeholder="Username"
                        onChange={this.setLogin} />
                    <input type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.setPassword} />

                    <button className="btn" onClick={() => loginAsync(this.state.login, this.state.password)}>Login</button>

                </div>
            </div>
        </div>
    }
}