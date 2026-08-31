import { useEffect, useState } from 'react';
import { fetchApiCollection } from '../api.js';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchApiCollection('users')
      .then((data) => {
        if (active) {
          setUsers(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || 'Unable to load users.');
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) return <div className="alert alert-info">Loading users...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <section className="card shadow-sm border-0 mt-4">
      <div className="card-body">
        <h2 className="h4 mb-3">Users</h2>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Goal</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-muted text-center">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id || user.id || user.username}>
                    <td>{user.username}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.fitnessGoal || 'Stay active'}</td>
                    <td>{user.team || 'Solo'}</td>
                    <td>{user.points ?? 0}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
