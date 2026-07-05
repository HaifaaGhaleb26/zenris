import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: displayName,
            },
          },
        });
        if (error) throw error;
        alert('Account created successfully! You can now log in.');
        setIsSignUp(false);
        setDisplayName('');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate('/');
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container auth-page">
      <div className="project-card login-card auth-card">
        <h2 className="auth-title">
          {isSignUp ? 'Create Zenris Account' : 'Login to Zenris'}
        </h2>

        {errorMsg && <div className="auth-error">{errorMsg}</div>}

        <form className="auth-form" onSubmit={handleAuth}>
          {isSignUp && (
            <div className="auth-form-group">
              <label className="auth-label">Full Name</label>
              <input
                type="text"
                className="login-input"
                placeholder="Your Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required={isSignUp}
              />
            </div>
          )}

          <div className="auth-form-group">
            <label className="auth-label">Email Address</label>
            <input
              type="email"
              className="login-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Password</label>
            <input
              type="password"
              className="login-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button auth-submit-button" disabled={loading}>
            {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <p className="auth-switch-text">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span className="auth-switch-link" onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(''); }}>
            {isSignUp ? 'Login here' : 'Register here'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;