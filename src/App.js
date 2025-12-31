import React, { useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import MenuPage from './pages/MenuPage';
import BookingPage from './pages/BookingPage';
import OrderOnlinePage from './pages/OrderOnlinePage';
import LoginPage from './pages/LoginPage';
import './App.css';

/**
 * Initialize available times for today's date
 * @returns {Array} Array of available booking times
 */
export function initializeTimes() {
  const today = new Date();
  const dateString = today.toISOString().split('T')[0];
  
  // Use fetchAPI if available, otherwise return empty array
  if (typeof window !== 'undefined' && window.fetchAPI) {
    return window.fetchAPI(dateString);
  }
  
  // Fallback: return default times if API is not available
  return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
}

/**
 * Update available times based on selected date
 * @param {Array} state - Current available times
 * @param {string} action - Action object containing the selected date
 * @returns {Array} Updated array of available booking times
 */
export function updateTimes(state, action) {
  const selectedDate = action.date;
  
  // Use fetchAPI if available
  if (typeof window !== 'undefined' && window.fetchAPI) {
    return window.fetchAPI(selectedDate);
  }
  
  // Fallback: return the same state if API is not available
  return state;
}

function App() {
  const [availableTimes, dispatch] = useReducer(updateTimes, null, initializeTimes);

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route 
              path="/booking" 
              element={
                <BookingPage 
                  availableTimes={availableTimes} 
                  dispatch={dispatch} 
                />
              } 
            />
            <Route path="/order-online" element={<OrderOnlinePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
