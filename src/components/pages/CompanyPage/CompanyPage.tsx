import { Component } from "react";
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import FillialList from "../../FilialList/FilialList";

export default function HomePage() {
    return (
        <div className="container mt-4">
            <FillialList />
        </div>
    )
}

