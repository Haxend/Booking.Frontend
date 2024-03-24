import React, { useEffect, useState } from "react"
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface Comnpany {
    id: number;
    Name: string;
    Description: string;
}

function CompanyList() {
    const [companies, setCompanies] = useState<Comnpany[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get('/api/companies'); // Замените '/api/companies' на ваш эндпоинт
                setCompanies(response.data);
                setLoading(false);
            } catch (error) {
                setError('Ошибка при загрузке товаров.');
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
                <div>
                    {companies.map(company => (
                        <Card key={company.id} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="" onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = "notfoundimage.jpg";
                            }} />
                            < Card.Body >
                                <Card.Title>{company.Name}</Card.Title>
                                <Card.Text>{company.Description}
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