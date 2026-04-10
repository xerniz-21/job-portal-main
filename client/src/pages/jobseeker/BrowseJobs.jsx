import { Search, Filter, MapPin, DollarSign, Clock, Briefcase } from 'lucide-react';

export default function BrowseJobs() {
  const jobs = [
    { title: 'Frontend Developer', company: 'Google', location: 'Mountain View, CA', type: 'Full-time', salary: '$140k - $180k', posted: '2 days ago' },
    { title: 'Product Designer', company: 'Airbnb', location: 'Remote', type: 'Contract', salary: '$90/hr', posted: '5 hours ago' },
    { title: 'Backend Engineer (Node.js)', company: 'Netflix', location: 'Los Gatos, CA', type: 'Full-time', salary: '$160k - $210k', posted: '1 day ago' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px' }}>
      
      {/* Filtering Sidebar */}
      <div className="glass-panel animate-slide-up delay-100" style={{ padding: '24px', height: 'fit-content', position: 'sticky', top: '100px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <Filter size={20} className="glow-text" />
          <h3 style={{ margin: 0 }}>Filters</h3>
        </div>

        <div className="form-group">
          <label className="form-label" style={{ fontSize: '13px' }}>Job Type</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
            {['Full-time', 'Part-time', 'Contract', 'Freelance'].map(type => (
              <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: 'var(--primary-main)' }} />
                {type}
              </label>
            ))}
          </div>
        </div>

        <hr style={{ borderTop: '1px solid var(--glass-border)', borderBottom: 'none', margin: '24px 0' }} />

        <div className="form-group">
          <label className="form-label" style={{ fontSize: '13px' }}>Salary Range</label>
          <input type="range" min="0" max="200" style={{ width: '100%', accentColor: 'var(--primary-main)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
            <span>$0k</span>
            <span>$200k+</span>
          </div>
        </div>

        <button className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>Apply Filters</button>
      </div>

      {/* Main Content */}
      <div>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }} className="animate-slide-up">
          <div style={{ position: 'relative', flex: 2 }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input type="text" className="input-glass" placeholder="Job title, keywords, or company" style={{ paddingLeft: '48px', padding: '16px 16px 16px 48px', fontSize: '15px' }} />
          </div>
          <div style={{ position: 'relative', flex: 1 }}>
            <MapPin size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input type="text" className="input-glass" placeholder="Location" style={{ paddingLeft: '48px', padding: '16px 16px 16px 48px', fontSize: '15px' }} />
          </div>
        </div>

        <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>Showing {jobs.length} results</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {jobs.map((job, i) => (
            <div key={i} className={`glass-panel animate-slide-up delay-${(i+2)*100}`} style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'var(--bg-color-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--glass-border)' }}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary-main)' }}>{job.company.charAt(0)}</span>
                </div>
                <div>
                  <h3 style={{ margin: '0 0 8px 0' }}>{job.title}</h3>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14}/> {job.location}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Briefcase size={14}/> {job.type}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><DollarSign size={14}/> {job.salary}</span>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <button className="btn-primary" style={{ marginBottom: '8px' }}>Apply Now</button>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                  <Clock size={12}/> {job.posted}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
