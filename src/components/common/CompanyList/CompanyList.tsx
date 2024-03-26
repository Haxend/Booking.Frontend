import React, { useEffect, useState } from "react"
import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import Card from 'react-bootstrap/Card';

interface Comnpany {
    id: number;
    name: string;
    description: string;
    inn: string;
    mailadress: string;
}

const client = axios.create({
    baseURL: 'http://localhost:5230/',
});

function CompanyList() {
    const [companies, setCompanies] = useState<Comnpany[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const config: AxiosRequestConfig = {
                    headers: {
                        'Accept': 'application/json',
                    } as RawAxiosRequestHeaders,
                };
                const response: AxiosResponse = await client.get(`api/companies?Offset=0&Count=100`, config);
                setCompanies(response.data.items);
                setLoading(false);
            } catch (error) {
                setError('Ошибка при загрузке.');
                setLoading(false);
            }
        };

        fetchCompanies();
    }, [])

    return (
        <div>
            {loading ? (
                <p>Загрузка...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="d-flex flex-wrap gap-3">
                    {companies.map(company => 
                    (
                        <Card key={company.id} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="" onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = "notfoundimage.jpg";
                            }} />
                            < Card.Body >
                                <Card.Title>{company.name}</Card.Title>
                                <Card.Text>{company.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )
            }
        </div >
    )
}

export default CompanyList