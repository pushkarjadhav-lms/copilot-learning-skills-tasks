import { useEffect, useState } from 'react';
import { fetchApiCollection } from '../api.js';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchApiCollection('leaderboard')
      .then((data) => {
        if (active) {
          setEntries(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || 'Unable to load leaderboard.');
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <section className="card shadow-sm border-0 mt-4">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-muted text-center">
                    No leaderboard entries found.
                  </td>
                </tr>
              ) : (
                entries.map((entry) => (
                  <tr key={entry._id || entry.id || entry.username}>
                    <td>{entry.rank ?? 1}</td>
                    <td>{entry.username}</td>
                    <td>{entry.team || 'Solo'}</td>
                    <td>{entry.points ?? 0}</td>
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
