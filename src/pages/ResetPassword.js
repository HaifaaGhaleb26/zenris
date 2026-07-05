import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setMessage('');

    if (!newPassword || newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      setMessage('تم تحديث كلمة المرور بنجاح. سيتم إعادة التوجيه إلى صفحة تسجيل الدخول.');
      setTimeout(() => {
        navigate('/login', { state: { message: 'Password updated successfully. Please log in with your new password.' } });
      }, 1800);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container auth-page">
      <div className="project-card login-card auth-card">
        <h2 className="auth-title">Reset Zenris Password</h2>

        {message && <div className="auth-success">{message}</div>}
        {errorMsg && <div className="auth-error">{errorMsg}</div>}

        <form className="auth-form" onSubmit={handlePasswordReset}>
          <div className="auth-form-group">
            <label className="auth-label">New Password</label>
            <input
              type="password"
              className="login-input"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Confirm Password</label>
            <input
              type="password"
              className="login-input"
              placeholder="Repeat your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button auth-submit-button" disabled={loading}>
            {loading ? 'Updating password...' : 'Save New Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
