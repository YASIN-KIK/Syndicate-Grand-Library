import React, { useState, useEffect } from 'react';
import { User, Role } from '@/types';
import { Crown, Shield, UserCheck, ShieldAlert, Check, X, UserPlus, Sparkles, Search } from 'lucide-react';

interface AdminCouncilProps {
  currentUser: User | null;
  onUpdateUser: (user: User) => void;
}

export const AdminCouncil: React.FC<AdminCouncilProps> = ({ currentUser, onUpdateUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  
  // Appoint Modal state
  const [showAppointModal, setShowAppointModal] = useState(false);
  const [appointName, setAppointName] = useState('');
  const [appointEmail, setAppointEmail] = useState('');
  const [appointRole, setAppointRole] = useState<Role>('assistant');
  const [appointAllegiance, setAppointAllegiance] = useState('Supreme Volkov-Gonçalves Council');

  // Load registered users
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const raw = localStorage.getItem('syndicate_users');
    let list: User[] = raw ? JSON.parse(raw) : [];

    // Ensure default demo users exist for demonstration
    if (list.length === 0) {
      list = [
        {
          id: 'admin-1',
          name: 'High Chancellor Yasin Kik',
          email: 'YASINKIK@outlook.com',
          role: 'admin',
          penName: 'Sovereign Chancellor',
          allegiance: 'Supreme Volkov-Gonçalves Council',
          canAccessFullStory: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'usr-2',
          name: 'Genevieve Vance',
          email: 'genevieve.vance@bratva.net',
          role: 'assistant',
          penName: 'G. Vance',
          allegiance: 'Siberian Volkov Bratva',
          canAccessFullStory: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'usr-3',
          name: 'Matteo Bellini',
          email: 'm.bellini@camorra.it',
          role: 'moderator',
          penName: 'Don Bellini',
          allegiance: 'Sicilian Camorra & Cosa Nostra',
          canAccessFullStory: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'usr-4',
          name: 'Claire Moreau',
          email: 'claire.moreau@monaco.mc',
          role: 'author',
          penName: 'Claire M.',
          allegiance: 'Independent Guild',
          canAccessFullStory: false,
          createdAt: new Date().toISOString()
        },
        {
          id: 'usr-5',
          name: 'Lucas Ferreira',
          email: 'lucas.f@lisbon.pt',
          role: 'reader',
          penName: 'Lucas F.',
          allegiance: 'Gonçalves-Volkov Sovereign Alliance',
          canAccessFullStory: false,
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('syndicate_users', JSON.stringify(list));
    }
    setUsers(list);
  };

  const handleRoleChange = (userId: string, newRole: Role) => {
    const updated = users.map(u => {
      if (u.id === userId) {
        const canAccess = newRole === 'admin' || newRole === 'assistant' || newRole === 'moderator' ? true : u.canAccessFullStory;
        return { ...u, role: newRole, canAccessFullStory: canAccess };
      }
      return u;
    });
    setUsers(updated);
    localStorage.setItem('syndicate_users', JSON.stringify(updated));

    if (currentUser && currentUser.id === userId) {
      const self = updated.find(u => u.id === userId);
      if (self) onUpdateUser(self);
    }
  };

  const handleAccessToggle = (userId: string) => {
    const updated = users.map(u => {
      if (u.id === userId) {
        return { ...u, canAccessFullStory: !u.canAccessFullStory };
      }
      return u;
    });
    setUsers(updated);
    localStorage.setItem('syndicate_users', JSON.stringify(updated));

    if (currentUser && currentUser.id === userId) {
      const self = updated.find(u => u.id === userId);
      if (self) onUpdateUser(self);
    }
  };

  const handleAppointSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointName.trim() || !appointEmail.trim()) return;

    const newOfficial: User = {
      id: `off-${Date.now()}`,
      name: appointName.trim(),
      email: appointEmail.trim(),
      role: appointRole,
      allegiance: appointAllegiance,
      canAccessFullStory: true,
      createdAt: new Date().toISOString()
    };

    const updated = [...users, newOfficial];
    setUsers(updated);
    localStorage.setItem('syndicate_users', JSON.stringify(updated));

    setShowAppointModal(false);
    setAppointName('');
    setAppointEmail('');
  };

  const filteredUsers = users.filter(u => {
    const matchSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.allegiance.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const countAssistants = users.filter(u => u.role === 'assistant').length;
  const countModerators = users.filter(u => u.role === 'moderator').length;
  const countAuthors = users.filter(u => u.role === 'author').length;
  const countFullAccess = users.filter(u => u.canAccessFullStory).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      {/* Chancellor Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border border-amber-500/40 shadow-2xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl border-2 border-amber-400/50 bg-black/80 flex items-center justify-center shadow-lg">
            <Crown className="w-8 h-8 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                High Chancellor Command
              </span>
              <span className="text-xs text-zinc-400">Clearance: Level 5 Supreme</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Syndicate Sovereign Council
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Manage member clearance, appoint confidential assistants & moderators, and oversee novel access rights.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAppointModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Appoint New Official</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-center">
          <div className="text-xs text-zinc-400 font-mono uppercase">Total Members</div>
          <div className="text-2xl font-bold text-white mt-1">{users.length}</div>
        </div>
        <div className="p-4 rounded-xl bg-zinc-950 border border-amber-500/30 text-center">
          <div className="text-xs text-amber-400/90 font-mono uppercase">Appointed Assistants</div>
          <div className="text-2xl font-bold text-amber-300 mt-1">{countAssistants}</div>
        </div>
        <div className="p-4 rounded-xl bg-zinc-950 border border-blue-500/30 text-center">
          <div className="text-xs text-blue-400/90 font-mono uppercase">Council Moderators</div>
          <div className="text-2xl font-bold text-blue-300 mt-1">{countModerators}</div>
        </div>
        <div className="p-4 rounded-xl bg-zinc-950 border border-emerald-500/30 text-center">
          <div className="text-xs text-emerald-400/90 font-mono uppercase">Full Access Passes</div>
          <div className="text-2xl font-bold text-emerald-300 mt-1">{countFullAccess}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search member, email, or syndicate..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['all', 'admin', 'assistant', 'moderator', 'author', 'reader'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-colors shrink-0 ${
                roleFilter === r
                  ? 'bg-amber-500 text-zinc-950 font-bold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Members Directory Table */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-900 text-zinc-400 uppercase font-mono text-[10px] border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4">Member Identity</th>
                <th className="py-3 px-4">Syndicate Allegiance</th>
                <th className="py-3 px-4">Council Role</th>
                <th className="py-3 px-4">Story Clearance (Ch 1-17)</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-zinc-900/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <span>{user.name}</span>
                      {user.role === 'admin' && (
                        <Crown className="w-3.5 h-3.5 text-amber-400" />
                      )}
                    </div>
                    <div className="text-[11px] text-zinc-500 font-mono">{user.email}</div>
                  </td>

                  <td className="py-3.5 px-4 text-zinc-400">
                    {user.allegiance}
                  </td>

                  <td className="py-3.5 px-4">
                    <select
                      value={user.role}
                      disabled={user.role === 'admin'}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as Role)}
                      className="bg-zinc-900 border border-zinc-700 text-xs rounded px-2 py-1 text-white focus:outline-none focus:border-amber-400 disabled:opacity-50"
                    >
                      <option value="reader">VIP Reader</option>
                      <option value="author">Author</option>
                      <option value="assistant">Appointed Assistant</option>
                      <option value="moderator">Council Moderator</option>
                      {user.role === 'admin' && <option value="admin">High Chancellor (Admin)</option>}
                    </select>
                  </td>

                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleAccessToggle(user.id)}
                      disabled={user.role === 'admin'}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all ${
                        user.canAccessFullStory
                          ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300'
                          : 'bg-zinc-900 border-zinc-700 text-zinc-400'
                      }`}
                    >
                      {user.canAccessFullStory ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Full Access (Ch 1–17)</span>
                        </>
                      ) : (
                        <>
                          <X className="w-3 h-3 text-zinc-500" />
                          <span>Preview Only (Ch 1–2)</span>
                        </>
                      )}
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {user.role !== 'admin' && (
                      <button
                        onClick={() => handleRoleChange(user.id, user.role === 'assistant' ? 'reader' : 'assistant')}
                        className="text-[11px] text-amber-400 hover:text-amber-300 underline font-mono"
                      >
                        {user.role === 'assistant' ? 'Revoke Assistant' : 'Promote to Assistant'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Appoint Official Modal */}
      {showAppointModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-zinc-950 border border-amber-500/40 rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setShowAppointModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-serif font-bold text-white mb-1">
              Appoint Official to Syndicate Council
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Official appointments automatically grant full story clearance and elevated privileges.
            </p>

            <form onSubmit={handleAppointSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Official Name</label>
                <input
                  type="text"
                  required
                  value={appointName}
                  onChange={(e) => setAppointName(e.target.value)}
                  placeholder="e.g. Liam Cross"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={appointEmail}
                  onChange={(e) => setAppointEmail(e.target.value)}
                  placeholder="official@syndicate.com"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Appointed Council Title</label>
                <select
                  value={appointRole}
                  onChange={(e) => setAppointRole(e.target.value as Role)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="assistant">Appointed Assistant (Full Novel Access + AI Intel)</option>
                  <option value="moderator">Council Moderator (Full Access + Platform Moderation)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Syndicate Allegiance</label>
                <input
                  type="text"
                  value={appointAllegiance}
                  onChange={(e) => setAppointAllegiance(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-zinc-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all mt-4"
              >
                Ratify Appointment & Grant Clearance
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
