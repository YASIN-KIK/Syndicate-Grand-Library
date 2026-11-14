import React, { useState } from 'react';
import { BANTER_QUOTES } from '@/data/banter';
import { BanterQuote } from '@/types';
import { Flame, Volume2, Sparkles, Quote, Shield } from 'lucide-react';

export const BanterVault: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState<number | 'all'>('all');
  const [selectedIntensity, setSelectedIntensity] = useState<string>('all');

  const filteredQuotes = BANTER_QUOTES.filter(q => {
    const matchS = selectedSeason === 'all' || q.season === selectedSeason;
    const matchI = selectedIntensity === 'all' || q.intensity === selectedIntensity;
    return matchS && matchI;
  });

  const speakQuote = (quote: BanterQuote) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Slay voice
    const u1 = new SpeechSynthesisUtterance(`${quote.speaker} says: ${quote.quote}`);
    u1.rate = 1.05;
    u1.pitch = 1.1;

    // Egor voice
    const u2 = new SpeechSynthesisUtterance(`${quote.listener} replies: ${quote.reply}`);
    u2.rate = 0.95;
    u2.pitch = 0.85;

    u1.onend = () => {
      window.speechSynthesis.speak(u2);
    };

    window.speechSynthesis.speak(u1);
  };

  const intensityColors = {
    'Low Spark': 'border-blue-500/40 text-blue-300 bg-blue-500/10',
    'High Voltage': 'border-amber-500/40 text-amber-300 bg-amber-500/10',
    'Lethal Spite': 'border-rose-500/40 text-rose-300 bg-rose-500/10',
    'Obsessive Hunger': 'border-purple-500/40 text-purple-300 bg-purple-500/10'
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      <div className="text-center mb-8">
        <span className="text-xs uppercase font-mono tracking-[0.25em] text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
          Classified Dialogue Archive
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-3">
          The Banter Vault
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto mt-1">
          The sharpest, most venomous, and scorched-earth exchanges between Slay Gonçalves and Egor Volkov across Seasons 1, 2, and 3.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <div className="flex border border-zinc-800 rounded-lg p-1 bg-zinc-950">
            {['all', 1, 2, 3].map(s => (
              <button
                key={s}
                onClick={() => setSelectedSeason(s as any)}
                className={`px-3 py-1 text-xs rounded-md capitalize transition-all ${
                  selectedSeason === s
                    ? 'bg-amber-500 text-zinc-950 font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {s === 'all' ? 'All Seasons' : `Season ${s}`}
              </button>
            ))}
          </div>

          <div className="flex border border-zinc-800 rounded-lg p-1 bg-zinc-950">
            {['all', 'High Voltage', 'Lethal Spite', 'Obsessive Hunger'].map(i => (
              <button
                key={i}
                onClick={() => setSelectedIntensity(i)}
                className={`px-3 py-1 text-xs rounded-md transition-all ${
                  selectedIntensity === i
                    ? 'bg-amber-500 text-zinc-950 font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {i === 'all' ? 'All Intensities' : i}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quote Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredQuotes.map(q => (
          <div
            key={q.id}
            className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono mb-3">
                <span className="text-zinc-500">
                  Season {q.season} • Chapter {q.chapter}
                </span>
                <span className={`px-2 py-0.5 rounded-full border ${intensityColors[q.intensity]}`}>
                  {q.intensity}
                </span>
              </div>

              {/* Speaker */}
              <div className="space-y-3">
                <div className="pl-3 border-l-2 border-amber-400">
                  <span className="text-[11px] font-bold text-amber-300 block">
                    {q.speaker}:
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-100 italic font-serif mt-0.5">
                    "{q.quote}"
                  </p>
                </div>

                {/* Reply */}
                <div className="pl-3 border-l-2 border-blue-400">
                  <span className="text-[11px] font-bold text-blue-300 block">
                    {q.listener}:
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 italic font-serif mt-0.5">
                    "{q.reply}"
                  </p>
                </div>
              </div>
            </div>

            {/* Audio Speech Button */}
            <div className="pt-4 mt-4 border-t border-zinc-900 flex items-center justify-between">
              <span className="text-[10px] text-zinc-500 font-mono">
                {q.speaker} ✕ {q.listener}
              </span>
              <button
                onClick={() => speakQuote(q)}
                className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-amber-500/30 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen Exchange</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
