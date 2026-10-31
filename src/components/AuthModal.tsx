"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, Mail, Lock, User, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, loginWithGoogle, loginWithEmail, isLoading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      await loginWithEmail(email, password);
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google Sign-in popup closed or cancelled');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(1, 43, 71, 0.65)',
        backdropFilter: 'blur(8px)',
        padding: '16px',
        animation: 'fadeIn 0.25s ease',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          background: 'var(--warm-white, #FFFFFF)',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(3, 103, 166, 0.25)',
          border: '1px solid rgba(3, 103, 166, 0.12)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Header Ribbon */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0367A6 0%, #0378A6 60%, #278C0B 100%)',
            padding: '28px 28px 24px',
            color: 'white',
            position: 'relative',
          }}
        >
          <button
            onClick={closeAuthModal}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <X size={18} />
          </button>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '10px' }}>
            <ShieldCheck size={14} />
            KLEANJA B2C ACCOUNT
          </div>

          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
            {isSignUp ? 'Create your Account' : 'Welcome to Kleanja'}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)', marginTop: '4px', margin: 0 }}>
            {isSignUp
              ? 'Join to save delivery addresses and track orders in real-time'
              : 'Sign in to access your orders, track shipments & quick checkout'}
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 28px 28px' }}>
          {error && (
            <div
              style={{
                background: '#FEE2E2',
                border: '1px solid #F87171',
                color: '#991B1B',
                padding: '10px 14px',
                borderRadius: '12px',
                fontSize: '0.85rem',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>{error}</span>
            </div>
          )}

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '12px 18px',
              background: '#FFFFFF',
              border: '1px solid #D0D5DD',
              borderRadius: '14px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: '0.92rem',
              color: '#1D2939',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'all 0.2s ease',
              marginBottom: '20px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#0367A6';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(3, 103, 166, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#D0D5DD';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
            }}
          >
            {/* Google G SVG */}
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <div style={{ flex: 1, height: '1px', background: '#E6E8EA' }} />
            <span style={{ fontSize: '0.78rem', color: '#8896A6', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              or with email
            </span>
            <div style={{ flex: 1, height: '1px', background: '#E6E8EA' }} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {isSignUp && (
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#1D2939', marginBottom: '6px' }}>
                  Full Name
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <User size={16} style={{ position: 'absolute', left: '14px', color: '#8896A6' }} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    style={{
                      width: '100%',
                      padding: '11px 14px 11px 38px',
                      borderRadius: '12px',
                      border: '1px solid #D0D5DD',
                      fontSize: '0.9rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#0367A6')}
                    onBlur={(e) => (e.target.style.borderColor = '#D0D5DD')}
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#1D2939', marginBottom: '6px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Mail size={16} style={{ position: 'absolute', left: '14px', color: '#8896A6' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={{
                    width: '100%',
                    padding: '11px 14px 11px 38px',
                    borderRadius: '12px',
                    border: '1px solid #D0D5DD',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#0367A6')}
                  onBlur={(e) => (e.target.style.borderColor = '#D0D5DD')}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#1D2939', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Lock size={16} style={{ position: 'absolute', left: '14px', color: '#8896A6' }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%',
                    padding: '11px 14px 11px 38px',
                    borderRadius: '12px',
                    border: '1px solid #D0D5DD',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#0367A6')}
                  onBlur={(e) => (e.target.style.borderColor = '#D0D5DD')}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                marginTop: '10px',
                padding: '13px',
                background: '#0367A6',
                color: 'white',
                border: 'none',
                borderRadius: '14px',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 14px rgba(3, 103, 166, 0.25)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#024873')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#0367A6')}
            >
              {isLoading ? 'Processing...' : isSignUp ? 'Create Customer Account' : 'Sign In'}
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Toggle Login/Sign-up */}
          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.85rem', color: '#475467' }}>
            {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              style={{
                background: 'none',
                border: 'none',
                color: '#0367A6',
                fontWeight: 700,
                cursor: 'pointer',
                padding: '0 4px',
                fontFamily: 'inherit',
                textDecoration: 'underline',
              }}
            >
              {isSignUp ? 'Sign In' : 'Register now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
