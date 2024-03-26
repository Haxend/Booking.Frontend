import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { Component, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';

const client = axios.create({
    baseURL: 'http://localhost:5230/',
});

export function LoginPage() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const editLogin = (e: any) => {
        setLogin(e.target.value);
    }

    const editPassword = (e: any) => {
        setPassword(e.target.value);
    }

    const navigate = useNavigate();

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

            console.log('ответ: ' + JSON.stringify(response));
            console.log('ответ: ' + response.data.accessToken);
            localStorage.setItem('id_token', response.data.accessToken);
            axios.defaults.headers.common = { 'Authorization': `Bearer ${response.data.accessToken}` }
            alert('Успешно залогинен на сервере под логином ' + login);

            if (response.data.role === 'Admin')
                navigate('/login');
            else
                navigate('/');

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

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column" style={{ width: '30%' }}>

            <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' onChange={editLogin} />
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={editPassword} />

            <div className="d-flex justify-content-center mx-3 mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                {/* todo: Страница восстановление пароля */}
                {/* <a href="!#">Forgot password?</a> */}
            </div>

            <MDBBtn className="mb-4 btn btn-primary" onClick={() => loginAsync(login, password)}>Login</MDBBtn>

            <div className="text-center">
                <p>Not a member? <a href="#!">Register</a></p>
            </div>

        </MDBContainer>
    )
}