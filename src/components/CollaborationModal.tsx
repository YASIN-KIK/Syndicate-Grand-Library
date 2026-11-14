import React, { useState } from 'react';
import { Book, User, CollaborationRequest } from '@/types';
import { X, Sparkles, Feather, Check, Users, ArrowRight, Shield } from 'lucide-react';

interface CollaborationModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
  currentUser: User | null;
  onSendRequest: (req: CollaborationRequest) => void;
  siteTheme: 'black' | 'white';
}

export const CollaborationModal: React.FC<CollaborationModalProps> = ({
  isOpen,
  onClose,
  book,
  currentUser,
  onSendRequest,
  siteTheme
}) => {
  const [role, setRole] = useState<'co-author' | 'lore-consultant' | 'dialogue-writer' | 'editor'>('co-author');
  const [pitch, setPitch] = useState('');
  const [chapterTitle, setChapterTitle] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !book) return null;

  const isDark = siteTheme === 'black';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitch.trim()) return;

    const req: CollaborationRequest = {
      id: `collab-${Date.now()}`,
      bookId: book.id,
      bookTitle: book.title,
      requesterId: currentUser?.id,
      requesterName: currentUser?.name || 'Anonymous Author',
      requesterPenName: currentUser?.penName || currentUser?.name || 'Collaborator',
      requesterEmail: currentUser?.email || 'collaborator@syndicate.net',
      targetAuthor: book.author,
      role,
      pitch: pitch.trim(),
      proposedChapterTitle: chapterTitle.trim() || undefined,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    onSendRequest(req);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-lg rounded-2xl shadow-2xl p-6 border transition-colors ${
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

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center shadow-lg">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold">Collaboration Request Sent!</h3>
            <p className={`text-xs max-w-sm mx-auto ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Your proposal to co-create with <span className="font-semibold text-amber-500">{book.author}</span> on <span className="italic">"{book.title}"</span> has been transmitted. You can manage collaborations in the Author Studio.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-zinc-800/40">
              <div className="w-12 h-12 rounded-xl border border-amber-500/50 bg-amber-500/10 flex items-center justify-center text-xl shadow">
                🤝
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 font-bold">
                  Syndicate Author Network
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold leading-tight">
                  Request Collaboration on "{book.title}"
                </h3>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  Target Author: <span className="font-semibold text-amber-400">{book.author}</span>
                </p>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className={`block text-xs font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Select Collaboration Role
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { key: 'co-author', label: 'Co-Author', desc: 'Write new scenes & chapters together' },
                  { key: 'dialogue-writer', label: 'Dialogue & Banter', desc: 'Craft lethal verbal sparring' },
                  { key: 'lore-consultant', label: 'Lore & Syndicate', desc: 'Design cartel alliances & specs' },
                  { key: 'editor', label: 'Story Editor', desc: 'Refine pacing, style & continuity' }
                ].map((r) => (
                  <button
                    type="button"
                    key={r.key}
                    onClick={() => setRole(r.key as any)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      role === r.key
                        ? 'border-amber-500 bg-amber-500/15 shadow'
                        : isDark
                        ? 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700'
                        : 'border-zinc-200 bg-zinc-50 hover:border-zinc-300'
                    }`}
                  >
                    <div className="font-bold text-amber-500">{r.label}</div>
                    <div className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-zinc-500'} leading-tight`}>{r.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Proposed Chapter / Arc Title */}
            <div>
              <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Proposed Chapter or Arc Title (Optional)
              </label>
              <input
                type="text"
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
                placeholder="e.g. Chapter 18: The Siberian Crossfire"
                className={`w-full rounded-xl px-3.5 py-2 text-xs border focus:outline-none focus:border-amber-500 transition-colors ${
                  isDark
                    ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500'
                    : 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder-zinc-400'
                }`}
              />
            </div>

            {/* Story Pitch & Ideas */}
            <div>
              <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Collaboration Pitch & Scene Concept
              </label>
              <textarea
                rows={4}
                required
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                placeholder="Explain what scenes, dialogue, or plot twists you want to add to this story..."
                className={`w-full rounded-xl px-3.5 py-2 text-xs border focus:outline-none focus:border-amber-500 transition-colors font-sans ${
                  isDark
                    ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500'
                    : 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder-zinc-400'
                }`}
              />
            </div>

            {/* Your Byline */}
            <div className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
              isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
            }`}>
              <div>
                <span className={`text-[10px] block ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  Submitting As
                </span>
                <span className="font-bold text-amber-500">
                  {currentUser?.penName || currentUser?.name || 'VIP Reader / Guest Author'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">
                Co-Author Request
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5"
            >
              <Feather className="w-4 h-4" />
              <span>Send Collaboration Proposal</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
