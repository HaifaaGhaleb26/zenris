import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

function Settings() {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function getUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
        setUserName(user.user_metadata?.full_name || 'Zenris User');
      }
    }
    getUserData();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div>
      <header className="main-header">
        <h2>Account Settings</h2>
      </header>

      <div className="project-card">
        <h3>User Profile</h3>
        <div className="settings-profile">
          <p>
            <strong>Name:</strong> <span>{userName}</span>
          </p>
          <p>
            <strong>Email:</strong> <span className="settings-email">{userEmail || 'Loading email...'}</span>
          </p>
        </div>
      </div>

      <div className="project-card project-list-section">
        <h3>Session Management</h3>
        <p className="text-muted project-list-text">
          Ready to leave? Make sure to save your work before logging out of your workspace.
        </p>

        <button className="settings-logout-button" onClick={handleLogout}>
          Logout from Zenris
        </button>
      </div>
    </div>
  );
}

export default Settings;