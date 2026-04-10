import { useState, useEffect } from 'react';
import { Moon, Sun, Bell, Shield, Key } from 'lucide-react';

export default function Settings() {
  const [isDark, setIsDark] = useState(
    document.documentElement.getAttribute('data-theme') === 'dark'
  );

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Settings</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage your application preferences and display settings.</p>
      </div>

      <div className="glass-panel animate-slide-up" style={{ padding: '32px', marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sun size={20} className="glow-text" /> Appearance
        </h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--glass-border)' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-dark)' }}>Theme Mode</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Switch between light and dark modes</div>
          </div>
          <button 
            onClick={toggleTheme}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              padding: '8px 16px', borderRadius: '20px', cursor: 'pointer',
              background: isDark ? 'var(--bg-color-dark)' : 'white',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-dark)', fontWeight: 600,
              boxShadow: 'var(--glass-shadow)',
              transition: 'all 0.3s'
            }}
          >
            {isDark ? <Moon size={16} color="#8b5cf6" /> : <Sun size={16} color="#f59e0b" />}
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
      </div>

      <div className="glass-panel animate-slide-up delay-100" style={{ padding: '32px', marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={20} className="glow-text" /> Notifications
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--glass-border)' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '15px' }}>Email Alerts</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Receive emails when new jobs match your profile</div>
          </div>
          <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--primary-main)' }} defaultChecked />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '15px' }}>Application Updates</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Get notified when your application status changes</div>
          </div>
          <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--primary-main)' }} defaultChecked />
        </div>
      </div>

      <div className="glass-panel animate-slide-up delay-200" style={{ padding: '32px' }}>
        <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={20} className="glow-text" /> Security
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '15px' }}>Change Password</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Update your account password securely</div>
          </div>
          <button className="btn-secondary" style={{ padding: '6px 16px', fontSize: '13px' }}>Update</button>
        </div>
      </div>

    </div>
  );
}
