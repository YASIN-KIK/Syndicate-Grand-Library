import React, { useState, useEffect, useRef } from 'react';
import { Book, Chapter, User, ReadingTheme, SoundscapeType, SiteTheme, LanguageCode } from '@/types';
import { BookCover } from './BookCover';
import { AudioPlayer } from './AudioPlayer';
import { UI_TRANSLATIONS, translateChapter, translateBook } from '@/lib/i18n';
import {
  BookOpen, ChevronLeft, ChevronRight, Lock, Shield, Volume2,
  Sliders, ArrowLeft, Check, Sparkles, Moon, Sun, CloudRain,
  Flame as FlameIcon, Users
} from 'lucide-react';

interface ReaderViewProps {
  book: Book;
  onBackToLibrary: () => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onInspectCover: (book: Book) => void;
  siteTheme: SiteTheme;
  language: LanguageCode;
  onRequestCollaboration: (book: Book) => void;
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  book,
  onBackToLibrary,
  currentUser,
  onOpenAuth,
  onInspectCover,
  siteTheme,
  language,
  onRequestCollaboration
}) => {
  const isDark = siteTheme === 'black';
  const t = (key: string) => UI_TRANSLATIONS[language]?.[key] || UI_TRANSLATIONS.en[key] || key;

  const rawChapters = book.chapters || [];
  const chapters = rawChapters.map(c => translateChapter(c, language));
  const translatedBook = translateBook(book, language);

  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [activeParagraphIndex, setActiveParagraphIndex] = useState(0);
  const [theme, setTheme] = useState<ReadingTheme>(isDark ? 'obsidian' : 'parchment');
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [activeSeason, setActiveSeason] = useState<number>(1);
  const [soundscape, setSoundscape] = useState<SoundscapeType>('none');
  const [showToc, setShowToc] = useState(false);

  const currentChapter = chapters[currentChapterIndex] || chapters[0];
  const audioContextRef = useRef<AudioContext | null>(null);
  const soundNodesRef = useRef<{ source: any; gain: any } | null>(null);

  // Scroll to top when changing chapter
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveParagraphIndex(0);
    if (currentChapter) {
      setActiveSeason(currentChapter.season);
    }
  }, [currentChapterIndex]);

  // Check if current chapter is locked
  // Chapters 1 & 2 (index 0 and 1) are free for everyone.
  // Chapters 3+ (index >= 2) require full story access clearance.
  const isLocked = currentChapterIndex >= 2 && !(currentUser?.canAccessFullStory);

  // Web Audio Ambient Soundscapes generator
  useEffect(() => {
    if (soundscape === 'none') {
      if (soundNodesRef.current) {
        soundNodesRef.current.gain.gain.setValueAtTime(0, audioContextRef.current?.currentTime || 0);
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        if (soundscape === 'rain') {
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5;
        } else if (soundscape === 'fireplace') {
          output[i] = (lastOut + 0.05 * white) / 1.05;
          lastOut = output[i];
          if (Math.random() < 0.002) output[i] += (Math.random() * 0.8);
        } else {
          output[i] = Math.sin(i * 0.008) * 0.2 + (Math.random() * 0.05);
        }
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = soundscape === 'rain' ? 'lowpass' : 'bandpass';
      filter.frequency.value = soundscape === 'rain' ? 800 : 400;

      const gain = ctx.createGain();
      gain.gain.value = 0.08;

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      whiteNoise.start();

      soundNodesRef.current = { source: whiteNoise, gain };

      return () => {
        try {
          whiteNoise.stop();
          whiteNoise.disconnect();
        } catch {}
      };
    } catch (e) {
      console.warn("Ambient audio error", e);
    }
  }, [soundscape]);

  const themeClasses: Record<ReadingTheme, string> = {
    obsidian: isDark ? 'bg-black text-zinc-100 border-zinc-800' : 'bg-zinc-900 text-white border-zinc-700',
    sapphire: 'bg-slate-950 text-slate-100 border-slate-800',
    crimson: 'bg-stone-950 text-rose-50 border-rose-950/50',
    parchment: isDark ? 'bg-[#181512] text-[#ebdccb] border-[#2c241c]' : 'bg-[#fcf8f2] text-zinc-900 border-[#e5d8c8]'
  };

  const fontSizeClasses = {
    sm: 'text-sm leading-relaxed',
    md: 'text-base leading-relaxed sm:text-lg sm:leading-loose',
    lg: 'text-lg leading-loose sm:text-xl sm:leading-loose',
    xl: 'text-xl leading-loose sm:text-2xl sm:leading-loose'
  }[fontSize];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses[theme]}`}>
      {/* Top Floating Control Bar */}
      <div className={`sticky top-0 z-40 w-full backdrop-blur-md border-b px-4 py-3 transition-colors ${
        isDark
          ? 'bg-zinc-950/95 text-zinc-100 border-amber-500/30'
          : 'bg-white/95 text-zinc-900 border-zinc-200 shadow-sm'
      }`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <button
            onClick={onBackToLibrary}
            className={`flex items-center gap-1.5 text-xs transition-colors font-mono ${
              isDark ? 'text-zinc-400 hover:text-amber-300' : 'text-zinc-600 hover:text-amber-600'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('grandLibrary')}</span>
          </button>

          {/* Table of Contents Modal Trigger */}
          <button
            onClick={() => setShowToc(!showToc)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold ${
              isDark
                ? 'bg-zinc-900 hover:bg-zinc-800 text-amber-300 border-amber-500/30'
                : 'bg-zinc-100 hover:bg-zinc-200 text-amber-800 border-zinc-300'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t('chapter')} {currentChapter?.id}: {currentChapter?.title}</span>
          </button>

          {/* Right Tools: Collaborate + Audio + Theme */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onRequestCollaboration(book)}
              className={`hidden sm:flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border font-semibold ${
                isDark
                  ? 'bg-amber-500/15 border-amber-400 text-amber-300 hover:bg-amber-500/25'
                  : 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100'
              }`}
              title="Collaborate with Author on this Story"
            >
              <Users className="w-3.5 h-3.5" />
              <span>{t('collaborateBtn')}</span>
            </button>

            {/* Soundscape selector */}
            <div className={`hidden md:flex items-center gap-1 border rounded-lg p-1 text-[11px] ${
              isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-300'
            }`}>
              <button
                onClick={() => setSoundscape('none')}
                className={`px-2 py-0.5 rounded ${soundscape === 'none' ? 'bg-amber-500 text-zinc-950 font-bold' : isDark ? 'text-zinc-500' : 'text-zinc-500'}`}
              >
                Silent
              </button>
              <button
                onClick={() => setSoundscape('rain')}
                className={`px-2 py-0.5 rounded flex items-center gap-1 ${soundscape === 'rain' ? 'bg-amber-500 text-zinc-950 font-bold' : isDark ? 'text-zinc-400' : 'text-zinc-600'}`}
              >
                <CloudRain className="w-3 h-3" />
                <span>Rain</span>
              </button>
              <button
                onClick={() => setSoundscape('fireplace')}
                className={`px-2 py-0.5 rounded flex items-center gap-1 ${soundscape === 'fireplace' ? 'bg-amber-500 text-zinc-950 font-bold' : isDark ? 'text-zinc-400' : 'text-zinc-600'}`}
              >
                <FlameIcon className="w-3 h-3" />
                <span>Fire</span>
              </button>
            </div>

            {/* Reading Theme switcher */}
            <div className={`flex items-center gap-1 border rounded-lg p-1 ${
              isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-300'
            }`}>
              {(['obsidian', 'sapphire', 'crimson', 'parchment'] as ReadingTheme[]).map((thm) => (
                <button
                  key={thm}
                  onClick={() => setTheme(thm)}
                  className={`w-4 h-4 rounded-full border transition-transform ${
                    thm === 'obsidian' ? 'bg-black border-amber-500/40' :
                    thm === 'sapphire' ? 'bg-blue-950 border-blue-500/40' :
                    thm === 'crimson' ? 'bg-rose-950 border-rose-500/40' :
                    'bg-[#ebdccb] border-amber-800/40'
                  } ${theme === thm ? 'scale-125 ring-2 ring-amber-400' : 'opacity-60'}`}
                  title={thm}
                />
              ))}
            </div>

            {/* Font size toggle */}
            <button
              onClick={() => {
                const sizes: ('sm' | 'md' | 'lg' | 'xl')[] = ['sm', 'md', 'lg', 'xl'];
                setFontSize(sizes[(sizes.indexOf(fontSize) + 1) % sizes.length]);
              }}
              className={`px-2 py-1 rounded-lg text-xs font-mono border ${
                isDark ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-300'
              }`}
              title="Adjust Font Size"
            >
              {fontSize.toUpperCase()}
            </button>
          </div>
        </div>
      </div>

      {/* AUDIOBOOK VOICE NARRATOR BAR */}
      {!isLocked && currentChapter && (
        <AudioPlayer
          paragraphs={currentChapter.paragraphs}
          activeParagraphIndex={activeParagraphIndex}
          onParagraphChange={setActiveParagraphIndex}
          chapterTitle={currentChapter.title}
        />
      )}

      {/* TABLE OF CONTENTS MODAL */}
      {showToc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className={`w-full max-w-2xl rounded-2xl shadow-2xl p-6 max-h-[85vh] overflow-y-auto border ${
            isDark ? 'bg-zinc-950 border-amber-500/40 text-white' : 'bg-white border-zinc-300 text-zinc-900'
          }`}>
            <div className={`flex items-center justify-between pb-4 border-b mb-4 ${
              isDark ? 'border-zinc-800' : 'border-zinc-200'
            }`}>
              <div>
                <h3 className="text-xl font-serif font-bold">{t('tableOfContents')}</h3>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  {translatedBook.title} ({chapters.length} Chapters)
                </p>
              </div>
              <button
                onClick={() => setShowToc(false)}
                className={`text-xs px-3 py-1.5 rounded-lg border ${
                  isDark ? 'text-zinc-400 hover:text-white bg-zinc-900 border-zinc-800' : 'text-zinc-600 hover:text-zinc-900 bg-zinc-100 border-zinc-300'
                }`}
              >
                Close
              </button>
            </div>

            {/* Season Filter for Flagship Novel */}
            {book.id === 1 && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[1, 2, 3].map((s) => (
                  <button
                    key={s}
                    onClick={() => setActiveSeason(s)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      activeSeason === s
                        ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow'
                        : isDark
                        ? 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                        : 'bg-zinc-100 text-zinc-600 border-zinc-200 hover:text-zinc-900'
                    }`}
                  >
                    {t('season')} {s}
                  </button>
                ))}
              </div>
            )}

            {/* Chapter List */}
            <div className="space-y-2">
              {chapters
                .filter((ch) => book.id !== 1 || ch.season === activeSeason)
                .map((ch) => {
                  const globalIdx = chapters.findIndex(c => c.id === ch.id);
                  const isChLocked = globalIdx >= 2 && !(currentUser?.canAccessFullStory);

                  return (
                    <button
                      key={ch.id}
                      onClick={() => {
                        setCurrentChapterIndex(globalIdx);
                        setShowToc(false);
                      }}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        globalIdx === currentChapterIndex
                          ? 'bg-amber-500/15 border-amber-400 text-amber-500 shadow'
                          : isDark
                          ? 'bg-zinc-900/60 border-zinc-800/80 text-zinc-300 hover:border-zinc-700'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-800 hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 border ${
                          isDark ? 'bg-zinc-800 border-zinc-700 text-amber-400' : 'bg-amber-100 border-amber-300 text-amber-800'
                        }`}>
                          {ch.id}
                        </span>
                        <div>
                          <div className="text-xs font-bold font-serif">{ch.title}</div>
                          <div className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            {ch.subtitle || ch.location}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-[10px] opacity-75">{ch.readingTimeMin} {t('minRead')}</span>
                        {isChLocked && (
                          <span className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded border ${
                            isDark ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' : 'text-amber-800 bg-amber-100 border-amber-300'
                          }`}>
                            <Lock className="w-3 h-3" />
                            <span>Locked</span>
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* MAIN MANUSCRIPT CONTAINER */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Book Header & 3D Cover */}
        <div className={`flex flex-col items-center text-center pb-10 border-b mb-10 ${
          isDark ? 'border-zinc-800/80' : 'border-zinc-200'
        }`}>
          <BookCover
            book={translatedBook}
            size="md"
            onInspect={() => onInspectCover(book)}
          />

          <span className="text-xs uppercase font-mono tracking-[0.25em] text-amber-500 font-bold mt-6 block">
            {translatedBook.category} • {t('season')} {currentChapter?.season || 1}
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold mt-1">
            {currentChapter?.title}
          </h1>
          <p className={`text-sm italic mt-1 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
            {currentChapter?.subtitle}
          </p>

          <div className={`flex flex-wrap items-center justify-center gap-3 text-xs font-mono mt-4 ${
            isDark ? 'text-zinc-500' : 'text-zinc-500'
          }`}>
            <span>{t('pov')}: {currentChapter?.pov}</span>
            <span>•</span>
            <span>{currentChapter?.location}</span>
            <span>•</span>
            <span>{currentChapter?.readingTimeMin} {t('minRead')}</span>
          </div>

          <div className="mt-4">
            <button
              onClick={() => onRequestCollaboration(book)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                isDark
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20'
                  : 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{t('askCollaboration')} with {book.author}</span>
            </button>
          </div>
        </div>

        {/* LOCKED GATE RESTRICTION VIEW */}
        {isLocked ? (
          <div className={`p-8 sm:p-12 rounded-3xl border shadow-2xl text-center space-y-6 my-10 animate-in fade-in ${
            isDark ? 'bg-zinc-950 border-amber-500/40' : 'bg-white border-zinc-300'
          }`}>
            <div className={`w-16 h-16 rounded-full border mx-auto flex items-center justify-center shadow-inner ${
              isDark ? 'border-amber-400/50 bg-black/80 text-amber-400' : 'border-amber-500 bg-amber-50 text-amber-600'
            }`}>
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <span className={`text-xs font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
                isDark ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' : 'text-amber-800 bg-amber-100 border-amber-300'
              }`}>
                Restricted Syndicate Clearance
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mt-3">
                Chapters 3 through 17 are Locked
              </h2>
              <p className={`text-xs sm:text-sm max-w-md mx-auto mt-2 leading-relaxed ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                Chapters 1 and 2 are unlocked as a free public preview. Full access to the complete 17-chapter trilogy requires elevated clearance as High Chancellor, Council Moderator, or an Appointed Assistant.
              </p>
            </div>

            <div className={`p-4 rounded-xl border max-w-md mx-auto text-left text-xs space-y-2 ${
              isDark ? 'bg-black/60 border-zinc-800 text-zinc-300' : 'bg-zinc-50 border-zinc-200 text-zinc-700'
            }`}>
              <div className="flex items-center gap-2 text-amber-500 font-semibold">
                <Shield className="w-4 h-4" />
                <span>How to Unlock the Full Novel:</span>
              </div>
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Sign in with the High Chancellor credentials (YASINKIK@outlook.com) or have an Administrator appoint your account as an Assistant or Moderator via the Syndicate Council.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={onOpenAuth}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-zinc-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
              >
                Sign In to Authenticate
              </button>
              <button
                onClick={() => setCurrentChapterIndex(0)}
                className={`px-5 py-2.5 rounded-xl border text-xs transition-colors ${
                  isDark ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-700' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-300'
                }`}
              >
                Return to Chapter 1 Preview
              </button>
            </div>
          </div>
        ) : (
          /* UNLOCKED PARAGRAPHS - CLICK TO LISTEN */
          <div className={`space-y-6 font-serif ${fontSizeClasses}`}>
            {currentChapter?.paragraphs.map((p, idx) => {
              const isActive = idx === activeParagraphIndex;

              return (
                <p
                  key={idx}
                  onClick={() => setActiveParagraphIndex(idx)}
                  className={`cursor-pointer transition-all duration-200 p-2 rounded-lg ${
                    isActive
                      ? isDark
                        ? 'bg-amber-500/15 border-l-4 border-amber-400 pl-4 shadow-sm'
                        : 'bg-amber-100/70 border-l-4 border-amber-600 pl-4 shadow-sm'
                      : isDark
                      ? 'hover:bg-white/5'
                      : 'hover:bg-black/5'
                  }`}
                  title="Click to start narration from this paragraph"
                >
                  {p}
                </p>
              );
            })}
          </div>
        )}

        {/* BOTTOM CHAPTER NAVIGATION */}
        <div className={`pt-12 border-t mt-12 flex items-center justify-between gap-4 ${
          isDark ? 'border-zinc-800/80' : 'border-zinc-200'
        }`}>
          <button
            onClick={() => setCurrentChapterIndex(Math.max(0, currentChapterIndex - 1))}
            disabled={currentChapterIndex === 0}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl disabled:opacity-30 text-xs border transition-colors ${
              isDark ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-700' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-300'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t('previousChapter')}</span>
          </button>

          <span className="text-xs font-mono opacity-70">
            {currentChapterIndex + 1} of {chapters.length}
          </span>

          <button
            onClick={() => setCurrentChapterIndex(Math.min(chapters.length - 1, currentChapterIndex + 1))}
            disabled={currentChapterIndex >= chapters.length - 1}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl disabled:opacity-30 text-xs border transition-colors ${
              isDark ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-700' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-300'
            }`}
          >
            <span>{t('nextChapter')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
};
