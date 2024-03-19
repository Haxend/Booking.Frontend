import { Component } from "react";
import { useNavigate } from 'react-router-dom';

export function HomePage() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
      };

    return <div className="container">
        <div className="form">
            <button onClick={handleClick}>Логин</button>
        </div>
    </div>
}