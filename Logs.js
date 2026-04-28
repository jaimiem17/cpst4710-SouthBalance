import React, { useEffect, useState } from 'react';

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLogs() {
      try {
        const response = await fetch(
          'http://localhost:8000/logs'
        );

        const data = await response.json();

        setLogs(data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadLogs();
  }, []);

  return (
    <div className="page-container">
      <h1
        style={{
          marginBottom:'25px',
          color:'#2c3e50'
        }}
      >
        Activity Logs
      </h1>

      <div className="card">
        {loading ? (
          <p>Loading logs...</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>User / Source</th>
                <th>Action</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="3">
                    No logs found.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.log_id}>
                    <td>{log.username}</td>

                    <td>{log.action}</td>

                    <td>
                      {new Date(
                        log.created_at
                      ).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        )}
      </div>
    </div>
  );
}