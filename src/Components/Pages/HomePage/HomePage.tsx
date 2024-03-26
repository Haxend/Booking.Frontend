import { Component } from "react";
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import CompanyList from "../../common/CompanyList/CompanyList";

export default function HomePage() {
    return (
        <div className="container mt-4">
            <CompanyList />
        </div>
    )
}

