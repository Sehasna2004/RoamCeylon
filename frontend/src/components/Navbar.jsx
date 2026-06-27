import React, { useState, useEffect, useRef } from 'react';

function Navbar({ onLoginClick, user, onLogout, onUpdateUser }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Profile fields state hook arrays
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');

  const fileInputRef = useRef(null);

  // Monitor shifts in state variables asynchronously
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setAvatar(user.avatar || '');
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setUpdateMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id || user._id,
          name,
          email,
          avatar,
          password
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setUpdateMessage('✅ Profile saved cleanly!');
        if (onUpdateUser) onUpdateUser(data.user);
        setTimeout(() => {
          setIsEditing(false);
          setUpdateMessage('');
          setPassword('');
        }, 1200);
      } else {
        setUpdateMessage(`❌ ${data.message || 'Update failed'}`);
      }
    } catch (err) {
      setUpdateMessage('❌ Connection fault to server.');
    }
  };

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-md shadow-sm px-6 py-4 fixed top-0 left-0 right-0 z-50 flex justify-between items-center border-b border-slate-100">
        {/* Unique Custom Logo Wrapper */}
        <div className="flex items-center space-x-2.5 group cursor-pointer">
          <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-tr from-blue-600 to-sky-400 rounded-xl shadow-md shadow-blue-500/20 transform group-hover:rotate-6 transition duration-300">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="white" 
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span className="absolute inset-0 rounded-xl border border-white/30 scale-90 group-hover:scale-110 transition duration-300"></span>
          </div>

          {/* Brand Typography */}
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black text-slate-800 tracking-tight">
              Roam<span className="text-blue-600 bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Ceylon</span>
            </span>
            <span className="text-[10px] font-bold text-sky-500 tracking-widest uppercase mt-0.5 pl-0.5">
              Island Escapes
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-slate-600 font-semibold text-sm tracking-wide">
          <a href="#" className="hover:text-blue-600 transition duration-300">Destinations</a>
          <a href="#" className="hover:text-blue-600 transition duration-300">Hotels & Cabanas</a>
          <a href="#" className="hover:text-blue-600 transition duration-300">About Sri Lanka</a>
        </div>

        {/* Right Side Action Profile CTA */}
        <div className="relative">
          {user ? (
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => { setIsDropdownOpen(!isDropdownOpen); setIsEditing(false); }}
                className="flex items-center space-x-2 focus:outline-none z-50 relative"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm transition hover:border-blue-400">
                  {user.avatar ? (
                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                      {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                    </div>
                  )}
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute top-12 right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 max-h-[85vh] overflow-y-auto">
                  {!isEditing ? (
                    <>
                      <div className="px-4 py-3 border-b border-slate-50 bg-slate-50/50 text-center">
                        <div className="w-14 h-14 rounded-full overflow-hidden mx-auto border-2 border-white shadow-sm mb-2">
                          {user.avatar ? (
                            <img src={user.avatar} alt="User Avatar" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-blue-600 text-white font-bold flex items-center justify-center text-xl">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <p className="text-sm font-black text-slate-800 truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email || 'No email attached'}</p>
                      </div>

                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-full text-left px-4 py-2 mt-1 text-sm text-slate-700 hover:bg-slate-50 font-semibold flex items-center space-x-2 transition"
                      >
                        ⚙️ <span>Manage Settings</span>
                      </button>

                      <button 
                        onClick={() => { setIsDropdownOpen(false); onLogout(); }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-semibold flex items-center space-x-2 border-t border-slate-100 mt-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="p-4 space-y-3">
                      <div className="text-center">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2">Modify Account</h4>
                        <div className="relative w-16 h-16 mx-auto group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                          <div className="w-full h-full rounded-full overflow-hidden border bg-slate-100">
                            {avatar ? (
                              <img src={avatar} className="w-full h-full object-cover" alt="Preview"/>
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No Pic</div>
                            )}
                          </div>
                          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
                            <span className="text-[9px] text-white font-bold uppercase">Edit</span>
                          </div>
                        </div>
                        <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleFileChange} />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Full Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg px-2.5 py-1 text-sm focus:outline-none focus:border-blue-500" required />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-lg px-2.5 py-1 text-sm focus:outline-none focus:border-blue-500" required />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Password Reset</label>
                        <input type="password" placeholder="Leave empty to keep current" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-blue-500" />
                      </div>

                      {updateMessage && (
                        <p className="text-[11px] font-bold text-center mt-1 text-slate-700">{updateMessage}</p>
                      )}

                      <div className="flex space-x-2 pt-2">
                        <button type="button" onClick={() => setIsEditing(false)} className="w-1/2 text-xs font-bold border rounded-lg py-1.5 text-slate-500 hover:bg-slate-50">Cancel</button>
                        <button type="submit" className="w-1/2 text-xs font-bold bg-blue-600 text-white rounded-lg py-1.5 hover:bg-blue-700 shadow-sm">Save</button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-md transition duration-300 transform hover:-translate-y-0.5"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      {/* Backdrop overlay closer to close contextual windows safely */}
      {isDropdownOpen && (
        <div className="fixed inset-0 z-40 bg-transparent" onClick={() => { setIsDropdownOpen(false); setIsEditing(false); }} />
      )}
    </>
  );
}

export default Navbar;