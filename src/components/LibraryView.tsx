import React, { useState, useMemo } from 'react';
import { Book, User, SiteTheme, LanguageCode } from '@/types';
import { BookCover } from './BookCover';
import { UI_TRANSLATIONS, translateBook } from '@/lib/i18n';
import {
  Search, Flame, Star, Bookmark, BookOpen, Filter, Sparkles, Crown,
  ArrowRight, Shield, Users, Feather
} from 'lucide-react';

interface LibraryViewProps {
  books: Book[];
  onOpenBook: (book: Book) => void;
  onInspectCover: (book: Book) => void;
  savedBookIds: number[];
  onToggleShelf: (bookId: number) => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onOpenChat?: () => void;
  siteTheme: SiteTheme;
  language: LanguageCode;
  onRequestCollaboration: (book: Book) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  books,
  onOpenBook,
  onInspectCover,
  savedBookIds,
  onToggleShelf,
  currentUser,
  onOpenAuth,
  onOpenChat,
  siteTheme,
  language,
  onRequestCollaboration
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTrope, setSelectedTrope] = useState<string>('All');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'spice' | 'newest'>('popular');

  const isDark = siteTheme === 'black';
  const t = (key: string) => UI_TRANSLATIONS[language]?.[key] || UI_TRANSLATIONS.en[key] || key;

  const categories = [
    'All',
    'Iberian & Latin Cartels',
    'Italian Cosa Nostra',
    'Russian Bratva',
    'Irish Syndicate',
    'Dark Academia',
    'Billionaire Dynasties',
    'Yakuza & Triads'
  ];

  const tropes = [
    'All',
    'Enemies to Lovers',
    'He Falls First',
    'Arranged Marriage',
    'Height Difference',
    'Touch Her and Die',
    'Lethal Heroine',
    'Childhood Rivals'
  ];

  // Raw Flagship Book
  const rawFlagship = books.find(b => b.id === 1) || books[0];
  const flagshipBook = rawFlagship ? translateBook(rawFlagship, language) : null;

  const filteredBooks = useMemo(() => {
    return books.filter(b => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.femaleLead.name.toLowerCase().includes(q) ||
        b.maleLead.name.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.tropes.some(t => t.toLowerCase().includes(q));

      const matchCat = selectedCategory === 'All' || b.category === selectedCategory;
      const matchTrope = selectedTrope === 'All' || b.tropes.includes(selectedTrope);
      const matchAuthor =
        selectedAuthor === 'All' ||
        (selectedAuthor === 'Yasin' && b.author === 'Yasin') ||
        (selectedAuthor === 'Kisha & Yasin' && b.author === 'Kisha & Yasin') ||
        b.author === selectedAuthor;

      return matchSearch && matchCat && matchTrope && matchAuthor;
    }).sort((a, b) => {
      if (a.id === 1) return -1;
      if (b.id === 1) return 1;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'spice') return b.spiceLevel - a.spiceLevel;
      if (sortBy === 'newest') return b.id - a.id;
      return b.reviewsCount - a.reviewsCount;
    }).map(b => translateBook(b, language));
  }, [books, search, selectedCategory, selectedTrope, selectedAuthor, sortBy, language]);

  if (!flagshipBook) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-zinc-400">
        Loading Grand Library...
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-300 transition-colors ${
      isDark ? 'text-zinc-100' : 'text-zinc-900'
    }`}>
      {/* HERO SPOTLIGHT: BOUND BY SPITE */}
      <div
        className={`relative rounded-3xl overflow-hidden border shadow-2xl p-6 sm:p-10 mb-12 transition-colors ${
          isDark
            ? 'bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border-amber-500/40 text-white'
            : 'bg-gradient-to-r from-zinc-50 via-white to-amber-50/40 border-zinc-200 text-zinc-900 shadow-xl'
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm border ${
                isDark
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-amber-100 text-amber-800 border-amber-300'
              }`}>
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                <span>{t('flagshipBadge')}</span>
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border ${
                isDark ? 'bg-rose-950/70 text-rose-300 border-rose-500/40' : 'bg-rose-100 text-rose-800 border-rose-300'
              }`}>
                Authors: Kisha & Yasin
              </span>
              <span className={`text-xs font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {t('unabridgedChapters')}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight leading-tight">
              {flagshipBook.title}: <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500">{flagshipBook.subtitle}</span>
            </h1>

            <p className={`text-xs sm:text-sm font-sans leading-relaxed max-w-xl ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
              {flagshipBook.synopsis}
            </p>

            {/* Character Specs Pill */}
            <div className="grid grid-cols-2 gap-3 py-2 max-w-md">
              <div className={`p-2.5 rounded-xl border text-xs ${
                isDark ? 'bg-black/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
              }`}>
                <span className="text-amber-500 font-semibold block">{flagshipBook.femaleLead.name} (22)</span>
                <span className={`text-[11px] ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  5'2" • Zero smoke/alcohol • Concealed blades
                </span>
              </div>
              <div className={`p-2.5 rounded-xl border text-xs ${
                isDark ? 'bg-black/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
              }`}>
                <span className="text-blue-500 font-semibold block">{flagshipBook.maleLead.name} (25)</span>
                <span className={`text-[11px] ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  6'3" • Ice-blue eyes • Secretly devoted
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenBook(flagshipBook)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold font-sans shadow-xl shadow-amber-500/25 transition-all text-sm transform hover:scale-105"
              >
                <BookOpen className="w-4 h-4 fill-current" />
                <span>{t('readFullNovel')}</span>
              </button>

              <button
                onClick={() => onInspectCover(flagshipBook)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm transition-colors ${
                  isDark
                    ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-700 hover:border-amber-500/40'
                    : 'bg-white hover:bg-zinc-100 text-zinc-800 border-zinc-300'
                }`}
              >
                <span>{t('inspectCovers')}</span>
              </button>

              {/* Ask for Collaboration on Flagship Book */}
              <button
                onClick={() => onRequestCollaboration(flagshipBook)}
                className={`flex items-center gap-1.5 px-3.5 py-3 rounded-xl border text-sm transition-colors font-semibold ${
                  isDark
                    ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300'
                }`}
                title="Ask to Collaborate or Co-Author"
              >
                <Users className="w-4 h-4" />
                <span>{t('collaborateBtn')}</span>
              </button>

              <button
                onClick={() => onToggleShelf(flagshipBook.id)}
                className={`p-3 rounded-xl border transition-colors ${
                  savedBookIds.includes(flagshipBook.id)
                    ? 'bg-amber-500/20 border-amber-400 text-amber-500'
                    : isDark
                    ? 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-white'
                    : 'bg-white border-zinc-300 text-zinc-600 hover:text-zinc-900'
                }`}
                title="Save to My Shelf"
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>

          {/* Hero Right 3D Book Cover */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <BookCover
              book={flagshipBook}
              size="hero"
              onInspect={() => onInspectCover(flagshipBook)}
              onRead={() => onOpenBook(flagshipBook)}
            />
            <span className={`text-[11px] mt-3 font-mono ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
              Hover or click to flip between front & back jackets
            </span>
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className={`w-full rounded-xl pl-10 pr-4 py-2.5 text-xs transition-colors border focus:outline-none focus:border-amber-400 shadow-inner ${
                isDark
                  ? 'bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500'
                  : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'
              }`}
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className={`text-xs font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className={`border text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400 font-sans ${
                isDark
                  ? 'bg-zinc-950 border-zinc-800 text-zinc-200'
                  : 'bg-white border-zinc-300 text-zinc-800'
              }`}
            >
              <option value="popular">{t('sortPopular')}</option>
              <option value="rating">{t('sortRating')}</option>
              <option value="spice">{t('sortSpice')}</option>
              <option value="newest">{t('sortNewest')}</option>
            </select>
          </div>
        </div>

        {/* Author Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className={`text-[11px] font-mono uppercase tracking-wider shrink-0 flex items-center gap-1 ${
            isDark ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            <Crown className="w-3 h-3 text-amber-500" />
            <span>Author:</span>
          </span>
          <button
            onClick={() => setSelectedAuthor('All')}
            className={`px-3 py-1 rounded-md text-xs whitespace-nowrap transition-all ${
              selectedAuthor === 'All'
                ? 'bg-amber-500 text-zinc-950 font-bold shadow'
                : isDark
                ? 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                : 'bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-300'
            }`}
          >
            {t('authorAll')}
          </button>
          <button
            onClick={() => setSelectedAuthor('Kisha & Yasin')}
            className={`px-3 py-1 rounded-md text-xs whitespace-nowrap transition-all flex items-center gap-1 ${
              selectedAuthor === 'Kisha & Yasin'
                ? 'bg-amber-500 text-zinc-950 font-bold shadow'
                : isDark
                ? 'bg-zinc-950 text-amber-300 hover:text-white border border-amber-500/40'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-300'
            }`}
          >
            <span>{t('authorKishaYasin')}</span>
          </button>
          <button
            onClick={() => setSelectedAuthor('Yasin')}
            className={`px-3 py-1 rounded-md text-xs whitespace-nowrap transition-all flex items-center gap-1 ${
              selectedAuthor === 'Yasin'
                ? 'bg-amber-500 text-zinc-950 font-bold shadow'
                : isDark
                ? 'bg-zinc-950 text-amber-400 hover:text-white border border-amber-500/40'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-300'
            }`}
          >
            <Crown className="w-3 h-3 text-amber-500" />
            <span>{t('authorOnlyYasin')}</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20'
                  : isDark
                  ? 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                  : 'bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Trope Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className={`text-[11px] font-mono uppercase tracking-wider shrink-0 ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
            Tropes:
          </span>
          {tropes.map((trope) => (
            <button
              key={trope}
              onClick={() => setSelectedTrope(trope)}
              className={`px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap transition-all ${
                selectedTrope === trope
                  ? 'bg-zinc-800 text-amber-400 border border-amber-500/50 font-semibold'
                  : isDark
                  ? 'bg-zinc-950 text-zinc-500 hover:text-zinc-300 border border-zinc-900'
                  : 'bg-white text-zinc-500 hover:text-zinc-800 border border-zinc-200'
              }`}
            >
              {trope}
            </button>
          ))}
        </div>
      </div>

      {/* CATALOG HEADER INFO */}
      <div className={`flex items-center justify-between text-xs font-mono pb-4 border-b mb-6 ${
        isDark ? 'text-zinc-400 border-zinc-800' : 'text-zinc-600 border-zinc-200'
      }`}>
        <span>{t('showingBooks')} {filteredBooks.length} of {books.length} {t('crimeSagas')}</span>
        <span className="flex items-center gap-1 text-amber-500 font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive 3D Covers & Audio Reader Available</span>
        </span>
      </div>

      {/* 150-BOOK GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredBooks.map((book) => {
          const isSaved = savedBookIds.includes(book.id);

          return (
            <div
              key={book.id}
              className={`group p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between hover:shadow-xl ${
                isDark
                  ? 'bg-zinc-950/80 border-zinc-800/80 hover:border-amber-500/40 text-white hover:shadow-amber-500/5'
                  : 'bg-white border-zinc-200 hover:border-amber-400 text-zinc-900 hover:shadow-zinc-200'
              }`}
            >
              {/* 3D Cover */}
              <div className="flex justify-center mb-3">
                <BookCover
                  book={book}
                  size="md"
                  onInspect={() => onInspectCover(book)}
                  onRead={() => onOpenBook(book)}
                />
              </div>

              {/* Book Details */}
              <div className="space-y-2 mt-auto">
                <div className={`flex items-center justify-between text-[10px] font-mono ${
                  isDark ? 'text-zinc-400' : 'text-zinc-500'
                }`}>
                  <span className="line-clamp-1">{book.category}</span>
                  <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    {book.rating}
                  </span>
                </div>

                <h3 className={`font-serif text-sm font-bold group-hover:text-amber-500 transition-colors line-clamp-1 ${
                  isDark ? 'text-white' : 'text-zinc-900'
                }`}>
                  {book.title}
                </h3>

                {/* Author Byline */}
                <div className="flex items-center gap-1 text-[11px]">
                  <span className={`font-mono ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>{t('byAuthor')}</span>
                  <span className={`font-semibold ${
                    book.author === 'Kisha & Yasin'
                      ? 'text-amber-500 font-mono font-bold'
                      : book.author === 'Yasin'
                      ? 'text-amber-500 font-bold'
                      : isDark ? 'text-zinc-300' : 'text-zinc-700'
                  }`}>
                    {book.author}
                  </span>
                  {book.author === 'Yasin' && (
                    <span className={`text-[9px] px-1 rounded border ${
                      isDark ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-amber-100 text-amber-800 border-amber-300'
                    }`}>
                      Author Yasin
                    </span>
                  )}
                  {book.author === 'Kisha & Yasin' && (
                    <span className={`text-[9px] px-1 rounded border ${
                      isDark ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-rose-100 text-rose-800 border-rose-300'
                    }`}>
                      Co-Authored
                    </span>
                  )}
                </div>

                <p className={`text-[11px] line-clamp-1 italic ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  {book.femaleLead.name} ✕ {book.maleLead.name}
                </p>

                {/* Tropes tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {book.tropes.slice(0, 2).map((tr, idx) => (
                    <span
                      key={idx}
                      className={`text-[9px] px-1.5 py-0.5 rounded border ${
                        isDark ? 'bg-zinc-900 text-zinc-400 border-zinc-800' : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                      }`}
                    >
                      {tr}
                    </span>
                  ))}
                </div>

                {/* Bottom Actions */}
                <div className={`pt-2 border-t flex items-center justify-between gap-1.5 ${
                  isDark ? 'border-zinc-900' : 'border-zinc-100'
                }`}>
                  <button
                    onClick={() => onOpenBook(book)}
                    className="flex-1 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-600 dark:text-amber-300 border border-amber-500/30 font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>{t('reader')}</span>
                  </button>

                  {/* Ask for Collaboration Button */}
                  <button
                    onClick={() => onRequestCollaboration(book)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isDark
                        ? 'bg-zinc-900 hover:bg-zinc-800 text-amber-400 border-zinc-800 hover:border-amber-500/40'
                        : 'bg-zinc-50 hover:bg-zinc-100 text-amber-700 border-zinc-200'
                    }`}
                    title={t('askCollaboration')}
                  >
                    <Users className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onToggleShelf(book.id)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isSaved
                        ? 'bg-rose-950/60 border-rose-500/50 text-rose-400'
                        : isDark
                        ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-500 hover:text-zinc-900'
                    }`}
                    title={isSaved ? 'Remove from Shelf' : 'Save to Shelf'}
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
