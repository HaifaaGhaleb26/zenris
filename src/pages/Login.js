import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, useLocation } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showResetRequest, setShowResetRequest] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMsg(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
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

  const handleResetRequest = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setResetStatus('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: 'https://zenris.netlify.app/reset-password',
      });
      if (error) throw error;
      setResetStatus('تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني. تحقق من صندوق الوارد.');
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShowResetRequest = () => {
    setShowResetRequest(true);
    setResetEmail(email);
    setErrorMsg('');
    setSuccessMsg('');
    setResetStatus('');
  };

  const handleBackToLogin = () => {
    setShowResetRequest(false);
    setErrorMsg('');
    setSuccessMsg('');
    setResetStatus('');
  };

  return (
    <div className="login-container auth-page">
      <div className="project-card login-card auth-card">
        <h2 className="auth-title">
          {isSignUp ? 'Create Zenris Account' : 'Login to Zenris'}
        </h2>

        {successMsg && <div className="auth-success">{successMsg}</div>}
        {resetStatus && <div className="auth-success">{resetStatus}</div>}
        {errorMsg && <div className="auth-error">{errorMsg}</div>}

        {showResetRequest ? (
          <form className="auth-form" onSubmit={handleResetRequest}>
            <div className="auth-form-group">
              <label className="auth-label">Email Address</label>
              <input
                type="email"
                className="login-input"
                placeholder="you@example.com"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button auth-submit-button" disabled={loading}>
              {loading ? 'Sending reset link...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
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
        )}

        {!showResetRequest && !isSignUp && (
          <div className="auth-footer-row">
            <span className="forgot-password-link" onClick={handleShowResetRequest}>
              Forgot Password?
            </span>
          </div>
        )}

        <p className="auth-switch-text">
          {showResetRequest ? (
            <span className="auth-switch-link" onClick={handleBackToLogin}>
              Back to login
            </span>
          ) : isSignUp ? (
            <>
              Already have an account?{' '}
              <span className="auth-switch-link" onClick={() => { setIsSignUp(false); setErrorMsg(''); setSuccessMsg(''); }}>
                Login here
              </span>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <span className="auth-switch-link" onClick={() => { setIsSignUp(true); setErrorMsg(''); setSuccessMsg(''); }}>
                Register here
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default Login;