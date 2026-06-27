import React, { useState, useEffect } from 'react';

function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    username: '', password: '', confirmPassword: '',
    name: '', gender: 'Male', email: '', contact: ''
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({ label: '', color: 'bg-slate-200', width: 'w-0' });

  // Real-time Password Strength Meter Logic
  useEffect(() => {
    const pass = formData.password;
    if (!pass) {
      setPasswordStrength({ label: '', color: 'bg-slate-200', width: 'w-0' });
      return;
    }

    let score = 0;
    if (pass.length >= 6) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) {
      setPasswordStrength({ label: 'Weak', color: 'bg-red-500', width: 'w-1/3' });
    } else if (score <= 3) {
      setPasswordStrength({ label: 'Medium', color: 'bg-amber-500', width: 'w-2/3' });
    } else {
      setPasswordStrength({ label: 'Strong', color: 'bg-emerald-500', width: 'w-full' });
    }
  }, [formData.password]);

  // Input Field Validation Rules
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Text-only validation for Name (letters and spaces only)
    if (name === 'name' && value !== '' && !/^[A-Za-z\s]+$/.test(value)) return;
    
    // Numeric-only check & max 10 digits for contact number
    if (name === 'contact' && value !== '' && (!/^\d+$/.test(value) || value.length > 10)) return;

    setFormData({ ...formData, [name]: value });
  };

  // Convert files to base64 formatting string for MongoDB delivery
  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  // SUBMIT HANDLER DIRECTLY CONNECTED TO BACKEND API
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!isLoginView) {
      if (formData.contact.length !== 10) {
        validationErrors.contact = "Contact number must be exactly 10 digits.";
      }
      if (formData.password !== formData.confirmPassword) {
        validationErrors.confirmPassword = "Passwords do not match.";
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const endpoint = isLoginView ? '/api/auth/login' : '/api/auth/register';
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isLoginView ? {
          username: formData.username,
          password: formData.password
        } : {
          name: formData.name,
          gender: formData.gender,
          email: formData.email,
          contact: formData.contact,
          username: formData.username,
          password: formData.password,
          avatar: avatarPreview || '' 
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        if (isLoginView) {
          // 1. Persist user session data locally to keep profile active on page refresh
          localStorage.setItem("roam_user_session", JSON.stringify(data.user));

          // 2. Send complete server payload upstream to App state logic if logged in
          if (onLoginSuccess) onLoginSuccess(data.user);
          onClose();
        } else {
          alert(data.message);
          setIsLoginView(true); // Flip over into the login panel automatically
        }
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Connection Failed:", err);
      alert("Cannot reach the backend database server.");
    }
  };

  // Safe evaluation condition at the bottom instead of early breaks
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop Blur Layer */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 overflow-y-auto max-h-[90vh] border border-slate-100">
        
        {/* Close Button */}
        <button type="button" onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header Titles */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            {isLoginView ? "Welcome Back" : "Create Account"}
          </h3>
          <p className="text-slate-500 text-xs mt-1">
            {isLoginView ? "Discover Sri Lanka's finest stays" : "Join our exclusive travel circle"}
          </p>
        </div>

        {/* OAUTH SOCIAL LOGINS */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button type="button" onClick={() => alert('Connecting Google Auth...')} className="flex items-center justify-center space-x-2 py-2 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 active:scale-[0.98] transition text-sm font-semibold text-slate-700 shadow-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61a5.66 5.66 0 0 1-2.45 3.71v3.08h3.95a12 12 0 0 0 3.635-8.64Z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.95-3.08c-1.1.74-2.51 1.18-3.98 1.18-3.07 0-5.67-2.08-6.6-4.88H1.31v3.18A12 12 0 0 0 12 24Z"/><path fill="#FBBC05" d="M5.4 14.31a7.16 7.16 0 0 1 0-4.62V6.51H1.31a12 12 0 0 0 0 10.98L5.4 14.31Z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.31 6.51l4.09 3.18c.93-2.8 3.53-4.94 6.6-4.94Z"/></svg>
            <span>Google</span>
          </button>
          <button type="button" onClick={() => alert('Connecting Apple Auth...')} className="flex items-center justify-center space-x-2 py-2 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 active:scale-[0.98] transition text-sm font-semibold text-slate-700 shadow-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.56 2.95-1.39Z"/></svg>
            <span>Apple</span>
          </button>
        </div>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-[11px] font-bold uppercase tracking-wider">Or email login</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* AUTH FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          
          {/* DRAG & DROP PROFILE PIC PREVIEW */}
          {!isLoginView && (
            <div className="flex flex-col items-center justify-center pb-2">
              <label 
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`relative group cursor-pointer w-24 h-24 rounded-full border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all duration-300 ${
                  isDragging ? 'border-blue-500 bg-blue-50/50 scale-105' : 'border-slate-300 bg-slate-50 hover:border-blue-400'
                }`}
              >
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mx-auto text-slate-400 group-hover:text-blue-500 transition">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                    </svg>
                    <span className="text-[10px] text-slate-400 font-bold tracking-tight block mt-1">Drop Profile Pic</span>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={(e) => processFile(e.target.files[0])} className="hidden" />
              </label>
            </div>
          )}

          {/* DYNAMIC REGISTRATION FIELDS */}
          {!isLoginView && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Full Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition" placeholder="John Doe" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Gender</label>
                <div className="flex space-x-6">
                  {['Male', 'Female', 'Other'].map((g) => (
                    <label key={g} className="flex items-center space-x-2 text-sm text-slate-600 font-medium cursor-pointer">
                      <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleInputChange} className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500" />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Email Address</label>
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition" placeholder="you@domain.com" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Contact Number</label>
                <input type="text" name="contact" required value={formData.contact} onChange={handleInputChange} className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition" placeholder="0771234567" />
                {errors.contact && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.contact}</p>}
              </div>
            </>
          )}

          {/* USERNAME */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Username</label>
            <input type="text" name="username" required value={formData.username} onChange={handleInputChange} className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition" placeholder="traveler123" />
          </div>

          {/* PASSWORD FIELD WITH HIDE/SHOW TOGGLE */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" required value={formData.password} onChange={handleInputChange} className="w-full px-4 py-2 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600">
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                )}
              </button>
            </div>

            {/* ANIMATED PASSWORD STRENGTH METER */}
            {formData.password && (
              <div className="mt-2 transition-all duration-300">
                <div className="flex justify-between items-center mb-1 text-[10px] font-bold uppercase tracking-wider">
                  <span className="text-slate-400">Password Strength:</span>
                  <span style={{ color: passwordStrength.color === 'bg-red-500' ? '#ef4444' : passwordStrength.color === 'bg-amber-500' ? '#f59e0b' : '#10b981' }}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${passwordStrength.color} ${passwordStrength.width} transition-all duration-500 ease-out`} />
                </div>
              </div>
            )}
          </div>

          {/* CONFIRM PASSWORD - REGISTER ONLY */}
          {!isLoginView && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Confirm Password</label>
              <div className="relative">
                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" required value={formData.confirmPassword} onChange={handleInputChange} className="w-full px-4 py-2 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition" placeholder="••••••••" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600">
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.confirmPassword}</p>}
            </div>
          )}

          {/* Submit Action Button */}
          <button type="submit" className="w-full mt-2 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.98] transition tracking-wide text-sm">
            {isLoginView ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Dynamic Toggle Links */}
        <div className="mt-5 text-center text-xs text-slate-500">
          {isLoginView ? (
            <p>
              No account yet?{" "}
              <button type="button" onClick={() => { setIsLoginView(false); setErrors({}); }} className="text-blue-600 font-bold hover:underline">
                Create account
              </button>
            </p>
          ) : (
            <p>
              Already a member?{" "}
              <button type="button" onClick={() => { setIsLoginView(true); setErrors({}); }} className="text-blue-600 font-bold hover:underline">
                Back to Login
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default AuthModal;