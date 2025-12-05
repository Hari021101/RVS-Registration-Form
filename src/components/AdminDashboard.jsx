import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import * as XLSX from 'xlsx';
import './AdminDashboard.css';

function AdminDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  // Fetch all registrations from Firebase
  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'registrations'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setRegistrations(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      setLoading(false);
      alert('Error loading registrations. Please check console.');
    }
  };

  // Delete a registration
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      try {
        await deleteDoc(doc(db, 'registrations', id));
        setRegistrations(registrations.filter(reg => reg.id !== id));
        alert('Registration deleted successfully!');
      } catch (error) {
        console.error('Error deleting:', error);
        alert('Error deleting registration');
      }
    }
  };

  // Export all registrations to Excel
  const exportToExcel = () => {
    if (registrations.length === 0) {
      alert('No data to export');
      return;
    }

    // Prepare data for Excel
    const excelData = registrations.map(reg => {
      const { id, timestamp, ...data } = reg;
      return {
        'Submission Date': timestamp ? new Date(timestamp.seconds * 1000).toLocaleString() : 'N/A',
        ...data
      };
    });

    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    ws['!cols'] = [{ wch: 20 }].concat(Array(Object.keys(excelData[0]).length - 1).fill({ wch: 25 }));

    XLSX.utils.book_append_sheet(wb, ws, 'All Registrations');

    // Download
    XLSX.writeFile(wb, `RVS_All_Registrations_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // Filter registrations
  const filteredRegistrations = registrations.filter(reg => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      reg.name?.toLowerCase().includes(searchLower) ||
      reg.personalEmail?.toLowerCase().includes(searchLower) ||
      reg.phoneNumber?.includes(searchTerm);

    return matchesSearch;
  });

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Loading registrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        {/* Header */}
        <div className="admin-header">
          <div className="admin-title">
            <h1>📊 Admin Dashboard</h1>
            <p>RVS Team Member Registrations</p>
          </div>
          <div className="admin-actions">
            <button className="btn btn-refresh" onClick={fetchRegistrations}>
              🔄 Refresh
            </button>
            <button className="btn btn-export" onClick={exportToExcel}>
              📥 Export All to Excel
            </button>
            <Link to="/" className="btn btn-secondary">
              📝 Registration Form
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>{registrations.length}</h3>
              <p>Total Registrations</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <h3>{registrations.filter(r => {
                const date = r.timestamp ? new Date(r.timestamp.seconds * 1000) : null;
                return date && date.toDateString() === new Date().toDateString();
              }).length}</h3>
              <p>Today</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>{filteredRegistrations.length}</h3>
              <p>Filtered Results</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Registrations List */}
        {filteredRegistrations.length === 0 ? (
          <div className="empty-state">
            <h2>📋 No registrations found</h2>
            <p>
              {searchTerm ? 'Try a different search term' : 'Registrations will appear here once submitted'}
            </p>
          </div>
        ) : (
          <div className="registrations-grid">
            {filteredRegistrations.map((registration) => (
              <div key={registration.id} className="registration-card">
                <div className="card-header">
                  <div className="card-title">
                    <h3>👤 {registration.name || 'No Name'}</h3>
                    <span className="card-date">
                      {registration.timestamp 
                        ? new Date(registration.timestamp.seconds * 1000).toLocaleDateString()
                        : 'Unknown Date'
                      }
                    </span>
                  </div>
                  <button 
                    className="btn-delete" 
                    onClick={() => handleDelete(registration.id)}
                    title="Delete registration"
                  >
                    🗑️
                  </button>
                </div>

                <div className="card-body">
                  <div className="info-row">
                    <span className="info-label">📧 Email:</span>
                    <span className="info-value">{registration.personalEmail || 'N/A'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">📱 Phone:</span>
                    <span className="info-value">{registration.phoneNumber || 'N/A'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">🎂 Age:</span>
                    <span className="info-value">{registration.age || 'N/A'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">🎓 Education:</span>
                    <span className="info-value">{registration.ug_degree || 'N/A'}</span>
                  </div>

                  <details className="view-more">
                    <summary>View Full Details</summary>
                    <div className="full-details">
                      {Object.entries(registration)
                        .filter(([key]) => key !== 'id' && key !== 'timestamp')
                        .map(([key, value]) => (
                          value && (
                            <div key={key} className="detail-row">
                              <strong>{formatLabel(key)}:</strong>
                              <span>{value}</span>
                            </div>
                          )
                        ))
                      }
                    </div>
                  </details>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
