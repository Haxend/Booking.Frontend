import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { Component } from "react";
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

    try {
        const data = { 'email': login, 'password': password };
        const response: AxiosResponse = await client.post(`auth`, data, config);

        console.log('ответ: '+JSON.stringify(response));   
        console.log('ответ: ' + response.data.accessToken);
        localStorage.setItem('id_token', response.data.accessToken);
        axios.defaults.headers.common = { 'Authorization': `Bearer ${response.data.accessToken}` }
        alert('Успешно залогинен на сервере под логином ' + login);

        if (response.data.role === 'Admin')
            navigate('/login');
        else
            navigate('/user');

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

        return <div className="container d-flex justify-content-center">
            <div className="w-40">
                <form className="card p-4 mt-4 d-flex align-items-center justify-content-center">
                    <div className="mb-3 gap-1 d-flex">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="text"
                            name="username"
                            placeholder="Username"
                            onChange={this.setLogin} />
                    </div>
                    <div className="mb-3 gap-1 d-flex">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.setPassword} />
                    </div>
                    <button type="submit" className="btn btn-primary w-50" onClick={() => loginAsync(this.state.login, this.state.password)}>Вход</button>
                </form>
            </div>
        </div>
    }
}