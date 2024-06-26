import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/home'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

import './App.css'

function App() {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </HelmetProvider>
    )
}

export default App
