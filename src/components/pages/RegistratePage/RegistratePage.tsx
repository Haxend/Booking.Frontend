import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { Component, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';

const client = axios.create({
    baseURL: 'http://localhost:5230/api/',
});

export function RegistratePage() {
    const [email, setEmail] = useState("")
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const editEmail = (e: any) => {
        setEmail(e.target.value);
    }

    const editLogin = (e: any) => {
        setLogin(e.target.value);
    }

    const editPassword = (e: any) => {
        setPassword(e.target.value);
    }

    const editFirstName = (e: any) => {
        setFirstName(e.target.value);
    }

    const editMiddle = (e: any) => {
        setMiddleName(e.target.value);
    }

    const editLastName = (e: any) => {
        setLastName(e.target.value);
    }

    const editPhoneNumber = (e: any) => {
        setPhoneNumber(e.target.value);
    }

    const navigate = useNavigate();

    // Асинхронная функция регистрации
    async function registrateAsync(
        email: string,
        login: string,
        password: string,
        firstName: string,
        middleName: string,
        lastName: string,
        phoneNumber: string
    ) {
        const config: AxiosRequestConfig = {
            headers: {
                'Accept': 'trext/plain',
            } as RawAxiosRequestHeaders,
        };

        try {
            const data = { 
                'Email': email, 
                'Login': login,
                'Password': password,
                'FirstName': firstName, 
                'MiddleName': middleName,
                'LastName': lastName,
                'PhoneNumber': phoneNumber
            };
            const response: AxiosResponse = await client.post(`clients`, data, config);
            alert('Регистрация пользователя ' + login + ' успешно!');
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

            <MDBInput wrapperClass='mb-4' label='Login' id='form1' type='login' onChange={editLogin} />
            <MDBInput wrapperClass='mb-4' label='Email' id='form2' type='email' onChange={editEmail} />
            <MDBInput wrapperClass='mb-4' label='Password' id='form3' type='password' onChange={editPassword} />
            <MDBInput wrapperClass='mb-4' label='Имя' id='form4' type='firstname' onChange={editFirstName} />
            <MDBInput wrapperClass='mb-4' label='Фамилия' id='form5' type='lastname' onChange={editLastName} />
            <MDBInput wrapperClass='mb-4' label='Отчество' id='form6' type='middlename' onChange={editMiddle} />
            <MDBInput wrapperClass='mb-4' label='Номер телефона' id='form7' type='phonenumber' onChange={editPhoneNumber} />

            <div className="d-flex justify-content-betwen mx-3 mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Согласен с обработкой данных' />
            </div>

            <MDBBtn className="mb-4 btn btn-primary" onClick={() => registrateAsync(email, login, password, firstName, middleName, lastName, phoneNumber)}>Зарегестрироватся</MDBBtn>
        </MDBContainer>
    )
}

