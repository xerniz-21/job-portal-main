import { useState } from 'react';
import { Briefcase, MapPin, DollarSign, ListChecks } from 'lucide-react';

export default function PostJob() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Job posted successfully!');
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Post a New Job</h1>
        <p style={{ color: 'var(--text-muted)' }}>Fill in the details below to publish a new job opening.</p>
      </div>

      <div className="glass-panel animate-slide-up" style={{ padding: '32px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={16} color="var(--primary-main)" /> Job Title
            </label>
            <input type="text" className="input-glass" placeholder="e.g. Senior Frontend Developer" required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="var(--primary-main)" /> Location
              </label>
              <input type="text" className="input-glass" placeholder="e.g. Remote, or New York, NY" required />
            </div>
            
            <div className="form-group">
              <label className="form-label">Job Type</label>
              <select className="input-glass" required style={{ appearance: 'none' }}>
                <option value="">Select type...</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <DollarSign size={16} color="var(--primary-main)" /> Salary Range
            </label>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <input type="text" className="input-glass" placeholder="Min (e.g. $80k)" />
              <span style={{ color: 'var(--text-muted)' }}>to</span>
              <input type="text" className="input-glass" placeholder="Max (e.g. $120k)" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ListChecks size={16} color="var(--primary-main)" /> Job Description
            </label>
            <textarea 
              className="input-glass" 
              rows="6" 
              placeholder="Describe the responsibilities, requirements, and benefits..."
              style={{ resize: 'vertical' }}
              required
            ></textarea>
          </div>

          <hr style={{ borderTop: '1px solid var(--glass-border)', borderBottom: 'none', margin: '8px 0' }} />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
            <button type="button" className="btn-secondary">Save as Draft</button>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Publishing...' : 'Publish Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
