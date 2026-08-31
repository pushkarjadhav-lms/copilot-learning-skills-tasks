import { useEffect, useState } from 'react';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
    const apiUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
      : 'http://localhost:8000/api/workouts/';

    fetch(apiUrl)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const payload = await response.json();
        const data = Array.isArray(payload)
          ? payload
          : Array.isArray(payload.results)
            ? payload.results
            : Array.isArray(payload.items)
              ? payload.items
              : Array.isArray(payload.data)
                ? payload.data
                : [];

        if (active) {
          setWorkouts(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || 'Unable to load workouts.');
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <section className="card shadow-sm border-0 mt-4">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Duration</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-muted text-center">
                    No workouts found.
                  </td>
                </tr>
              ) : (
                workouts.map((workout) => (
                  <tr key={workout._id || workout.id || workout.name}>
                    <td>{workout.name}</td>
                    <td>{workout.category}</td>
                    <td>{workout.duration} min</td>
                    <td className="text-capitalize">{workout.difficulty || 'beginner'}</td>
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
