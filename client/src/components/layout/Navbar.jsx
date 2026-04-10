import { Link, useNavigate } from 'react-router-dom';
import { Bell, Search, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { role, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout) logout();
    navigate('/login');
  };

  return (
    <nav className="glass-panel" style={{
      position: 'sticky',
      top: '16px',
      margin: '0 16px 24px',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px',
          background: 'linear-gradient(135deg, var(--primary-main), var(--secondary-main))',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold'
        }}>J</div>
        <h2 className="glow-text" style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>JobPortal</h2>
      </div>

      <div style={{ flex: 1, maxWidth: '400px', margin: '0 24px', position: 'relative' }}>
        <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
        <input 
          type="text" 
          placeholder="Search jobs, companies, or skills..." 
          className="input-glass"
          style={{ paddingLeft: '40px', borderRadius: '24px' }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button style={{ 
          background: 'transparent', border: 'none', cursor: 'pointer', 
          color: 'var(--text-dark)', padding: '8px', borderRadius: '50%', transition: 'all 0.2s' 
        }}>
          <Bell size={20} />
        </button>
        
        <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '14px', fontWeight: 600 }}>{user.firstName} {user.lastName}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {role === 'jobseeker' ? 'Job Seeker' : 'Employer'}
            </div>
          </div>
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: 'var(--bg-color-dark)', border: '2px solid var(--primary-main)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <User size={20} color="var(--primary-main)" />
          </div>
        </Link>
        <button 
          onClick={handleLogout}
          title="Sign Out"
          style={{ 
            background: 'transparent', border: 'none', cursor: 'pointer', 
            color: 'var(--text-danger, #ef4444)', padding: '8px', borderRadius: '50%', transition: 'all 0.2s',
            marginLeft: '8px'
          }}>
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
}
