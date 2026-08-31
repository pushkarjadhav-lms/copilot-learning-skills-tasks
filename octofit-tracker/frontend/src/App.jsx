import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function Home() {
  return (
    <main className="container py-5">
      <div className="card shadow-sm border-0">
        <div className="card-body text-center p-5">
          <span className="badge bg-primary-subtle text-primary mb-3">Fitness tracking</span>
          <h1 className="display-5 fw-bold mb-3">OctoFit Tracker</h1>
          <p className="lead text-muted mb-4">
            Track workouts, compete with teammates, and stay motivated with your fitness goals.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button className="btn btn-primary btn-lg">View leaderboard</button>
            <button className="btn btn-outline-primary btn-lg">Log activity</button>
          </div>
        </div>
      </div>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
