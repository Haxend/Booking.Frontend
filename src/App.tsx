import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSelector } from 'react-redux'
import { LoginPage } from './Components/Pages/LoginPage/LoginPage'
import HomePage from './Components/Pages/HomePage/HomePage'
import './App.css'

function App() {
    const queryClient = new QueryClient()  

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                {/*<div>*/}
                {/*    <nav>*/}
                {/*        <ul>*/}
                {/*            <li>*/}
                {/*                <Link to={'/'}>Example</Link>*/}
                {/*            </li>*/}

                {/*        </ul>*/}
                {/*    </nav>*/}
                {/*</div>*/}

                <Routes>
                    <Route path='/' element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
  )
}

export default App
