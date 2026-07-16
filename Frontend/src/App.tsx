import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ReaderPage from './pages/ReaderPage'
import HomePage from './pages/HomePage'
import type { comic } from './types/comic'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/reader" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reader" element={<ReaderPage comic={demoComic} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

const demoComic: comic = {
  id: "1",
  title: "One Piece",
  cover: "https://picsum.photos/300/450?random=1",
  pages: 30,
};