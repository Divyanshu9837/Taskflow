import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex bg-surface-bg">
      <Sidebar />

      <main className="flex-1 px-5 md:px-8 py-7">
        <h1 className="font-display font-semibold text-2xl text-ink mb-6">Profile</h1>

        <div className="bg-white border border-surface-border rounded-2xl p-6 max-w-md">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-flow flex items-center justify-center text-white text-lg font-semibold">
              {user?.name?.[0]?.toUpperCase() ?? 'U'}
            </div>
            <div>
              <p className="font-display font-semibold text-ink">{user?.name}</p>
              <p className="text-sm text-ink-muted">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-surface-border">
              <span className="text-ink-muted">Name</span>
              <span className="text-ink font-medium">{user?.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-surface-border">
              <span className="text-ink-muted">Email</span>
              <span className="text-ink font-medium">{user?.email}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-ink-muted">User ID</span>
              <span className="text-ink font-medium text-xs">{user?.userId}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
