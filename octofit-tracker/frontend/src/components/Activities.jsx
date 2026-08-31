import { useEffect, useState } from 'react';
import { fetchApiCollection } from '../api.js';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchApiCollection('activities')
      .then((data) => {
        if (active) {
          setActivities(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || 'Unable to load activities.');
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) return <div className="alert alert-info">Loading activities...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <section className="card shadow-sm border-0 mt-4">
      <div className="card-body">
        <h2 className="h4 mb-3">Activities</h2>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Username</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-muted text-center">
                    No activities found.
                  </td>
                </tr>
              ) : (
                activities.map((activity) => (
                  <tr key={activity._id || activity.id || `${activity.username}-${activity.date}`}>
                    <td>{activity.username}</td>
                    <td>{activity.type}</td>
                    <td>{activity.duration} min</td>
                    <td>{activity.calories ?? 0}</td>
                    <td>{activity.date ? new Date(activity.date).toLocaleDateString() : 'N/A'}</td>
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
