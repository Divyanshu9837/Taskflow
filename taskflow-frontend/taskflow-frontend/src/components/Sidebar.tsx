import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: BoardIcon },
  { to: '/profile', label: 'Profile', icon: ProfileIcon },
];

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="hidden md:flex md:w-64 flex-col bg-ink text-white shrink-0">
      <div className="px-6 py-7 flex items-center gap-2.5">
        <FlowMark />
        <span className="font-display font-semibold text-lg tracking-tight">
          TaskFlow
        </span>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-flow text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-6 pt-3 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-flow flex items-center justify-center text-xs font-semibold shrink-0">
            {user?.name?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-white/50 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-2 w-full text-left px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}

function FlowMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path
        d="M2 18C6 18 6 8 10 8C14 8 14 18 18 18C20 18 21 15 24 15"
        stroke="#2952E3"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BoardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="4.5" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="7.75" y="2" width="4.5" height="9" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13.5" y="2" width="4.5" height="11.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 16c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
