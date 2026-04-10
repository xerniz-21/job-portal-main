import { useState, useEffect } from 'react';
import { Camera, Mail, Phone, MapPin, Building, Globe, CheckCircle, Code } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axiosClient';

export default function Profile() {
  const { role, user, updateUserProfile, fetchProfile } = useAuth(); // jobseeker | employer
  const [isSaving, setIsSaving] = useState(false);
  const [saveComplete, setSaveComplete] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Combine user fallback just in case
  const [formData, setFormData] = useState({
    phone: user?.phone || '',
    location: user?.location || '',
    skills: user?.skills?.join(', ') || '',
    companyName: user?.companyName || '',
    website: '' // Website wasn't in schema, leaving it just for UI or removing entirely. Let's remove it since it's unsupported.
  });

  useEffect(() => {
    // Populate form data when user loads
    if (user) {
      setFormData({
        phone: user.phone || '',
        location: user.location || '',
        skills: Array.isArray(user.skills) ? user.skills.join(', ') : '',
        companyName: user.companyName || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMsg('');
    try {
      let payload = {};
      
      if (role === 'jobseeker') {
        payload = {
          phone: formData.phone,
          location: formData.location,
          // Convert comma-separated skills back to an array
          skills: formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(Boolean) : []
        };
      } else if (role === 'employer') {
        payload = {
          phone: formData.phone,
          companyName: formData.companyName
        };
      }

      await updateUserProfile(payload);
      
      setSaveComplete(true);
      setTimeout(() => setSaveComplete(false), 3000);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to update profile.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  // Resume Upload Handler calling POST /api/jobseeker/resume
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('resume', file);

    try {
      await api.post('/jobseeker/resume', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      await fetchProfile();
      alert('Resume uploaded successfully.');
    } catch (err) {
      console.error("Resume upload failed", err);
      alert('Resume upload failed.');
    }
  };

  if (!user) return <div style={{ padding: '24px' }}>Loading profile...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Profile Settings</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your personal information and preferences.</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--glass-bg)', padding: '8px 16px', borderRadius: '30px', border: '1px solid var(--glass-border)' }}>
          <span style={{ fontSize: '14px', fontWeight: 500 }}>Active Role:</span>
          <span className={`badge ${role === 'jobseeker' ? 'badge-info' : 'badge-warning'}`}>
            {role === 'jobseeker' ? 'Job Seeker' : 'Employer'}
          </span>
        </div>
      </div>

      {errorMsg && (
        <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', marginBottom: '24px' }}>
          {errorMsg}
        </div>
      )}

      <div className="glass-panel animate-slide-up" style={{ padding: '32px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '32px', marginBottom: '32px' }}>
          
          <div style={{ flex: 1 }}>
            <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>General Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="tel" name="phone" className="input-glass" value={formData.phone} onChange={handleChange} style={{ paddingLeft: '40px' }} placeholder="+1 234 567 890" />
                </div>
              </div>

              {role === 'jobseeker' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <div style={{ position: 'relative' }}>
                      <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input type="text" name="location" className="input-glass" value={formData.location} onChange={handleChange} style={{ paddingLeft: '40px' }} placeholder="New York, NY" />
                    </div>
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Skills (comma-separated)</label>
                    <div style={{ position: 'relative' }}>
                      <Code size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input type="text" name="skills" className="input-glass" value={formData.skills} onChange={handleChange} style={{ paddingLeft: '40px' }} placeholder="React, Node.js, Design" />
                    </div>
                  </div>
                </>
              )}

              {role === 'employer' && (
                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <div style={{ position: 'relative' }}>
                    <Building size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input type="text" name="companyName" className="input-glass" value={formData.companyName} onChange={handleChange} style={{ paddingLeft: '40px' }} placeholder="TechCorp" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {role === 'jobseeker' && (
          <>
            <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '32px 0' }} />
            <div>
              <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Resume Tracking</h3>
              {user?.resume?.url && (
                <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px' }}>Active Resume Submitted</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>This document is visible to employers you apply to.</p>
                  </div>
                  <a href={`http://localhost:3000/${user.resume.url.replace(/\\/g, '/')}`} target="_blank" rel="noreferrer" className="btn-secondary" style={{ textDecoration: 'none' }}>
                    Preview File
                  </a>
                </div>
              )}
              <label 
                htmlFor="resume-upload"
                style={{ 
                  display: 'block', border: '2px dashed var(--primary-main)', background: 'var(--primary-glow)', 
                  borderRadius: '12px', padding: '40px', textAlign: 'center', cursor: 'pointer',
                  transition: 'all 0.2s'
                }}>
                <div style={{ background: 'white', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <Camera size={20} color="var(--primary-main)" />
                </div>
                <h4 style={{ margin: '0 0 8px 0', color: 'var(--primary-dark)' }}>Upload your resume</h4>
                <p style={{ color: 'var(--text-dark)', fontSize: '13px', margin: 0 }}>Click to browse files (PDF, DOCX)</p>
                <input 
                  id="resume-upload" 
                  type="file" 
                  style={{ display: 'none' }} 
                  onChange={handleFileUpload} 
                  accept=".pdf,image/*" 
                />
              </label>
            </div>
          </>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px' }}>
          <div>
            {saveComplete && (
              <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', background: '#dcfce7', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 500 }}>
                <CheckCircle size={16} /> Changes saved successfully!
              </div>
            )}
          </div>
          <button className="btn-primary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
