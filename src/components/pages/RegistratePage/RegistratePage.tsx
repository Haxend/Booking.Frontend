import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { Component } from "react";
import { useNavigate } from 'react-router-dom';

interface RegistrateFormState {
    email: string;
    login: string;
    password: string;
    firstname: string;
    middlename: string;
    lastname: string;
    phonenumber: string;
}

const client = axios.create({
    baseURL: 'http://localhost:5230/',
});

// Асинхронная функция регистрации
async function registrateAsync(
    email: string, 
    login: string, 
    password: string, 
    firstname: string, 
    middlename: string, 
    lastname: string,
    phonenumber: string
    ) {
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

export class RegistratePage extends Component<{}, RegistrateFormState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            login: "",
            password: "",
            firstname: "",
            middlename: "",
            lastname: "",
            phonenumber: "",
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
            <div className="w-50">
                <form className="card p-4 mt-4 d-flex align-items-center justify-content-center">
                    <div className="mb-3 gap-1 d-flex">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="text"
                            name="email"
                            placeholder="" />
                    </div>
                    <div className="mb-3 gap-1 d-flex">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password"
                            name="password"
                            placeholder="" />
                    </div>
                    <div className="mb-3 gap-1 d-flex">
                        <label htmlFor="exampleInputFirstname1" className="form-label">Имя</label>
                        <input type="firstname"
                            name="firstname"
                            placeholder="" />
                    </div>
                    <div className="mb-3 gap-1 d-flex">
                        <label htmlFor="exampleInputLastname1" className="form-label">Фамилия</label>
                        <input type="lastname"
                            name="lastname"
                            placeholder="" />
                    </div>
                    <div className="mb-3 gap-1 d-flex">
                        <label htmlFor="exampleInputMiddlename1" className="form-label">Отчество</label>
                        <input type="middlename"
                            name="middlename"
                            placeholder="" />
                    </div>
                    <div className="mb-3 gap-1 d-flex">
                        <label htmlFor="exampleInputPhonenumber1" className="form-label">Номер телефона</label>
                        <input type="phonenumber"
                            name="phonenumber"
                            placeholder="" />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={() => 
                        registrateAsync(
                            this.state.email, 
                            this.state.login,
                            this.state.password,
                            this.state.firstname,
                            this.state.middlename,
                            this.state.lastname,
                            this.state.phonenumber,)}>Зарегестрироваться</button>
                </form>
            </div>
        </div>
    }
}

