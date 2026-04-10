import { useState } from 'react';
import { Download, CheckCircle, XCircle } from 'lucide-react';

export default function Applicants() {
  const [applicants, setApplicants] = useState([
    { id: 1, name: 'John Doe', role: 'Frontend Developer', matchScore: '95%', applied: '2 days ago', status: 'Pending' },
    { id: 2, name: 'Alice Smith', role: 'UX/UI Designer', matchScore: '88%', applied: '5 days ago', status: 'Accepted' },
    { id: 3, name: 'Bob Johnson', role: 'Frontend Developer', matchScore: '45%', applied: '1 week ago', status: 'Rejected' },
    { id: 4, name: 'Emily Davis', role: 'Backend Node.js Engineer', matchScore: '92%', applied: 'Just now', status: 'Pending' },
  ]);

  const updateStatus = (id, newStatus) => {
    setApplicants(applicants.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Candidate Applications</h1>
        <p style={{ color: 'var(--text-muted)' }}>Review resumes, accept or reject candidates.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {applicants.map((app, index) => (
          <div key={app.id} className={`glass-panel animate-slide-up delay-${(index+1)*100}`} style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-light), var(--primary-dark))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' }}>
                  {app.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{app.name}</h3>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Applied {app.applied}</div>
                </div>
              </div>
              <span className={`badge ${
                app.status === 'Accepted' ? 'badge-success' : 
                app.status === 'Rejected' ? 'badge-danger' : 'badge-warning'
              }`}>
                {app.status}
              </span>
            </div>

            <div style={{ background: 'var(--bg-color-dark)', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>Applied for</div>
              <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-dark)' }}>{app.role}</div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', borderTop: '1px solid var(--glass-border)', paddingTop: '12px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Match Score</span>
                <span style={{ fontWeight: 'bold', color: 'var(--primary-main)' }}>{app.matchScore}</span>
              </div>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
              <button className="btn-secondary" style={{ flex: 1, padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px' }}>
                <Download size={16} /> Resume
              </button>
            </div>

            {app.status === 'Pending' && (
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button 
                  onClick={() => updateStatus(app.id, 'Accepted')}
                  style={{ flex: 1, padding: '8px', background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 600, transition: 'all 0.2s' }}
                >
                  <CheckCircle size={16} /> Accept
                </button>
                <button 
                  onClick={() => updateStatus(app.id, 'Rejected')}
                  style={{ flex: 1, padding: '8px', background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 600, transition: 'all 0.2s' }}
                >
                  <XCircle size={16} /> Reject
                </button>
              </div>
            )}
            
          </div>
        ))}
      </div>
    </div>
  );
}
