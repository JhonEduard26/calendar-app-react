import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CalendarScreen />} />
        <Route path='login' element={<LoginScreen />} />
        <Route path='*' element={<h1>Error 404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}
