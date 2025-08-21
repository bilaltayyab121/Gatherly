import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "./Button";
import { LogOut, Calendar, User } from "lucide-react";

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold text-[#2563eb]"
          >
            <Calendar className="h-6 w-6" />
            <span>EventHub</span>
          </Link>

          <nav className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/events"
                  className="text-gray-700 hover:text-[#2563eb]"
                >
                  Events
                </Link>
                <Link
                  to="/dashboard/user"
                  className="text-gray-700 hover:text-[#2563eb]"
                >
                  Dashboard
                </Link>
                {user?.role === "ADMIN" && (
                  <Link
                    to="/dashboard/admin"
                    className="text-gray-700 hover:text-[#2563eb]"
                  >
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-700">{user?.name}</span>
                </div>
                <Button variant="secondary" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/events"
                  className="text-gray-700 hover:text-[#2563eb]"
                >
                  Events
                </Link>
                <Link to="/login">
                  <Button variant="secondary" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
