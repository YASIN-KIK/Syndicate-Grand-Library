import React, { useState, useEffect } from 'react';
import { User } from '@/types';
import { X, UserCheck, Crown, Shield, Check, Sparkles } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onSaveUser: (updatedUser: User) => void;
  siteTheme: 'black' | 'white';
}

const AVATAR_OPTIONS = ['👑', '🗡️', '🐺', '🐍', '🥀', '🔥', '⚡', '⚜️', '🖤', '💎', '🦅', '👤'];

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSaveUser,
  siteTheme
}) => {
  const [name, setName] = useState('');
  const [penName, setPenName] = useState('');
  const [allegiance, setAllegiance] = useState('');
  const [email, setEmail] = useState('');
  const [avatarSeed, setAvatarSeed] = useState('👑');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setPenName(currentUser.penName || currentUser.name || '');
      setAllegiance(currentUser.allegiance || 'Gonçalves-Volkov Sovereign Alliance');
      setEmail(currentUser.email || '');
    } else {
      setName('VIP Syndicate Reader');
      setPenName('Reader');
      setAllegiance('Independent Syndicate Guild');
      setEmail('reader@syndicate.net');
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const updatedUser: User = {
      id: currentUser?.id || `usr-${Date.now()}`,
      name: name.trim(),
      penName: penName.trim() || name.trim(),
      email: email.trim() || currentUser?.email || 'reader@syndicate.net',
      role: currentUser?.role || 'reader',
      allegiance: allegiance.trim() || 'Gonçalves-Volkov Sovereign Alliance',
      canAccessFullStory: currentUser?.canAccessFullStory || false,
      createdAt: currentUser?.createdAt || new Date().toISOString()
    };

    onSaveUser(updatedUser);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 700);
  };

  const isDark = siteTheme === 'black';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-md rounded-2xl shadow-2xl p-6 border transition-colors ${
          isDark
            ? 'bg-zinc-950 border-amber-500/40 text-zinc-100'
            : 'bg-white border-zinc-300 text-zinc-900 shadow-xl'
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1.5 rounded-full transition-colors ${
            isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-900' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl border border-amber-500/50 bg-amber-500/10 flex items-center justify-center text-2xl shadow-inner">
            {avatarSeed}
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold tracking-tight">
              Change Username & Profile
            </h3>
            <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Customize your syndicate identity, author byline, and allegiance
            </p>
          </div>
        </div>

        {savedSuccess ? (
          <div className="p-6 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base">Profile Updated Successfully</h4>
            <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Changes are active across the website, chat, and author bylines.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Avatar picker */}
            <div>
              <label className={`block text-xs font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Choose Identity Emblem
              </label>
              <div className="flex flex-wrap gap-2">
                {AVATAR_OPTIONS.map((av) => (
                  <button
                    type="button"
                    key={av}
                    onClick={() => setAvatarSeed(av)}
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center text-lg transition-transform ${
                      avatarSeed === av
                        ? 'border-amber-500 bg-amber-500/20 scale-110 shadow'
                        : isDark
                        ? 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                        : 'border-zinc-200 bg-zinc-100 hover:border-zinc-300'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {/* Display Name */}
            <div>
              <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                User / Display Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your username..."
                className={`w-full rounded-xl px-3.5 py-2 text-sm border focus:outline-none focus:border-amber-500 transition-colors ${
                  isDark
                    ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500'
                    : 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder-zinc-400'
                }`}
              />
            </div>

            {/* Pen Name */}
            <div>
              <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Author Pen Name (Cover Byline)
              </label>
              <input
                type="text"
                value={penName}
                onChange={(e) => setPenName(e.target.value)}
                placeholder="Your author byline..."
                className={`w-full rounded-xl px-3.5 py-2 text-sm border focus:outline-none focus:border-amber-500 transition-colors ${
                  isDark
                    ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500'
                    : 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder-zinc-400'
                }`}
              />
            </div>

            {/* Syndicate Allegiance */}
            <div>
              <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Syndicate Allegiance
              </label>
              <select
                value={allegiance}
                onChange={(e) => setAllegiance(e.target.value)}
                className={`w-full rounded-xl px-3.5 py-2 text-sm border focus:outline-none focus:border-amber-500 transition-colors ${
                  isDark
                    ? 'bg-zinc-900 border-zinc-800 text-white'
                    : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                }`}
              >
                <option value="Gonçalves-Volkov Sovereign Alliance">Gonçalves-Volkov Sovereign Alliance</option>
                <option value="Supreme Volkov-Gonçalves Council">Supreme Volkov-Gonçalves Council</option>
                <option value="Siberian Volkov Bratva">Siberian Volkov Bratva</option>
                <option value="Sicilian Camorra & Cosa Nostra">Sicilian Camorra & Cosa Nostra</option>
                <option value="Irish Callahan Brotherhood">Irish Callahan Brotherhood</option>
                <option value="Independent Guild">Independent Guild</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all mt-2"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
