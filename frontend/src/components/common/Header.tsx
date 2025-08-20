
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from './Button';
import { LogOut, Calendar, User, Menu } from 'lucide-react';
import { useState } from 'react';


export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary-600">
            <Calendar className="h-7 w-7" />
            <span>EventHub</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/events" className="text-gray-700 hover:text-primary-600 font-medium transition">Events</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard/user" className="text-gray-700 hover:text-primary-600 font-medium transition">Dashboard</Link>
                {user?.role === 'ADMIN' && (
                  <Link to="/dashboard/admin" className="text-gray-700 hover:text-primary-600 font-medium transition">Admin</Link>
                )}
                <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100">
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-700 font-semibold">{user?.name}</span>
                </div>
                <Button variant="secondary" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="secondary" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Hamburger */}
          <button className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="h-7 w-7 text-primary-600" />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden mt-2 bg-white rounded-lg shadow-lg border py-4 px-6 flex flex-col gap-4 animate-in fade-in">
            <Link to="/events" className="text-gray-700 hover:text-primary-600 font-medium transition" onClick={() => setMenuOpen(false)}>Events</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard/user" className="text-gray-700 hover:text-primary-600 font-medium transition" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                {user?.role === 'ADMIN' && (
                  <Link to="/dashboard/admin" className="text-gray-700 hover:text-primary-600 font-medium transition" onClick={() => setMenuOpen(false)}>Admin</Link>
                )}
                <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100">
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-700 font-semibold">{user?.name}</span>
                </div>
                <Button variant="secondary" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <Button variant="secondary" size="sm">Login</Button>
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}>
                  <Button size="sm">Register</Button>
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}