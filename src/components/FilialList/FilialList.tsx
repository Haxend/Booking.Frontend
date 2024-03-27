import React, { useEffect, useState } from "react"
import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

interface Filial {
    id: number;
    companyId: number;
    name: string;
    address: string;
    description: string;
}

const client = axios.create({
    baseURL: 'http://localhost:5230/',
});

function FilialList() {
    const { compId } = useParams();

    const [filials, setFilials] = useState<Filial[]>([]);
    const [company, setCompany] = useState<Company[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchFilials = async () => {
            try {
                const config: AxiosRequestConfig = {
                    headers: {
                        'Accept': 'text/plain',
                    } as RawAxiosRequestHeaders,
                };
                const response: AxiosResponse = await client.get(`api/companies/` + compId + '/filials?Offset=0&Count=100', config);
                setFilials(response.data.items);
                setLoading(false);
            } catch (error) {
                setError('Ошибка при загрузке.');
                setLoading(false);
            }
        };
        const getCompany = async () => {
            try {
                const config: AxiosRequestConfig = {
                    headers: {
                        'Accept': 'application/json',
                    } as RawAxiosRequestHeaders,
                };
                const response: AxiosResponse = await client.get(`api/companies/` + compId, config);
                setCompany(response.data.items);
                setLoading(false);
            } catch (error) {
                setError('Ошибка при загрузке.');
                setLoading(false);
            }
        };

        // getCompany();
        fetchFilials();
    }, [])

    return (
        <div>
            {loading ? (
                <p>Загрузка...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                // todo: Доверстать страницу
                <div className="d-flex flex-wrap gap-3">
                    {filials.map(filial => 
                    (
                        // todo: Всплывающая окно для бронирования (или отдельная траница)
                        // <Link to={String(fillial.id)}>
                            <Card key={filial.id} style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="" onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = "notfoundimage.jpg";
                                }} />
                                < Card.Body >
                                    <Card.Title>{filial.name}</Card.Title>
                                    <Card.Text>{filial.description}</Card.Text>
                                    <Card.Text>{filial.address}</Card.Text>
                                </Card.Body>
                            </Card>
                        // </Link>
                    ))}
                </div>
            )
            }
        </div >
    )
}

export default FilialList