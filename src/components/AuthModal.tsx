import React, { useState } from 'react';
import { User, Role } from '@/types';
import { X, Shield, Lock, Mail, UserCheck, Feather, Crown, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register State
  const [regName, setRegName] = useState('');
  const [regPenName, setRegPenName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<Role>('reader');
  const [regAllegiance, setRegAllegiance] = useState('Gonçalves-Volkov Sovereign Alliance');
  const [regSuccess, setRegSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const emailTrim = loginEmail.trim().toLowerCase();
    const passTrim = loginPassword.trim();

    // Check for Admin
    if (emailTrim === 'yasinkik@outlook.com' && passTrim === 'YASINKIK01') {
      const adminUser: User = {
        id: 'admin-1',
        name: 'High Chancellor Yasin Kik',
        email: 'YASINKIK@outlook.com',
        role: 'admin',
        penName: 'Sovereign Chancellor',
        allegiance: 'Supreme Volkov-Gonçalves Council',
        canAccessFullStory: true,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('syndicate_current_user', JSON.stringify(adminUser));
      onLogin(adminUser);
      onClose();
      return;
    }

    // Check local registered accounts
    const existingUsers: User[] = JSON.parse(localStorage.getItem('syndicate_users') || '[]');
    const matched = existingUsers.find(u => u.email.toLowerCase() === emailTrim);

    if (matched) {
      localStorage.setItem('syndicate_current_user', JSON.stringify(matched));
      onLogin(matched);
      onClose();
      return;
    }

    // Generic fallback for demo credentials if valid email/pass
    if (emailTrim.includes('@') && passTrim.length >= 4) {
      const standardUser: User = {
        id: `user-${Date.now()}`,
        name: emailTrim.split('@')[0],
        email: emailTrim,
        role: 'reader',
        allegiance: 'Independent Syndicate Reader',
        canAccessFullStory: false,
        createdAt: new Date().toISOString()
      };
      existingUsers.push(standardUser);
      localStorage.setItem('syndicate_users', JSON.stringify(existingUsers));
      localStorage.setItem('syndicate_current_user', JSON.stringify(standardUser));
      onLogin(standardUser);
      onClose();
      return;
    }

    setLoginError('Invalid credentials. Please verify your email and password.');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail.trim() || !regPassword.trim() || !regName.trim()) return;

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: regName.trim(),
      penName: regPenName.trim() || regName.trim(),
      email: regEmail.trim(),
      role: regRole,
      allegiance: regAllegiance,
      canAccessFullStory: regRole === 'admin' || regRole === 'assistant' || regRole === 'moderator',
      createdAt: new Date().toISOString()
    };

    const existingUsers: User[] = JSON.parse(localStorage.getItem('syndicate_users') || '[]');
    existingUsers.push(newUser);
    localStorage.setItem('syndicate_users', JSON.stringify(existingUsers));
    localStorage.setItem('syndicate_current_user', JSON.stringify(newUser));

    setRegSuccess(true);
    setTimeout(() => {
      onLogin(newUser);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-zinc-950 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner */}
        <div className="p-6 bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-zinc-800 text-center relative">
          <div className="w-12 h-12 rounded-full border border-amber-500/40 bg-black/80 mx-auto flex items-center justify-center mb-2 shadow-inner">
            <Lock className="w-6 h-6 text-amber-400" />
          </div>
          <h3 className="font-serif text-xl font-bold text-white tracking-wide">
            Syndicate Access Terminal
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Authenticate for Member Clearance & Author Privileges
          </p>

          {/* Tab Selector */}
          <div className="flex border border-zinc-800 rounded-lg p-1 bg-black/50 mt-4 max-w-xs mx-auto">
            <button
              onClick={() => { setTab('login'); setLoginError(''); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                tab === 'login'
                  ? 'bg-amber-500 text-zinc-950 shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab('register'); setRegSuccess(false); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                tab === 'register'
                  ? 'bg-amber-500 text-zinc-950 shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {tab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="p-2.5 rounded-lg bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Enter clearance email..."
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                  Access Key / Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter security key..."
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold font-sans shadow-lg shadow-amber-500/20 transition-all text-sm mt-2"
              >
                Authenticate Clearance
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              {regSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-sm">Account Cleared</h4>
                  <p className="text-xs text-emerald-300">Granting clearance into the Grand Library...</p>
                </div>
              ) : (
                <>
                  {/* Role Selection */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      Select Account Clearance
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setRegRole('reader')}
                        className={`p-2.5 rounded-lg border text-left flex items-start gap-2 transition-all ${
                          regRole === 'reader'
                            ? 'bg-amber-500/15 border-amber-400 text-white shadow'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        <UserCheck className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-amber-200">VIP Reader</div>
                          <div className="text-[10px] text-zinc-400 leading-tight">Read previews, shelf & audio</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRegRole('author')}
                        className={`p-2.5 rounded-lg border text-left flex items-start gap-2 transition-all ${
                          regRole === 'author'
                            ? 'bg-amber-500/15 border-amber-400 text-white shadow'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        <Feather className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-amber-200">Author / Chronicler</div>
                          <div className="text-[10px] text-zinc-400 leading-tight">Write & publish novels</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Name & Pen Name */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                        Full Name / Alias
                      </label>
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Your name..."
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                        Author Pen Name
                      </label>
                      <input
                        type="text"
                        value={regPenName}
                        onChange={(e) => setRegPenName(e.target.value)}
                        placeholder="Byline pen name..."
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Allegiance */}
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                      Syndicate Allegiance
                    </label>
                    <select
                      value={regAllegiance}
                      onChange={(e) => setRegAllegiance(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-400"
                    >
                      <option value="Gonçalves-Volkov Sovereign Alliance">Gonçalves-Volkov Sovereign Alliance</option>
                      <option value="Sicilian Camorra & Cosa Nostra">Sicilian Camorra & Cosa Nostra</option>
                      <option value="Siberian Volkov Bratva">Siberian Volkov Bratva</option>
                      <option value="Irish Callahan Syndicate">Irish Callahan Syndicate</option>
                      <option value="Independent Guild">Independent Guild</option>
                    </select>
                  </div>

                  {/* Email & Password */}
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="Clearance email..."
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                      Secure Password
                    </label>
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Create security password..."
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold font-sans shadow-lg shadow-amber-500/20 transition-all text-xs mt-2"
                  >
                    Confirm Registration & Issue Clearance
                  </button>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
