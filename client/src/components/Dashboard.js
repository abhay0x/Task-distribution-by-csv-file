import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [tasksByAgent, setTasksByAgent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await fetch('/tasks-by-agent');
      const data = await res.json();
      setTasksByAgent(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch tasks');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <React.Fragment>
  <div class="navbar">
                  <div class="logo">Assignment</div>
                  <div> 
                      <a href="/Dashboard">Dashboard</a>
                      <a href="/agent">Add agent</a>
                      <a href="/upload">Upload CSV</a>
                      
                  </div>
                  <div class="auth-buttons">
                     
                  </div>
                  </div>

    <div style={{ padding: '30px' }}>
      <h2>Task Dashboard</h2>

      {Object.keys(tasksByAgent).length === 0 ? (
        <p>No tasks assigned yet.</p>
      ) : (
        Object.entries(tasksByAgent).map(([agentName, tasks], idx) => (
          <div key={idx} style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h3>{agentName}</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>First Name</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, taskIdx) => (
                  <tr key={taskIdx}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.firstName}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.phone}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
         
        ))
      )}
    </div>
     </React.Fragment>
  );
};

export default Dashboard;






