import { useState } from 'react';
import { Edit2, MoreVertical, Trash2, Eye } from 'lucide-react';

export default function ManageJobs() {
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Senior Frontend Developer', type: 'Full-time', location: 'Remote', applicants: 45, status: 'Active', posted: '2 days ago' },
    { id: 2, title: 'Backend Node.js Engineer', type: 'Contract', location: 'New York, NY', applicants: 12, status: 'Active', posted: '1 week ago' },
    { id: 3, title: 'UX/UI Designer', type: 'Part-time', location: 'San Francisco, CA', applicants: 89, status: 'Closed', posted: '1 month ago' },
  ]);

  const toggleStatus = (id) => {
    setJobs(jobs.map(j => {
      if (j.id === id) {
        return { ...j, status: j.status === 'Active' ? 'Closed' : 'Active' };
      }
      return j;
    }));
  };

  return (
    <div>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Manage Jobs</h1>
          <p style={{ color: 'var(--text-muted)' }}>View, edit or close your active job postings.</p>
        </div>
        <button className="btn-primary">+ Post New Job</button>
      </div>

      <div className="glass-panel animate-slide-up" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--glass-bg)', borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Job Title</th>
              <th style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Applicants</th>
              <th style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Posted</th>
              <th style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job.id} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.2s' }} className="hover-row">
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-dark)', marginBottom: '4px' }}>{job.title}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{job.type} • {job.location}</div>
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <span className={`badge ${job.status === 'Active' ? 'badge-success' : 'badge-warning'}`} style={{ cursor: 'pointer' }} onClick={() => toggleStatus(job.id)}>
                    {job.status}
                  </span>
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ fontWeight: 600 }}>{job.applicants}</div>
                    <span style={{ fontSize: '12px', color: 'var(--primary-main)' }}>view</span>
                  </div>
                </td>
                <td style={{ padding: '20px 24px', fontSize: '14px', color: 'var(--text-muted)' }}>
                  {job.posted}
                </td>
                <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><Eye size={18} /></button>
                    <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><Edit2 size={18} /></button>
                    <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
