import { useState, useEffect } from 'react';
import { ChevronDown, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosClient';

export default function AppliedJobs() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get('/applications/my');
        setApplications(res.data.payload || []);
      } catch (err) {
        console.error("Failed to load applications:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getStatusBadge = (status) => {
    const normStatus = status?.toLowerCase();
    switch (normStatus) {
      case 'pending': return 'badge-warning';
      case 'interview': return 'badge-info';
      case 'accepted': case 'hired': return 'badge-success';
      case 'rejected': return 'badge-danger';
      default: return 'badge-secondary';
    }
  };

  const toggleExpand = (id) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
    }
  };

  if (isLoading) return <div style={{ padding: '24px' }}>Loading your applications...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Applied Jobs</h1>
          <p style={{ color: 'var(--text-muted)' }}>Track the status of all your submitted job applications.</p>
        </div>
        <Link to="/jobseeker/jobs" className="btn-primary" style={{ textDecoration: 'none' }}>Search new jobs</Link>
      </div>

      <div className="glass-panel animate-slide-up" style={{ padding: '0', overflow: 'hidden' }}>
        {applications.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
            You haven't applied to any jobs yet. <Link to="/jobseeker/jobs" style={{ color: 'var(--primary-main)' }}>Browse jobs</Link>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--glass-bg)', borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Role</th>
                <th style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Date Applied</th>
                <th style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.2s', display: 'flex', flexDirection: 'column' }} className="hover-row">
                  
                  <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                    <td style={{ padding: '20px 24px', flex: 2 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--bg-color-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--glass-border)' }}>
                          <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary-main)' }}>
                            {app.jobId?.title?.charAt(0) || 'J'}
                          </span>
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--text-dark)', marginBottom: '4px' }}>{app.jobId?.title || 'Unknown Job'}</div>
                          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{app.jobId?.location || 'Remote'}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px', flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-muted)' }}>
                        <Clock size={14} /> {new Date(app.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px', flex: 1 }}>
                      <span className={`badge ${getStatusBadge(app.status || 'pending')}`}>
                        {(app.status || 'pending').toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '20px 24px', textAlign: 'right', flex: 1 }}>
                      <button 
                        onClick={() => toggleExpand(app._id)}
                        className="btn-secondary" 
                        style={{ padding: '6px 12px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px', border: '1px solid var(--glass-border)', background: 'transparent' }}
                      >
                        {expandedRow === app._id ? 'Close' : 'View Job'} <ChevronDown size={14} style={{ transform: expandedRow === app._id ? 'rotate(180deg)' : 'none', transition: 'all 0.2s' }} />
                      </button>
                    </td>
                  </div>

                  {expandedRow === app._id && (
                    <div className="animate-fade-in" style={{ padding: '20px 24px', background: 'var(--bg-color-light)', borderTop: '1px solid var(--glass-border)' }}>
                      <h4 style={{ margin: '0 0 12px 0', fontSize: '15px' }}>Job Profile Details</h4>
                      <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: 'var(--text-dark)', lineHeight: '1.6' }}>
                        {app.jobId?.description || 'No description provided by the employer.'}
                      </p>
                      <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
                        <div>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Job Type</span>
                          <strong style={{ fontSize: '13px', color: 'var(--primary-main)' }}>{(app.jobId?.jobType || 'Standard').toUpperCase()}</strong>
                        </div>
                        <div>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Salary</span>
                          <strong style={{ fontSize: '13px', color: 'var(--primary-main)' }}>{app.jobId?.salary ? `$${app.jobId.salary}` : 'Competitive / Not Disclosed'}</strong>
                        </div>
                      </div>
                    </div>
                  )}

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
