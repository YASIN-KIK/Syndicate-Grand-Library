import React, { useState, useEffect, useRef } from 'react';
import { Friend, ChatMessage, User } from '@/types';
import {
  MessageSquare, UserPlus, Users, Search, Send, Trash2, Check,
  Sparkles, Shield, Crown, Circle, Phone, MoreVertical, X, Lock
} from 'lucide-react';

interface FriendsChatViewProps {
  currentUser: User | null;
  onOpenAuth: () => void;
}

const DEFAULT_FRIENDS: Friend[] = [
  {
    id: 'f-egor',
    name: 'Egor Volkov',
    email: 'egor.volkov@syndicate.net',
    avatarSeed: '🐺',
    tagline: 'Sole Heir to #1 Russian-Portuguese Syndicate',
    allegiance: 'Volkov-Gonçalves Dynasty',
    status: 'online',
    isCharacter: true,
    characterKey: 'egor',
    unreadCount: 1
  },
  {
    id: 'f-slay',
    name: 'Slay Gonçalves',
    email: 'slay.goncalves@syndicate.net',
    avatarSeed: '🗡️',
    tagline: 'Heiress & Master Blade Enforcer',
    allegiance: 'Volkov-Gonçalves Dynasty',
    status: 'online',
    isCharacter: true,
    characterKey: 'slay',
    unreadCount: 0
  },
  {
    id: 'f-yasin',
    name: 'Yasin (Author)',
    email: 'YASINKIK@outlook.com',
    avatarSeed: '👑',
    tagline: 'Author of Bound by Spite & Syndicate Chronicler',
    allegiance: 'Supreme Author & High Chancellor',
    status: 'online',
    isCharacter: true,
    characterKey: 'yasin',
    unreadCount: 2
  },
  {
    id: 'f-nikolai',
    name: 'Nikolai Vance',
    email: 'nikolai.vance@bratva.ru',
    avatarSeed: '⚡',
    tagline: 'Vicious Crown Don',
    allegiance: 'Russian Bratva Sovereign',
    status: 'away',
    isCharacter: true,
    characterKey: 'nikolai',
    unreadCount: 0
  },
  {
    id: 'f-valentina',
    name: 'Valentina Reyes',
    email: 'valentina.reyes@cartel.es',
    avatarSeed: '🥀',
    tagline: 'Lethal Heiress & Strategist',
    allegiance: 'Iberian Cartel Alliance',
    status: 'online',
    isCharacter: true,
    characterKey: 'valentina',
    unreadCount: 0
  }
];

const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  'f-egor': [
    {
      id: 'm-1',
      senderId: 'f-egor',
      receiverId: 'self',
      text: "Port routes in Lisbon and Marseille are locked down under joint Volkov-Gonçalves guard. What's your status?",
      timestamp: '10:14 AM',
      isSelf: false
    },
    {
      id: 'm-2',
      senderId: 'self',
      receiverId: 'f-egor',
      text: "All manifests are verified clean. Did Slay find out about your watch on the counter?",
      timestamp: '10:15 AM',
      isSelf: true
    },
    {
      id: 'm-3',
      senderId: 'f-egor',
      receiverId: 'self',
      text: "She threatened to hyperextend my elbow with her fountain pen again. Worth it just to watch her eyes turn to obsidian.",
      timestamp: '10:17 AM',
      isSelf: false
    }
  ],
  'f-slay': [
    {
      id: 'm-slay-1',
      senderId: 'f-slay',
      receiverId: 'self',
      text: "Make sure no unauthorized transports enter Cascais perimeter tonight. Zero alcohol, zero smoke in the vehicles. No exceptions.",
      timestamp: '09:30 AM',
      isSelf: false
    }
  ],
  'f-yasin': [
    {
      id: 'm-yasin-1',
      senderId: 'f-yasin',
      receiverId: 'self',
      text: "Welcome to the Syndicate Grand Library! Co-authored 'Bound by Spite' alongside Kisha, and I've also penned 24 other sovereign romance novels across the catalog. What are you reading today?",
      timestamp: '08:45 AM',
      isSelf: false
    }
  ],
  'f-nikolai': [
    {
      id: 'm-nik-1',
      senderId: 'f-nikolai',
      receiverId: 'self',
      text: "The Saint Petersburg council is quiet for now. Keep your weapons loaded.",
      timestamp: 'Yesterday',
      isSelf: false
    }
  ],
  'f-valentina': [
    {
      id: 'm-val-1',
      senderId: 'f-valentina',
      receiverId: 'self',
      text: "Checking in on the Iberian borders. Always a pleasure working with true professionals.",
      timestamp: 'Yesterday',
      isSelf: false
    }
  ]
};

export const FriendsChatView: React.FC<FriendsChatViewProps> = ({ currentUser, onOpenAuth }) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [activeFriendId, setActiveFriendId] = useState<string>('f-egor');
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({});
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Add Friend Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  const [newFriendEmail, setNewFriendEmail] = useState('');
  const [newFriendAllegiance, setNewFriendAllegiance] = useState('Gonçalves-Volkov Sovereign Alliance');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const storedFriends = localStorage.getItem('syndicate_friends');
      if (storedFriends) {
        setFriends(JSON.parse(storedFriends));
      } else {
        setFriends(DEFAULT_FRIENDS);
        localStorage.setItem('syndicate_friends', JSON.stringify(DEFAULT_FRIENDS));
      }

      const storedMessages = localStorage.getItem('syndicate_chat_messages');
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        setMessages(INITIAL_MESSAGES);
        localStorage.setItem('syndicate_chat_messages', JSON.stringify(INITIAL_MESSAGES));
      }
    } catch {
      setFriends(DEFAULT_FRIENDS);
      setMessages(INITIAL_MESSAGES);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeFriendId, isTyping]);

  const activeFriend = friends.find(f => f.id === activeFriendId) || friends[0];
  const activeChatList = activeFriend ? (messages[activeFriend.id] || []) : [];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || messageInput).trim();
    if (!text || !activeFriend) return;

    if (!textToSend) setMessageInput('');

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'self',
      receiverId: activeFriend.id,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true
    };

    const updated = {
      ...messages,
      [activeFriend.id]: [...activeChatList, newMsg]
    };
    setMessages(updated);
    localStorage.setItem('syndicate_chat_messages', JSON.stringify(updated));

    // Send to live server endpoint for genuine real in-character responses
    setIsTyping(true);
    try {
      const historyTurns = (updated[activeFriend.id] || []).map(m => ({
        role: m.isSelf ? 'user' : 'assistant',
        content: m.text
      }));

      const res = await fetch('/api/chat/character', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          characterKey: activeFriend.characterKey || 'custom',
          name: activeFriend.name,
          message: text,
          history: historyTurns,
          user_name: currentUser?.penName || currentUser?.name || 'Reader',
          allegiance: currentUser?.allegiance || 'Syndicate Member'
        })
      });

      if (res.ok) {
        const data = await res.json();
        const replyText = data.reply || `[${activeFriend.name}] Transmission confirmed.`;
        const botReply: ChatMessage = {
          id: `reply-${Date.now()}`,
          senderId: activeFriend.id,
          receiverId: 'self',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isSelf: false
        };

        const finalMessages = {
          ...updated,
          [activeFriend.id]: [...(updated[activeFriend.id] || []), botReply]
        };
        setMessages(finalMessages);
        localStorage.setItem('syndicate_chat_messages', JSON.stringify(finalMessages));
      } else {
        throw new Error('Server response not ok');
      }
    } catch (e) {
      // Fallback
      const fallbackReply: ChatMessage = {
        id: `reply-${Date.now()}`,
        senderId: activeFriend.id,
        receiverId: 'self',
        text: `[${activeFriend.name}] Intel received, ${currentUser?.name || 'Reader'}. I've logged the transmission. Stay sharp and check your perimeter.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: false
      };
      const finalMessages = {
        ...updated,
        [activeFriend.id]: [...(updated[activeFriend.id] || []), fallbackReply]
      };
      setMessages(finalMessages);
      localStorage.setItem('syndicate_chat_messages', JSON.stringify(finalMessages));
    } finally {
      setIsTyping(false);
    }
  };

  const handleAddCustomFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFriendName.trim()) return;

    const newFriend: Friend = {
      id: `f-${Date.now()}`,
      name: newFriendName.trim(),
      email: newFriendEmail.trim() || `${newFriendName.toLowerCase().replace(/\s+/g, '.')}@syndicate.net`,
      avatarSeed: '👤',
      tagline: 'Syndicate Member & Reader Ally',
      allegiance: newFriendAllegiance,
      status: 'online',
      isCharacter: false,
      characterKey: 'custom',
      unreadCount: 0
    };

    const updatedFriends = [newFriend, ...friends];
    setFriends(updatedFriends);
    localStorage.setItem('syndicate_friends', JSON.stringify(updatedFriends));

    // Welcome message
    const welcomeMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: newFriend.id,
      receiverId: 'self',
      text: `Hello ${currentUser?.name || 'there'}! Thanks for adding me to your Syndicate Friends network. Ready to chat in real-time, share theories, and talk books!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: false
    };

    const updatedMessages = {
      ...messages,
      [newFriend.id]: [welcomeMsg]
    };
    setMessages(updatedMessages);
    localStorage.setItem('syndicate_chat_messages', JSON.stringify(updatedMessages));

    setActiveFriendId(newFriend.id);
    setShowAddModal(false);
    setNewFriendName('');
    setNewFriendEmail('');
  };

  const handleRemoveFriend = (friendId: string) => {
    const updated = friends.filter(f => f.id !== friendId);
    setFriends(updated);
    localStorage.setItem('syndicate_friends', JSON.stringify(updated));
    if (activeFriendId === friendId && updated.length > 0) {
      setActiveFriendId(updated[0].id);
    }
  };

  const handleClearChat = (friendId: string) => {
    const updated = {
      ...messages,
      [friendId]: []
    };
    setMessages(updated);
    localStorage.setItem('syndicate_chat_messages', JSON.stringify(updated));
  };

  const filteredFriends = friends.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.allegiance.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const quickPrompts = [
    "What is your plan for the Lisbon docks tonight?",
    "Where are you right now?",
    "Watch your perimeter.",
    "Did you write Bound by Spite?",
    "Tell me about Slay's rules."
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border border-amber-500/40 shadow-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl border-2 border-amber-400/50 bg-black/80 flex items-center justify-center shadow-lg text-2xl">
            💬
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                Live Interactive Comms
              </span>
              <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{friends.filter(f => f.status === 'online').length} Friends Online • Real Dynamic Replies</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Syndicate Friends & Direct Chat
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Talk for real with Egor Volkov, Slay Gonçalves, Author Yasin, or add your friends to chat.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Friend</span>
        </button>
      </div>

      {/* Main Chat Layout: 2-Column Desktop Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[680px] bg-zinc-950/80 border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl">
        {/* LEFT COLUMN: FRIENDS LIST */}
        <div className="md:col-span-5 lg:col-span-4 border-r border-zinc-800 flex flex-col h-full bg-zinc-950">
          {/* Search friends */}
          <div className="p-3.5 border-b border-zinc-800">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search friends or contacts..."
                className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Friends List */}
          <div className="flex-1 overflow-y-auto divide-y divide-zinc-900/60 p-2 space-y-1">
            {filteredFriends.map((friend) => {
              const isActive = friend.id === activeFriend?.id;
              const friendMsgs = messages[friend.id] || [];
              const lastMsg = friendMsgs[friendMsgs.length - 1];

              return (
                <button
                  key={friend.id}
                  onClick={() => setActiveFriendId(friend.id)}
                  className={`w-full p-3 rounded-xl text-left flex items-start gap-3 transition-all ${
                    isActive
                      ? 'bg-amber-500/15 border border-amber-400/60 shadow-md'
                      : 'hover:bg-zinc-900/70 border border-transparent'
                  }`}
                >
                  {/* Avatar Seed with Online Indicator */}
                  <div className="relative shrink-0">
                    <div className="w-11 h-11 rounded-full border border-amber-400/40 bg-zinc-900 flex items-center justify-center text-lg shadow">
                      {friend.avatarSeed}
                    </div>
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-zinc-950 ${
                        friend.status === 'online' ? 'bg-emerald-500' : 'bg-zinc-600'
                      }`}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white truncate flex items-center gap-1 font-serif">
                        <span>{friend.name}</span>
                        {friend.characterKey === 'yasin' && (
                          <Crown className="w-3 h-3 text-amber-400" />
                        )}
                      </h4>
                      {lastMsg && (
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {lastMsg.timestamp}
                        </span>
                      )}
                    </div>

                    <p className="text-[10px] text-amber-300/80 font-mono truncate">
                      {friend.allegiance}
                    </p>

                    <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                      {lastMsg ? lastMsg.text : friend.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Bar in Friends List */}
          <div className="p-3 border-t border-zinc-800 bg-zinc-900/40 flex items-center justify-between text-xs text-zinc-400">
            <span>{friends.length} Contacts Linked</span>
            <button
              onClick={() => setShowAddModal(true)}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add Friend</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE CHAT THREAD */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col h-full bg-black/60">
          {activeFriend ? (
            <>
              {/* Active Friend Header */}
              <div className="p-3.5 border-b border-zinc-800 bg-zinc-950/90 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full border border-amber-400/50 bg-zinc-900 flex items-center justify-center text-lg shadow">
                      {activeFriend.avatarSeed}
                    </div>
                    <span
                      className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-zinc-950 ${
                        activeFriend.status === 'online' ? 'bg-emerald-500' : 'bg-zinc-600'
                      }`}
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5 font-serif">
                      <span>{activeFriend.name}</span>
                      <span className="text-[9px] text-emerald-400 font-mono uppercase bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/30">
                        {activeFriend.status}
                      </span>
                    </h3>
                    <p className="text-[10px] text-zinc-400">
                      {activeFriend.allegiance} • {activeFriend.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleClearChat(activeFriend.id)}
                    className="p-2 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-zinc-900 transition-colors"
                    title="Clear Chat History"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleRemoveFriend(activeFriend.id)}
                    className="p-2 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-zinc-900 transition-colors text-xs flex items-center gap-1"
                    title="Remove Friend"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-black/80 to-zinc-950">
                <div className="text-center my-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 bg-zinc-900/80 px-3 py-1 rounded-full border border-zinc-800">
                    Live Server-Connected Encrypted Transmission
                  </span>
                </div>

                {activeChatList.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-lg ${
                        msg.isSelf
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-medium rounded-br-none shadow-amber-500/10'
                          : 'bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-bl-none font-sans'
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-[13px]">{msg.text}</p>
                      <span
                        className={`text-[9px] font-mono mt-1 block text-right ${
                          msg.isSelf ? 'text-zinc-950/70' : 'text-zinc-500'
                        }`}
                      >
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-1.5 text-zinc-400 text-xs italic bg-zinc-900/60 p-2 rounded-lg max-w-[140px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[11px] ml-1 text-zinc-300">{activeFriend.name} is typing...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Starter Chips */}
              <div className="px-3 py-2 bg-zinc-950 border-t border-zinc-900 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider shrink-0 mr-1">
                  Prompt:
                </span>
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p)}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 hover:border-amber-500/40 transition-colors shrink-0 font-sans"
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Input Bar */}
              <div className="p-3 bg-zinc-950 border-t border-amber-500/30 flex items-center gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={`Send message to ${activeFriend.name}...`}
                  className="flex-1 bg-zinc-900 border border-zinc-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!messageInput.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold disabled:opacity-40 transition-all shadow-md shadow-amber-500/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-zinc-500">
              <MessageSquare className="w-12 h-12 mb-3 stroke-1 text-zinc-700" />
              <h3 className="text-base font-bold text-zinc-300">No Friend Selected</h3>
              <p className="text-xs text-zinc-500 mt-1">
                Select a contact on the left or add a new friend to start an encrypted chat.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ADD FRIEND MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-zinc-950 border border-amber-500/40 rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl border border-amber-400/50 bg-black flex items-center justify-center text-xl shadow">
                👥
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-white">
                  Add Friend to Syndicate Network
                </h3>
                <p className="text-xs text-zinc-400">
                  Connect with fellow readers, syndicate authors like Yasin, or cartel associates.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleAddCustomFriend} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1 uppercase">
                  Friend Name / Alias
                </label>
                <input
                  type="text"
                  required
                  value={newFriendName}
                  onChange={(e) => setNewFriendName(e.target.value)}
                  placeholder="e.g. Mateo Rossi or Sofia"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1 uppercase">
                  Clearance Email (Optional)
                </label>
                <input
                  type="email"
                  value={newFriendEmail}
                  onChange={(e) => setNewFriendEmail(e.target.value)}
                  placeholder="friend@syndicate.net"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1 uppercase">
                  Syndicate Allegiance / Guild
                </label>
                <select
                  value={newFriendAllegiance}
                  onChange={(e) => setNewFriendAllegiance(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="Gonçalves-Volkov Sovereign Alliance">Gonçalves-Volkov Sovereign Alliance</option>
                  <option value="Sicilian Camorra & Cosa Nostra">Sicilian Camorra & Cosa Nostra</option>
                  <option value="Siberian Volkov Bratva">Siberian Volkov Bratva</option>
                  <option value="Irish Callahan Brotherhood">Irish Callahan Brotherhood</option>
                  <option value="VIP Readers Circle">VIP Readers Circle</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-zinc-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all mt-4"
              >
                Send Friend Transmission & Connect
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
