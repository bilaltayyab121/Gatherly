// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
// import Button from "./Button";
// import { LogOut, Calendar, User } from "lucide-react";

// export default function Header() {
//   const { user, logout, isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <header className="bg-white shadow-sm border-b">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           <Link
//             to="/"
//             className="flex items-center space-x-2 text-xl font-bold text-[#2563eb]"
//           >
//             <Calendar className="h-6 w-6" />
//             <span>EventHub</span>
//           </Link>

//           <nav className="flex items-center space-x-4">
//             {isAuthenticated ? (
//               <>
//                 <Link
//                   to="/events"
//                   className="text-gray-700 hover:text-[#2563eb]"
//                 >
//                   Events
//                 </Link>
//                 <Link
//                   to="/dashboard/user"
//                   className="text-gray-700 hover:text-[#2563eb]"
//                 >
//                   Dashboard
//                 </Link>
//                 {user?.role === "ADMIN" && (
//                   <Link
//                     to="/dashboard/admin"
//                     className="text-gray-700 hover:text-[#2563eb]"
//                   >
//                     Admin
//                   </Link>
//                 )}
//                 <div className="flex items-center space-x-2">
//                   <User className="h-5 w-5 text-gray-500" />
//                   <span className="text-sm text-gray-700">{user?.name}</span>
//                 </div>
//                 <Button variant="secondary" size="sm" onClick={handleLogout}>
//                   <LogOut className="h-4 w-4 mr-1" />
//                   Logout
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/events"
//                   className="text-gray-700 hover:text-[#2563eb]"
//                 >
//                   Events
//                 </Link>
//                 <Link to="/login">
//                   <Button variant="secondary" size="sm">
//                     Login
//                   </Button>
//                 </Link>
//                 <Link to="/register">
//                   <Button size="sm">Register</Button>
//                 </Link>
//               </>
//             )}
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }

// components/common/Header.tsx
// import { Link } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

// export default function Header() {
//   const { user, logout, isAuthenticated } = useAuth();

//   return (
//     <nav className="bg-white shadow-sm border-b">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//         <Link to="/" className="text-xl font-bold text-indigo-600">
//           EventHub
//         </Link>

//         <div className="flex space-x-4 items-center">
//           {isAuthenticated ? (
//             <>
//               <Link
//                 to="/events"
//                 className="text-gray-700 hover:text-indigo-600"
//               >
//                 Events
//               </Link>

//               {/* Show different links based on user role */}
//               {user?.role === "ADMIN" || user?.role === "ORGANIZER" ? (
//                 <>
//                   <Link
//                     to="/events/create"
//                     className="text-gray-700 hover:text-indigo-600"
//                   >
//                     Create Event
//                   </Link>
//                   <Link
//                     to="/dashboard/admin"
//                     className="text-gray-700 hover:text-indigo-600"
//                   >
//                     Dashboard
//                   </Link>
//                 </>
//               ) : (
//                 <Link
//                   to="/dashboard/participant"
//                   className="text-gray-700 hover:text-indigo-600"
//                 >
//                   My Events
//                 </Link>
//               )}

//               <button
//                 onClick={logout}
//                 className="text-gray-700 hover:text-indigo-600"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="text-gray-700 hover:text-indigo-600">
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="text-gray-700 hover:text-indigo-600"
//               >
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }


import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const Header: React.FC = () => {
  const { user, logout, isAuthenticated} = useAuth();

  console.log("user => ",user);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          EventManager
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/events" className="text-gray-700 hover:text-blue-600">Events</Link>
          
          {isAuthenticated && user?.role !== 'PARTICIPANT' && (
            <Link to="/events/create" className="text-gray-700 hover:text-blue-600">Create Event</Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-gray-700">Welcome, {user?.name}</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {user?.role}
                </span>
              </div>
              <Link 
                to={user?.role === 'ADMIN' ? '/dashboard/admin' : 
                    user?.role === 'ORGANIZER' ? '/dashboard/organizer' : 
                    '/dashboard/participant'} 
                className="text-gray-700 hover:text-blue-600"
              >
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;