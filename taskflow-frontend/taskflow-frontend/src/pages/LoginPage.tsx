import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <h1 className="font-display font-semibold text-2xl text-ink mb-1">Welcome back</h1>
      <p className="text-sm text-ink-muted mb-7">Log in to keep your tasks flowing.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-ink-muted mb-1.5">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-3.5 py-2.5 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-flow/40 focus:border-flow"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-ink-muted mb-1.5">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3.5 py-2.5 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-flow/40 focus:border-flow"
          />
        </div>

        {error && <p className="text-xs text-priority-high">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-flow hover:bg-flow-dark text-white text-sm font-medium py-2.5 rounded-lg transition-colors disabled:opacity-60"
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>

      <p className="text-sm text-ink-muted mt-6 text-center">
        New to TaskFlow?{' '}
        <Link to="/signup" className="text-flow font-medium hover:underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-bg px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <svg width="28" height="28" viewBox="0 0 26 26" fill="none">
            <path
              d="M2 18C6 18 6 8 10 8C14 8 14 18 18 18C20 18 21 15 24 15"
              stroke="#2952E3"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <span className="font-display font-semibold text-xl text-ink">TaskFlow</span>
        </div>
        <div className="bg-white border border-surface-border rounded-2xl shadow-sm p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
