import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthLayout } from './LoginPage';

export default function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await register({ name, email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <h1 className="font-display font-semibold text-2xl text-ink mb-1">Create your account</h1>
      <p className="text-sm text-ink-muted mb-7">Start organizing your work in minutes.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-ink-muted mb-1.5">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="w-full px-3.5 py-2.5 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-flow/40 focus:border-flow"
          />
        </div>
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
            placeholder="At least 6 characters"
            className="w-full px-3.5 py-2.5 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-flow/40 focus:border-flow"
          />
        </div>

        {error && <p className="text-xs text-priority-high">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-flow hover:bg-flow-dark text-white text-sm font-medium py-2.5 rounded-lg transition-colors disabled:opacity-60"
        >
          {loading ? 'Creating account...' : 'Sign up'}
        </button>
      </form>

      <p className="text-sm text-ink-muted mt-6 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-flow font-medium hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
