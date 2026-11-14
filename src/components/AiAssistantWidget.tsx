import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Volume2, Sparkles, User, Shield, Flame, BookOpen } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  persona: 'slay' | 'egor' | 'archivist';
  text: string;
  timestamp: string;
}

export const AiAssistantWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [persona, setPersona] = useState<'slay' | 'egor' | 'archivist'>('slay');
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      persona: 'slay',
      text: "State your business quickly. I have cargo manifests to audit and zero patience for incompetence. If you're asking about Volkov, he's currently leaving his mess elsewhere.",
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handlePersonaChange = (newPersona: 'slay' | 'egor' | 'archivist') => {
    setPersona(newPersona);
    let intro = "";
    if (newPersona === 'slay') {
      intro = "Slay Gonçalves here. Keep your questions precise. Zero smoke, zero alcohol, zero clutter. What do you need to know?";
    } else if (newPersona === 'egor') {
      intro = "Volkov here. You're interrupting my time with my wife, so this better be entertaining. What can the King of Lisbon do for you?";
    } else {
      intro = "Syndicate Central Intelligence Archive online. Clearance level: Verified. Ready to query family trees, chapter lore, and continental cartel borders.";
    }
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'assistant',
        persona: newPersona,
        text: intro,
        timestamp: 'Just now'
      }
    ]);
  };

  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (persona === 'slay') {
      utterance.rate = 1.1;
      utterance.pitch = 1.1;
    } else if (persona === 'egor') {
      utterance.rate = 0.95;
      utterance.pitch = 0.8;
    } else {
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
    }
    window.speechSynthesis.speak(utterance);
  };

  const generateReply = (query: string): string => {
    const q = query.toLowerCase();

    if (persona === 'slay') {
      if (q.includes('smoke') || q.includes('alcohol')) {
        return "Alcohol dulls the motor reflexes by fourteen percent and tobacco destroys lung capacity required for close-quarters evasion. In our world, an impaired mind is a corpse waiting for a coroner. I do neither.";
      }
      if (q.includes('egor') && (q.includes('love') || q.includes('fall'))) {
        return "He broke into my archive table, crushed pens, left watches on my counters, and stepped in front of a blade meant for me. I tried hating him—it became strategically inconvenient. Now he's my husband and the only man permitted in my perimeter.";
      }
      if (q.includes('wedding') || q.includes('knife') || q.includes('blade')) {
        return "It was a carbon-fiber ceramic karambit strapped to my left silk garter. Six hundred armed syndicate enforcers filled the Sé de Lisboa. I don't walk into church as a sacrifice; I walk in as an apex predator.";
      }
      if (q.includes('season 1') || q.includes('season 2') || q.includes('season 3') || q.includes('recap')) {
        return "Season 1 was the forced treaty, the armed wedding, and executing Oubiña in Porto. Season 2 was crushing Julian Moreau, poisoning at Sintra, and the Saint Petersburg steel cage. Season 3 was our graduation ambush, Venice, saving my brother Tiago on the Atlantic rig, and our eternal dynasty.";
      }
      return "An interesting question. But remember: in this syndicate, words are collateral. Keep your discipline sharp and don't make me repeat myself.";
    }

    if (persona === 'egor') {
      if (q.includes('fall in love') || q.includes('first') || q.includes('years')) {
        return "Seven years, to be exact. She shot an air rifle in her father's garden at age nine and knocked me into the gravel. I knew right then no other woman on this miserable planet could ever hold my attention. She spent years trying to stab me; I spent years making sure she never looked away.";
      }
      if (q.includes('pen') || q.includes('moreau') || q.includes('auditorium')) {
        return "Moreau thought his daddy's Monaco bank gave him permission to touch Slay's leather notebook. I crushed his solid silver Montblanc between two fingers and showed him my ring. He almost wet his silk trousers. Nobody touches what's mine.";
      }
      if (q.includes('height') || q.includes('inches') || q.includes('small')) {
        return "Thirteen inches of height difference. She's 5'2\" and I'm 6'3\". Everyone thinks that makes her fragile—until she severs a carotid artery with a hair pin. She's terrifying, lethal, and the most magnificent creature alive.";
      }
      return "Ask whatever you want, but keep your eyes forward. Slay has five concealed blades in her jacket and I'm very protective of my wife.";
    }

    // Archivist
    if (q.includes('syndicate') || q.includes('families') || q.includes('net worth')) {
      return "Syndicate Intel: The Volkov Empire ranks #1 in combined Russian-Iberian net worth, controlling northern rail and continental private banking. The Gonçalves Dynasty ranks #2, commanding Atlantic shipping lanes and Mediterranean logistics. Their unified crown commands the entire European underworld.";
    }
    if (q.includes('chapter') || q.includes('summary') || q.includes('total')) {
      return "The complete saga comprises 17 unabridged chapters across 3 seasons: Season 1 (Chapters 1-7), Season 2 (Chapters 8-12), and Season 3 (Chapters 13-17), culminating in the coronation of the Volkov-Gonçalves dynasty.";
    }
    return "Syndicate Archivist record retrieved: The Grand Library hosts 150 unique underworld crime sagas across Italian Cosa Nostra, Russian Bratva, Irish Brotherhood, Iberian Cartels, and Dark Academia.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setInput('');

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      persona,
      text: userText,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const replyText = generateReply(userText);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        persona,
        text: replyText,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600);
  };

  const promptChips = [
    "Why does Slay hate smoke and alcohol?",
    "When did Egor first fall in love with Slay?",
    "Tell me about the 13-inch height dynamic",
    "Ask Slay about the wedding blade",
    "Ask Egor about the pen crushing scene",
    "Summarize Season 1, 2, and 3"
  ];

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-zinc-950 font-bold shadow-xl shadow-amber-500/25 transition-all duration-300 transform hover:scale-105 border border-amber-300/40"
        >
          <Bot className="w-5 h-5 fill-current" />
          <span className="font-display text-sm tracking-wide">Syndicate AI Intel</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[95vw] sm:w-[420px] h-[580px] bg-zinc-950/95 backdrop-blur-xl border border-amber-500/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-zinc-900 to-black border-b border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-amber-400/50 bg-black flex items-center justify-center text-sm shadow">
                {persona === 'slay' ? '🗡️' : persona === 'egor' ? '🐺' : '🗄️'}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5 font-display">
                  <span>
                    {persona === 'slay' ? 'Slay Gonçalves' : persona === 'egor' ? 'Egor Volkov' : 'Syndicate Archivist'}
                  </span>
                  <span className="text-[10px] text-amber-400 font-mono px-1.5 py-0.2 border border-amber-400/30 rounded">
                    ONLINE
                  </span>
                </h3>
                <p className="text-[10px] text-zinc-400">
                  {persona === 'slay' ? 'Heiress & Lethal Enforcer' : persona === 'egor' ? 'Bratva Heir & King' : 'Neutral Intelligence Database'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Persona Selector Tabs */}
          <div className="grid grid-cols-3 p-1.5 bg-zinc-900/90 border-b border-zinc-800 text-xs">
            <button
              onClick={() => handlePersonaChange('slay')}
              className={`py-1.5 rounded-md flex items-center justify-center gap-1 transition-all ${
                persona === 'slay'
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>🗡️ Slay</span>
            </button>
            <button
              onClick={() => handlePersonaChange('egor')}
              className={`py-1.5 rounded-md flex items-center justify-center gap-1 transition-all ${
                persona === 'egor'
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>🐺 Egor</span>
            </button>
            <button
              onClick={() => handlePersonaChange('archivist')}
              className={`py-1.5 rounded-md flex items-center justify-center gap-1 transition-all ${
                persona === 'archivist'
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>🗄️ Intel</span>
            </button>
          </div>

          {/* Messages Area - High Contrast, Crisp Typography */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-black/60">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-amber-600 text-zinc-950 font-medium'
                      : 'bg-zinc-900 border border-zinc-700/80 text-zinc-100 font-sans'
                  }`}
                >
                  <div className="text-[10px] opacity-75 font-mono mb-1 flex items-center justify-between gap-2">
                    <span>
                      {msg.sender === 'user'
                        ? 'You'
                        : msg.persona === 'slay'
                        ? 'Slay Gonçalves'
                        : msg.persona === 'egor'
                        ? 'Egor Volkov'
                        : 'Archivist'}
                    </span>
                    {msg.sender === 'assistant' && (
                      <button
                        onClick={() => speakText(msg.text)}
                        className="p-0.5 hover:text-amber-400 transition-colors"
                        title="Read Aloud"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <p className="whitespace-pre-wrap text-[13px] text-white font-normal">
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-zinc-400 text-xs italic bg-zinc-900/60 p-2 rounded-lg max-w-[120px]">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] ml-1 text-zinc-300">Typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompt Chips */}
          <div className="px-3 py-2 bg-zinc-950 border-t border-zinc-900 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
            {promptChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInput(chip);
                }}
                className="text-[10px] px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-amber-500/50 transition-all shrink-0 font-sans"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <div className="p-3 bg-zinc-950 border-t border-amber-500/25 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={`Ask ${persona === 'slay' ? 'Slay' : persona === 'egor' ? 'Egor' : 'Intel'}...`}
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 disabled:opacity-40 transition-colors shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
