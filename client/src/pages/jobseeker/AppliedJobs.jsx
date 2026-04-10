import { useState } from 'react';
import { ExternalLink, Clock } from 'lucide-react';

export default function AppliedJobs() {
  const [applications] = useState([
    { id: 1, title: 'Frontend Developer', company: 'Google', applied: 'Oct 24, 2026', status: 'In Review' },
    { id: 2, title: 'React Engineer', company: 'Meta', applied: 'Oct 20, 2026', status: 'Interview' },
    { id: 3, title: 'UI Developer', company: 'Amazon', applied: 'Oct 15, 2026', status: 'Rejected' },
    { id: 4, title: 'Web Developer', company: 'Startup Inc', applied: 'Oct 10, 2026', status: 'Hired' },
  ]);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'In Review': return 'badge-warning';
      case 'Interview': return 'badge-info';
      case 'Hired': return 'badge-success';
      case 'Rejected': return 'badge-danger';
      default: return 'badge-secondary';
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Applied Jobs</h1>
        <p style={{ color: 'var(--text-muted)' }}>Track the status of all your submitted job applications.</p>
      </div>

      <div className="glass-panel animate-slide-up" style={{ padding: '0', overflow: 'hidden' }}>
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
              <tr key={app.id} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.2s' }} className="hover-row">
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--bg-color-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--glass-border)' }}>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary-main)' }}>{app.company.charAt(0)}</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-dark)', marginBottom: '4px' }}>{app.title}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{app.company}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-muted)' }}>
                    <Clock size={14} /> {app.applied}
                  </div>
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <span className={`badge ${getStatusBadge(app.status)}`}>
                    {app.status}
                  </span>
                </td>
                <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                  <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    View Job <ExternalLink size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
