import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LoginPage } from './components/pages/LoginPage/LoginPage'
import { RegistratePage } from './components/pages/RegistratePage/RegistratePage'
import HomePage from './components/pages/HomePage/HomePage'
import NavBar from './components/common/NavBar/NavBar'
import CompanyPage from './components/pages/CompanyPage/CompanyPage'

function App() {
    const queryClient = new QueryClient()  

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
            <NavBar/>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/regist' element={<RegistratePage />} />
                    <Route path=':compId' element={<CompanyPage />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
  )
}

export default App