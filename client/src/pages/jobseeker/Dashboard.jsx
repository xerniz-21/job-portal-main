import { LayoutDashboard, Briefcase, Users, Star, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const stats = [
    { label: 'Jobs Applied', value: '24', icon: <Briefcase size={24} color="#3b82f6" />, change: '+3 this week' },
    { label: 'Profile Views', value: '156', icon: <Users size={24} color="#8b5cf6" />, change: '+12% vs last month' },
    { label: 'Interviews', value: '4', icon: <Star size={24} color="#f59e0b" />, change: '2 coming up' },
  ];

  const recommendedJobs = [
    { title: 'Senior Frontend Node.js Developer', company: 'TechCorp Inc.', location: 'Remote', salary: '$120k - $150k', tags: ['React', 'Node.js'] },
    { title: 'UI/UX Interactive Designer', company: 'DesignStudio', location: 'New York, NY', salary: '$90k - $120k', tags: ['Figma', 'CSS'] },
  ];

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Dashboard</h1>
        <p style={{ color: 'var(--text-muted)' }}>Welcome back, Alex! Here's your job search overview.</p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {stats.map((stat, i) => (
          <div key={i} className={`glass-panel animate-slide-up delay-${(i+1)*100}`} style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '12px' }}>
                {stat.icon}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: 700, marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ color: 'var(--text-dark)', fontWeight: 500, fontSize: '14px' }}>{stat.label}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '8px' }}>{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Recommended Jobs */}
        <div className="glass-panel animate-slide-up delay-400" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '18px' }}>Recommended For You</h3>
            <Link to="/jobseeker/jobs" style={{ fontSize: '14px', color: 'var(--primary-main)', textDecoration: 'none', fontWeight: 500 }}>View All</Link>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recommendedJobs.map((job, idx) => (
              <div key={idx} style={{ 
                padding: '20px', borderRadius: '12px', background: 'rgba(255,255,255,0.4)', 
                border: '1px solid rgba(255,255,255,0.6)', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', transition: 'all 0.3s'
              }} className="job-card-hover">
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{job.title}</h4>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>{job.company} • {job.location}</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span className="badge badge-info">{job.salary}</span>
                    {job.tags.map(t => <span key={t} className="badge" style={{ background: 'var(--bg-color-dark)', color: 'var(--text-dark)' }}>{t}</span>)}
                  </div>
                </div>
                <button className="btn-secondary" style={{ padding: '8px 16px' }}>Apply <ArrowUpRight size={16} /></button>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Completion */}
        <div className="glass-panel animate-slide-up delay-400" style={{ padding: '24px', background: 'linear-gradient(135deg, var(--primary-main), var(--primary-dark))', color: 'white' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: 'white' }}>Profile Setup</h3>
          <div style={{ position: 'relative', height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', marginBottom: '16px' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '75%', background: 'white', borderRadius: '4px', boxShadow: '0 0 10px rgba(255,255,255,0.5)' }} />
          </div>
          <div style={{ fontSize: '14px', marginBottom: '24px', color: 'rgba(255,255,255,0.8)' }}>75% Complete - Add your resume to unlock 2x more profile views!</div>
          <Link to="/profile" className="btn-secondary" style={{ width: '100%', border: 'none', background: 'rgba(255,255,255,0.95)' }}>Complete Profile</Link>
        </div>
      </div>
    </div>
  );
}
