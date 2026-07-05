import React from 'react';

function DesignGallery() {
  return (
    <div className="design-gallery-page">
      <div className="design-gallery-shell">
        <header className="design-gallery-header">
          <span className="design-tag">Zenris UI Collection</span>
          <h1>Minimal mobile mockups for modern productivity.</h1>
          <p>Elegant pastel screens with polished dashboards, account settings, activity logs, login, support and overview pages.</p>
        </header>

        <div className="mockup-cluster">
          <div className="phone-mockup phone-large">
            <div className="phone-status-bar">
              <span>09:41</span>
              <span>100%</span>
            </div>
            <div className="phone-screen dashboard-screen">
              <div className="screen-title">Welcome Dashboard</div>
              <div className="kpi-row">
                <div className="kpi-card">
                  <strong>12</strong>
                  <span>Projects</span>
                </div>
                <div className="kpi-card">
                  <strong>28</strong>
                  <span>Tasks</span>
                </div>
              </div>
              <div className="chart-card">
                <div className="chart-label-row">
                  <span>Weekly Activity</span>
                  <span>+18%</span>
                </div>
                <div className="line-chart" />
              </div>
              <div className="overview-card">
                <span className="overview-tag">Overview</span>
                <p>Zenris helps you track your schedule, support requests, and project health at a glance.</p>
              </div>
            </div>
          </div>

          <div className="phone-mockup phone-medium">
            <div className="phone-status-bar">
              <span>09:41</span>
              <span>Wi‑Fi</span>
            </div>
            <div className="phone-screen login-screen">
              <div className="screen-title">Login</div>
              <div className="field-block">
                <label>Email</label>
                <div className="field-pill">you@example.com</div>
              </div>
              <div className="field-block">
                <label>Password</label>
                <div className="field-pill password-pill">••••••••</div>
              </div>
              <button className="screen-button">Login</button>
              <p className="screen-footnote">Forgot password? Reset in seconds.</p>
            </div>
          </div>

          <div className="phone-mockup phone-small">
            <div className="phone-status-bar">
              <span>09:41</span>
              <span>89%</span>
            </div>
            <div className="phone-screen settings-screen">
              <div className="screen-title">Account Settings</div>
              <div className="settings-field">
                <span>Name</span>
                <strong>Alex Morgan</strong>
              </div>
              <div className="settings-field">
                <span>Email</span>
                <strong>alex@zenris.com</strong>
              </div>
              <div className="toggle-row">
                <div>
                  <span>Push Notifications</span>
                  <strong>On</strong>
                </div>
                <div className="toggle-switch checked" />
              </div>
              <div className="toggle-row">
                <div>
                  <span>Dark Mode</span>
                  <strong>Off</strong>
                </div>
                <div className="toggle-switch" />
              </div>
            </div>
          </div>

          <div className="phone-mockup phone-medium secondary">
            <div className="phone-status-bar">
              <span>09:41</span>
              <span>LTE</span>
            </div>
            <div className="phone-screen activity-screen">
              <div className="screen-title">Activity Log</div>
              <div className="timeline-entry">
                <strong>Relaten Remens</strong>
                <span>2h ago</span>
              </div>
              <div className="timeline-entry">
                <strong>Prosers Center</strong>
                <span>5h ago</span>
              </div>
              <div className="timeline-entry support-entry">
                <strong>Support Inquiry</strong>
                <span>12:30 · Open</span>
                <p>Customer card info and status updated successfully.</p>
              </div>
            </div>
          </div>

          <div className="phone-mockup phone-small highlight">
            <div className="phone-status-bar">
              <span>09:41</span>
              <span>85%</span>
            </div>
            <div className="phone-screen support-screen">
              <div className="screen-title">Support Center</div>
              <div className="support-card">
                <strong>Ticket #0842</strong>
                <span>Pending response</span>
              </div>
              <div className="support-card">
                <strong>Overview</strong>
                <span>Service requests are on track.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignGallery;
