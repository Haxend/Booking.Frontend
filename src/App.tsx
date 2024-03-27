import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LoginPage } from './Components/Pages/LoginPage/LoginPage'
import { RegistratePage } from './Components/Pages/RegistratePage/RegistratePage'
import HomePage from './Components/Pages/HomePage/HomePage'
import NavBar from './Components/common/NavBar/NavBar'
import CompanyPage from './Components/Pages/CompanyPage/CompanyPage'

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