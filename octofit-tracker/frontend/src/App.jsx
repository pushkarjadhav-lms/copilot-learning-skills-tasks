import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import './App.css';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/users', label: 'Users' },
  { to: '/activities', label: 'Activities' },
  { to: '/teams', label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function Home() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const apiTarget = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';

  return (
    <main className="container py-5">
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body text-center p-5">
          <span className="badge bg-primary-subtle text-primary mb-3">Fitness tracking</span>
          <h1 className="display-5 fw-bold mb-3">OctoFit Tracker</h1>
          <p className="lead text-muted mb-4">
            Track workouts, compete with teammates, and stay motivated with your fitness goals.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap mb-3">
            <NavLink to="/leaderboard" className="btn btn-primary btn-lg">
              View leaderboard
            </NavLink>
            <NavLink to="/activities" className="btn btn-outline-primary btn-lg">
              Log activity
            </NavLink>
          </div>
          <div className="small text-muted">API target: {apiTarget}</div>
        </div>
      </div>
    </main>
  );
}

function AppLayout() {
  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container">
          <span className="navbar-brand me-4">OctoFit</span>
          <div className="navbar-nav flex-row flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded ${isActive ? 'active bg-primary-subtle text-primary' : 'text-light'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return <AppLayout />;
}

export default App;
