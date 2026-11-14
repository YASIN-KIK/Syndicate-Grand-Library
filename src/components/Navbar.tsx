import React, { useState } from 'react';
import { User, SiteTheme, LanguageCode } from '@/types';
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS } from '@/lib/i18n';
import {
  BookOpen, Crown, Feather, UserCheck, Shield, Lock, LogOut,
  Bookmark, MessageSquare, Sun, Moon, Globe, Edit3, ChevronDown
} from 'lucide-react';

interface NavbarProps {
  activeView: 'library' | 'reader' | 'dossiers' | 'banter' | 'author' | 'admin' | 'shelf' | 'chat';
  onSelectView: (view: 'library' | 'reader' | 'dossiers' | 'banter' | 'author' | 'admin' | 'shelf' | 'chat') => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  hasActiveBook: boolean;
  savedBooksCount: number;
  siteTheme: SiteTheme;
  onToggleTheme: () => void;
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  onOpenEditProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onSelectView,
  currentUser,
  onOpenAuth,
  onLogout,
  hasActiveBook,
  savedBooksCount,
  siteTheme,
  onToggleTheme,
  language,
  onSelectLanguage,
  onOpenEditProfile
}) => {
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const isAdmin = currentUser?.role === 'admin';
  const isDark = siteTheme === 'black';

  const t = (key: string) => UI_TRANSLATIONS[language]?.[key] || UI_TRANSLATIONS.en[key] || key;
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 border-b px-4 py-2.5 shadow-xl ${
        isDark
          ? 'bg-black/95 text-zinc-100 border-amber-500/30'
          : 'bg-white/95 text-zinc-900 border-zinc-200'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <div
          onClick={() => onSelectView('library')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div
            className={`w-10 h-10 rounded-xl border flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform duration-300 ${
              isDark ? 'border-amber-500/40 bg-zinc-950' : 'border-zinc-300 bg-zinc-100'
            }`}
          >
            👑
          </div>
          <div>
            <div className="font-serif font-bold text-base sm:text-lg tracking-wide group-hover:text-amber-500 transition-colors flex items-center gap-1.5">
              <span>{t('siteTitle')}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 border rounded hidden sm:inline-block ${
                  isDark ? 'text-amber-400 border-amber-500/30' : 'text-amber-700 border-amber-400/40 bg-amber-50'
                }`}
              >
                150 BOOKS
              </span>
            </div>
            <div className={`text-[10px] font-mono tracking-wider ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              {t('siteSubtitle')}
            </div>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
          <button
            onClick={() => onSelectView('library')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeView === 'library'
                ? 'bg-amber-500 text-zinc-950 font-bold shadow'
                : isDark
                ? 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            {t('grandLibrary')}
          </button>

          {hasActiveBook && (
            <button
              onClick={() => onSelectView('reader')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                activeView === 'reader'
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow'
                  : isDark
                  ? 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('reader')}</span>
            </button>
          )}

          <button
            onClick={() => onSelectView('shelf')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              activeView === 'shelf'
                ? 'bg-amber-500 text-zinc-950 font-bold shadow'
                : isDark
                ? 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{t('myShelf')} ({savedBooksCount})</span>
          </button>

          <button
            onClick={() => onSelectView('dossiers')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeView === 'dossiers'
                ? 'bg-amber-500 text-zinc-950 font-bold shadow'
                : isDark
                ? 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            {t('characterDossiers')}
          </button>

          <button
            onClick={() => onSelectView('banter')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeView === 'banter'
                ? 'bg-amber-500 text-zinc-950 font-bold shadow'
                : isDark
                ? 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            {t('banterVault')}
          </button>

          <button
            onClick={() => onSelectView('author')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              activeView === 'author'
                ? 'bg-amber-500 text-zinc-950 font-bold shadow'
                : isDark
                ? 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Feather className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('authorStudio')}</span>
          </button>

          <button
            onClick={() => onSelectView('chat')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeView === 'chat'
                ? 'bg-amber-500 text-zinc-950 font-bold shadow'
                : isDark
                ? 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('syndicateChat')}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          {isAdmin && (
            <button
              onClick={() => onSelectView('admin')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 border border-amber-500/40 ${
                activeView === 'admin'
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow'
                  : 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>{t('adminCouncil')}</span>
            </button>
          )}
        </nav>

        {/* Right Tools: Theme Switcher, Language Selector & Profile */}
        <div className="flex items-center gap-2">
          {/* THEME TOGGLE: PURE BLACK vs PURE WHITE */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-all ${
              isDark
                ? 'bg-zinc-900 border-zinc-800 text-amber-400 hover:bg-zinc-800'
                : 'bg-zinc-100 border-zinc-300 text-zinc-900 hover:bg-zinc-200 shadow-sm'
            }`}
            title={isDark ? 'Switch to Pure White Mode' : 'Switch to Obsidian Black Mode'}
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline font-mono text-[11px]">White</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-zinc-800" />
                <span className="hidden sm:inline font-mono text-[11px]">Black</span>
              </>
            )}
          </button>

          {/* LANGUAGE SELECTOR FOR ALL COUNTRIES */}
          <div className="relative">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className={`px-2.5 py-1.5 rounded-xl border flex items-center gap-1 text-xs font-semibold transition-colors ${
                isDark
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-200 hover:border-amber-500/50'
                  : 'bg-zinc-100 border-zinc-300 text-zinc-800 hover:border-zinc-400'
              }`}
            >
              <span>{currentLangObj.flag}</span>
              <span className="font-mono uppercase text-[11px]">{currentLangObj.code}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {showLangDropdown && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded-xl shadow-2xl border py-1.5 z-50 animate-in fade-in duration-150 ${
                  isDark
                    ? 'bg-zinc-950 border-amber-500/40 text-zinc-200'
                    : 'bg-white border-zinc-300 text-zinc-800'
                }`}
              >
                <div className="px-3 py-1 text-[10px] font-mono uppercase text-zinc-400 border-b border-zinc-800/40">
                  Select Language
                </div>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLanguage(lang.code);
                      setShowLangDropdown(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between transition-colors ${
                      language === lang.code
                        ? 'bg-amber-500 text-zinc-950 font-bold'
                        : isDark
                        ? 'hover:bg-zinc-900'
                        : 'hover:bg-zinc-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </span>
                    <span className="text-[10px] opacity-75 font-mono">{lang.nativeName}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* USER NAME & CHANGE PROFILE TRIGGER */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenEditProfile}
              className={`p-1.5 rounded-xl border flex items-center gap-1.5 transition-all text-xs font-semibold ${
                isDark
                  ? 'bg-zinc-900 border-zinc-800 hover:border-amber-500/50 text-zinc-200'
                  : 'bg-zinc-100 border-zinc-300 hover:border-zinc-400 text-zinc-800'
              }`}
              title="Change User Name / Pen Name"
            >
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center text-xs">
                {currentUser?.penName ? '✍️' : '👑'}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-[11px] font-bold truncate max-w-[100px] leading-tight">
                  {currentUser?.name || 'Guest Reader'}
                </span>
                <span className="text-[9px] text-amber-500 font-mono flex items-center gap-0.5">
                  <Edit3 className="w-2.5 h-2.5" />
                  <span>Change Name</span>
                </span>
              </div>
            </button>

            {currentUser ? (
              <button
                onClick={onLogout}
                className={`p-2 rounded-xl border transition-colors ${
                  isDark
                    ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-rose-400 border-zinc-800'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-rose-600 border-zinc-300'
                }`}
                title="Log out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-zinc-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all shrink-0"
              >
                <Lock className="w-3 h-3" />
                <span className="hidden sm:inline">{t('signIn')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
