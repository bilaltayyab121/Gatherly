// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import { useAuth } from "./hooks/useAuth";
// import Header from "./components/common/Header";
// import Home from "./pages/Home";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Events from "./pages/events/Events";
// import EventDetails from "./pages/events/EventDetails";
// import CreateEvent from "./pages/events/CreateEvent";
// import EditEvent from "./pages/events/EditEvent";
// import UserDashboard from "./pages/dashboard/UserDashboard";
// import AdminDashboard from "./pages/dashboard/AdminDashboard";
// import NotFound from "./pages/NotFound";

// function App() {
//   return (
//     <div>
//       <AuthProvider>
//         <Router>
//           <div className="min-h-screen bg-gray-50">
//             <Header />
//             <main>
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
//                 <Route path="/events" element={<Events />} />
//                 <Route path="/events/:id" element={<EventDetails />} />
//                 <Route path="/forgot-password" element={<ForgotPassword />} />
//                 {/* Protected routes */}
//                 <Route
//                   path="/events/create"
//                   element={
//                     <ProtectedRoute roles={["ADMIN", "ORGANIZER"]}>
//                       <CreateEvent />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/events/:id/edit"
//                   element={
//                     <ProtectedRoute roles={["ADMIN", "ORGANIZER"]}>
//                       <EditEvent />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/dashboard/admin"
//                   element={
//                     <ProtectedRoute roles={["ADMIN"]}>
//                       <AdminDashboard />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/dashboard/user"
//                   element={
//                     <ProtectedRoute>
//                       <UserDashboard />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route path="*" element={<NotFound />} />
//               </Routes>
//             </main>
//           </div>
//         </Router>
//       </AuthProvider>
//     </div>
//   );
// }

// import type { ReactNode } from "react";
// import ForgotPassword from "./pages/auth/ForgotPassword";

// function ProtectedRoute({
//   children,
//   roles = [],
// }: {
//   children: ReactNode;
//   roles?: string[];
// }) {
//   const { user, isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   if (roles.length > 0 && !roles.includes(user!.role)) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }

// export default App;

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import { useAuth } from "./hooks/useAuth";
// import Header from "./components/common/Header";
// import Home from "./pages/Home";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import Events from "./pages/events/Events";
// import EventDetails from "./pages/events/EventDetails";
// import CreateEvent from "./pages/events/CreateEvent";
// import EditEvent from "./pages/events/EditEvent";
// import AdminDashboard from "./pages/dashboard/AdminDashboard";
// import ParticipantDashboard from "./pages/dashboard/ParticipantDashboard";
// import NotFound from "./pages/NotFound";
// import type { ReactNode } from "react";

// // Protected Route Component
// function ProtectedRoute({
//   children,
//   roles = [],
// }: {
//   children: ReactNode;
//   roles?: string[];
// }) {
//   const { user, isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   if (roles.length > 0 && !roles.includes(user!.role)) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }

// // Role-based redirect component
// // function RoleBasedRedirect() {
// //   const { user } = useAuth();

// //   if (user?.role === "ADMIN" || user?.role === "ORGANIZER") {
// //     return <Navigate to="/dashboard/admin" replace />;
// //   } else {
// //     return <Navigate to="/dashboard/participant" replace />;
// //   }
// // }

// function RoleBasedRedirect() {
//   const { user } = useAuth();

//   if (user?.role === "ADMIN") {
//     return <Navigate to="/dashboard/admin" replace />;
//   } else if (user?.role === "ORGANIZER") {
//     return <Navigate to="/dashboard/organizer" replace />;
//   } else {
//     return <Navigate to="/dashboard/participant" replace />;
//   }
// }

// function App() {
//   return (
//     <div>
//       <AuthProvider>
//         <Router>
//           <div className="min-h-screen bg-gray-50">
//             <Header />
//             <main>
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
//                 <Route path="/forgot-password" element={<ForgotPassword />} />
//                 <Route path="/events" element={<Events />} />
//                 <Route path="/events/:id" element={<EventDetails />} />

//                 {/* Protected routes */}
//                 <Route
//                   path="/events/create"
//                   element={
//                     <ProtectedRoute roles={["ADMIN", "ORGANIZER"]}>
//                       <CreateEvent />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/events/:id/edit"
//                   element={
//                     <ProtectedRoute roles={["ADMIN", "ORGANIZER"]}>
//                       <EditEvent />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/dashboard/admin"
//                   element={
//                     <ProtectedRoute roles={["ADMIN", "ORGANIZER"]}>
//                       <AdminDashboard />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/dashboard/participant"
//                   element={
//                     <ProtectedRoute>
//                       <ParticipantDashboard />
//                     </ProtectedRoute>
//                   }
//                 />
//                 {/* Redirect to appropriate dashboard based on role */}
//                 <Route
//                   path="/dashboard"
//                   element={
//                     <ProtectedRoute>
//                       <RoleBasedRedirect />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route path="*" element={<NotFound />} />
//               </Routes>
//             </main>
//           </div>
//         </Router>
//       </AuthProvider>
//     </div>
//   );
// }

// export default App;


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import Header from "./components/common/Header";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Events from "./pages/events/Events";
import EventDetails from "./pages/events/EventDetails";
import CreateEvent from "./pages/events/CreateEvent";
import EditEvent from "./pages/events/EditEvent";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import OrganizerDashboard from "./pages/dashboard/OrganizerDashboard";
import ParticipantDashboard from "./pages/dashboard/ParticipantDashboard";
import NotFound from "./pages/NotFound";
import type { ReactNode } from "react";

// Protected Route Component
function ProtectedRoute({
  children,
  roles = [],
}: {
  children: ReactNode;
  roles?: string[];
}) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(user!.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}


function RoleBasedRedirect() {
  const { user } = useAuth();

  if (user?.role === "ADMIN") {
    return <Navigate to="/dashboard/admin" replace />;
  } else if (user?.role === "ORGANIZER") {
    return <Navigate to="/dashboard/organizer" replace />;
  } else {
    return <Navigate to="/dashboard/participant" replace />;
  }
}
function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetails />} />

                {/* Protected routes */}
                <Route
                  path="/events/create"
                  element={
                    <ProtectedRoute roles={["ADMIN", "ORGANIZER"]}>
                      <CreateEvent />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/events/:id/edit"
                  element={
                    <ProtectedRoute roles={["ADMIN", "ORGANIZER"]}>
                      <EditEvent />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/admin"
                  element={
                    <ProtectedRoute roles={["ADMIN"]}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/organizer"
                  element={
                    <ProtectedRoute roles={["ORGANIZER"]}>
                      <OrganizerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/participant"
                  element={
                    <ProtectedRoute>
                      <ParticipantDashboard />
                    </ProtectedRoute>
                  }
                />
                {/* Redirect to appropriate dashboard based on role */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <RoleBasedRedirect />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;