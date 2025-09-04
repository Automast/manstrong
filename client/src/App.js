import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

// We will create these page components in the next steps
// import HomePage from './pages/HomePage';
// import AppDetailPage from './pages/AppDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import ReviewManagement from './pages/ReviewManagement';

// Placeholder components for now
const HomePage = () => <h1>Public Home Page</h1>;
const AppDetailPage = () => <h1>App Detail Page</h1>;


function App() {
  return (
    <div className="App">
      <header>
        <nav className="main-nav">
          <Link to="/" className="logo">AppStore</Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/admin">Admin Dashboard</Link>
            <Link to="/admin/reviews">Manage Reviews</Link>
          </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/app/:id" element={<AppDetailPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/reviews" element={<ReviewManagement />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
