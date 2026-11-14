import React from 'react';
import { Shield, Flame, Crosshair, Award, Ruler, UserCheck } from 'lucide-react';

export const CharacterDossiers: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      <div className="text-center mb-10">
        <span className="text-xs uppercase font-mono tracking-[0.25em] text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
          Syndicate Classified Dossiers
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white mt-3">
          The Monarchs of the Underworld
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto mt-2">
          Psychological profiles, physical specifications, combat rankings, and tactical rules for Slay Gonçalves and Egor Volkov.
        </p>
      </div>

      {/* Side-by-Side Dossier Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* SLAY GONÇALVES */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-amber-500/40 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full bg-amber-500/10">
                #2 Portuguese Dynasty Heiress
              </span>
              <span className="text-xs text-zinc-500 font-mono">CODE: BLACK DAHLIA</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl border-2 border-amber-400/50 bg-black flex items-center justify-center text-3xl shadow-lg">
                🗡️
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Slay Gonçalves
                </h2>
                <p className="text-xs text-zinc-400">Age: 22 • 5'2" (157 cm) • Lisbon & Sintra</p>
              </div>
            </div>

            {/* Quote */}
            <div className="p-3.5 rounded-xl bg-black/60 border border-zinc-800 text-xs italic font-serif text-amber-200/90 mb-6">
              "When I kill you, Volkov, I want you to know it was me. Poison is sloppy; I prefer eye contact."
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6 text-xs font-sans">
              <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
                <span className="text-zinc-500 text-[10px] block uppercase font-mono">Appearance</span>
                <span className="text-white font-medium">Dark brown eyes, sleek black hair, carved abs</span>
              </div>
              <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
                <span className="text-zinc-500 text-[10px] block uppercase font-mono">Signature Weapons</span>
                <span className="text-white font-medium">Ceramic karambits, suppressed SIG Sauer</span>
              </div>
              <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
                <span className="text-zinc-500 text-[10px] block uppercase font-mono">Strict Code</span>
                <span className="text-rose-400 font-medium">Zero alcohol, zero smoke, zero mess</span>
              </div>
              <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
                <span className="text-zinc-500 text-[10px] block uppercase font-mono">Languages</span>
                <span className="text-white font-medium">Portuguese, English, Russian, Spanish</span>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              To the faculty of St. Jude Elite Academy, she is the cold, brilliant valedictorian who never misses an honor roll. To the docks of Lisbon, she is the silent enforcer who checks manifests with a concealed Glock and can dismantle a mercenary squad in seconds.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>Combat Speed: 10/10</span>
            <span>Tactical Precision: 10/10</span>
          </div>
        </div>

        {/* EGOR VOLKOV */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-blue-500/40 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400 border border-blue-500/30 px-2.5 py-0.5 rounded-full bg-blue-500/10">
                #1 Russian-Portuguese Syndicate Heir
              </span>
              <span className="text-xs text-zinc-500 font-mono">CODE: SIBERIAN WOLF</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl border-2 border-blue-400/50 bg-black flex items-center justify-center text-3xl shadow-lg">
                🐺
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Egor Volkov
                </h2>
                <p className="text-xs text-zinc-400">Age: 25 • 6'3" (190 cm) • Moscow & Lisbon</p>
              </div>
            </div>

            {/* Quote */}
            <div className="p-3.5 rounded-xl bg-black/60 border border-zinc-800 text-xs italic font-serif text-blue-200/90 mb-6">
              "I told you, pequena. I'm never letting you go. Even if you spend the next seventy years trying to murder me."
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6 text-xs font-sans">
              <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
                <span className="text-zinc-500 text-[10px] block uppercase font-mono">Appearance</span>
                <span className="text-white font-medium">Ice-blue eyes, tousled blond hair, broad shoulders</span>
              </div>
              <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
                <span className="text-zinc-500 text-[10px] block uppercase font-mono">Signature Weapons</span>
                <span className="text-white font-medium">Suppressed Walther, bare-knuckle power</span>
              </div>
              <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
                <span className="text-zinc-500 text-[10px] block uppercase font-mono">Classified Secret</span>
                <span className="text-amber-300 font-medium">7-year secret obsession with Slay</span>
              </div>
              <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
                <span className="text-zinc-500 text-[10px] block uppercase font-mono">Languages</span>
                <span className="text-white font-medium">Russian, Portuguese, English, French</span>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              Feared throughout Eastern and Western Europe as a ruthless syndicate successor who commands private naval fleets and rail freight. Yet around Slay, he transforms into an infuriatingly charming, possessive, and clingy husband who purposely tests her limits just to hear her voice.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>Raw Striking Power: 10/10</span>
            <span>Defensive Resilience: 10/10</span>
          </div>
        </div>
      </div>

      {/* 13-INCH HEIGHT & REACH VISUALIZER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-xl mb-12">
        <div className="text-center mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Physical Dynamics</span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
            The 13-Inch Height & Reach Disparity
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto">
            Slay (5'2" / 157 cm) stands eye-to-chest against Egor (6'3" / 190 cm), giving them contrasting tactical combat advantages.
          </p>
        </div>

        <div className="flex items-end justify-center gap-12 sm:gap-20 h-64 border-b border-zinc-800 pb-4 max-w-lg mx-auto">
          {/* Slay Column */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-amber-300 mb-1">5'2" (157 cm)</span>
            <div className="w-16 sm:w-20 h-44 rounded-t-xl bg-gradient-to-t from-rose-950 to-amber-500/60 border border-amber-400/50 flex flex-col justify-between items-center p-2 shadow-lg">
              <span className="text-xs">🗡️</span>
              <span className="text-[10px] font-bold text-white uppercase font-mono">Slay</span>
            </div>
            <span className="text-[11px] text-zinc-400 mt-2 font-mono">Speed & Agility</span>
          </div>

          {/* Egor Column */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-blue-300 mb-1">6'3" (190 cm)</span>
            <div className="w-20 sm:w-24 h-56 rounded-t-xl bg-gradient-to-t from-slate-900 to-blue-600/70 border border-blue-400/50 flex flex-col justify-between items-center p-2 shadow-lg">
              <span className="text-xs">🐺</span>
              <span className="text-[10px] font-bold text-white uppercase font-mono">Egor</span>
            </div>
            <span className="text-[11px] text-zinc-400 mt-2 font-mono">+13 Inch Reach</span>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-zinc-400 font-sans max-w-md mx-auto">
          "She fits perfectly beneath my chin when she leans against my chest. And she knows exactly where my ribs are vulnerable." — Egor Volkov
        </div>
      </div>
    </div>
  );
};
