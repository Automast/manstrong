import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AppForm from '../components/AppForm'; // We will create this component next
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const response = await api.getApps();
      setApps(response.data);
    } catch (error) {
      console.error('Error fetching apps:', error);
      alert('Failed to fetch apps.');
    }
  };

  const handleDelete = async (appId) => {
    if (window.confirm('Are you sure you want to delete this app?')) {
      try {
        await api.deleteApp(appId);
        setApps(apps.filter((app) => app._id !== appId));
        alert('App deleted successfully!');
      } catch (error) {
        console.error('Error deleting app:', error);
        alert('Failed to delete app.');
      }
    }
  };

  const handleEdit = (app) => {
    setSelectedApp(app);
    setIsFormVisible(true);
  };

  const handleAddNew = () => {
    setSelectedApp(null); // Clear selection for a new entry
    setIsFormVisible(true);
  };

  const handleFormSuccess = () => {
    setIsFormVisible(false);
    setSelectedApp(null);
    fetchApps(); // Refresh the list after add/edit
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>App Management</h1>
        <button onClick={handleAddNew} className="btn btn-primary">Add New App</button>
      </div>

      {isFormVisible && (
        <AppForm
          app={selectedApp}
          onSuccess={handleFormSuccess}
          onCancel={() => setIsFormVisible(false)}
        />
      )}

      <div className="app-list">
        <h2>Existing Apps</h2>
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Name</th>
              <th>Trending</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => (
              <tr key={app._id}>
                <td>{app.order}</td>
                <td>{app.name}</td>
                <td>{app.isTrending ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => handleEdit(app)} className="btn btn-secondary">Edit</button>
                  <button onClick={() => handleDelete(app._id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
