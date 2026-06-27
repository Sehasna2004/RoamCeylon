import React, { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage.jsx";
import Navbar from "./components/Navbar.jsx";
import AuthModal from "./components/AuthModal.jsx";

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Restore session state on application initiation boot layout
  useEffect(() => {
    const cachedUser = localStorage.getItem("roam_user_session");
    if (cachedUser) {
      try {
        setCurrentUser(JSON.parse(cachedUser));
      } catch (err) {
        localStorage.removeItem("roam_user_session");
      }
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem("roam_user_session", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("roam_user_session");
  };

  const handleUpdateUser = (updatedUserData) => {
    setCurrentUser(updatedUserData);
    localStorage.setItem("roam_user_session", JSON.stringify(updatedUserData));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar 
        user={currentUser} 
        onLoginClick={() => setIsAuthModalOpen(true)} 
        onLogout={handleLogout}
        onUpdateUser={handleUpdateUser}
      />
      
      <LandingPage />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;