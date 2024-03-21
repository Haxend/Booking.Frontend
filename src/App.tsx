import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSelector } from 'react-redux'
import { LoginPage } from './components/pages/LoginPage/LoginPage'
import { RegistratePage } from './components/pages/RegistratePage/RegistratePage'
import HomePage from './components/pages/HomePage/HomePage'
import { AdminPage } from './components/pages/AdminPage/AdminPage'
import NavBar from './components/common/NavBar/NavBar';

function App() {
    const queryClient = new QueryClient()  

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
            <NavBar/>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/admin' element={<AdminPage />} />
                    <Route path='/regist' element={<RegistratePage />} />
                    {/* <Route path='/user' element={<UserPage />} /> */}
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
  )
}

export default App
