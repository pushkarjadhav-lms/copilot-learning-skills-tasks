import { useEffect, useState } from 'react';
import { fetchApiCollection } from '../api.js';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchApiCollection('teams')
      .then((data) => {
        if (active) {
          setTeams(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || 'Unable to load teams.');
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) return <div className="alert alert-info">Loading teams...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <section className="card shadow-sm border-0 mt-4">
      <div className="card-body">
        <h2 className="h4 mb-3">Teams</h2>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Captain</th>
                <th>Members</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-muted text-center">
                    No teams found.
                  </td>
                </tr>
              ) : (
                teams.map((team) => (
                  <tr key={team._id || team.id || team.name}>
                    <td>{team.name}</td>
                    <td>{team.captain}</td>
                    <td>{Array.isArray(team.members) ? team.members.length : 0}</td>
                    <td>{team.points ?? 0}</td>
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
