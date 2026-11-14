import React from 'react';
import { Book } from '@/types';
import { X, Flame, Shield, BookOpen, Star } from 'lucide-react';

interface CoverModalProps {
  book: Book | null;
  onClose: () => void;
  onRead: (book: Book) => void;
}

export const CoverModal: React.FC<CoverModalProps> = ({ book, onClose, onRead }) => {
  if (!book) return null;

  const isFlagship = book.id === 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-amber-500/40 rounded-2xl shadow-2xl p-6 overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-mono">
            {isFlagship ? '★ Official Flagship Jacket Edition ★' : book.category}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            {book.title}
          </h2>
          <p className="text-sm text-zinc-400 italic">{book.subtitle}</p>
        </div>

        {/* Dual Covers Container (Side by Side) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch justify-center max-w-2xl mx-auto mb-6">
          {/* FRONT COVER */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-mono uppercase text-amber-400 mb-2 tracking-wider flex items-center gap-1">
              <span>Front Cover</span>
            </span>

            {isFlagship ? (
              <div className="w-64 sm:w-72 h-[380px] sm:h-[440px] rounded-xl overflow-hidden border-2 border-amber-500/50 shadow-2xl relative bg-black">
                <img
                  src="/covers/bound-by-spite-front.jpg"
                  alt="Bound by Spite Front Cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/80 via-white/10 to-transparent pointer-events-none" />
              </div>
            ) : (
              <div
                className="w-64 sm:w-72 h-[380px] sm:h-[440px] rounded-xl overflow-hidden border-2 border-amber-500/40 shadow-2xl relative bg-zinc-950 flex flex-col justify-between"
              >
                {/* People Photographic Background */}
                {book.coverImage && (
                  <img
                    src={book.coverImage}
                    alt={`${book.title} Cover`}
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] contrast-[1.1]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70 pointer-events-none" />
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/80 via-white/10 to-transparent pointer-events-none z-10" />

                <div className="relative z-10 p-5 flex flex-col justify-between h-full text-center">
                  <div>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-amber-300 font-mono drop-shadow">
                      {book.category}
                    </span>
                    <div className="text-[9px] text-zinc-300 tracking-wider">
                      {book.series}
                    </div>
                  </div>

                  <div className="my-auto flex flex-col items-center py-2">
                    <div className="w-14 h-14 rounded-full border border-amber-400/50 bg-black/60 backdrop-blur-md flex items-center justify-center mb-2 shadow-lg">
                      <span className="text-2xl">{book.coverCrest}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold uppercase text-white tracking-wide drop-shadow-md">
                      {book.title}
                    </h3>
                    <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-1.5" />
                    <p className="text-xs text-amber-200/90 font-serif italic drop-shadow">
                      {book.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/20 flex flex-col items-center bg-black/40 backdrop-blur-sm rounded-b p-1">
                    <span className="text-xs font-semibold tracking-widest uppercase text-white">
                      {book.penName || book.author}
                    </span>
                    <span className="text-[10px] text-zinc-300">
                      {book.femaleLead.name} ✕ {book.maleLead.name}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* BACK COVER */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-mono uppercase text-amber-400 mb-2 tracking-wider flex items-center gap-1">
              <span>Back Jacket</span>
            </span>

            {isFlagship ? (
              <div className="w-64 sm:w-72 h-[380px] sm:h-[440px] rounded-xl overflow-hidden border-2 border-amber-500/50 shadow-2xl relative bg-black">
                <img
                  src="/covers/bound-by-spite-back.jpg"
                  alt="Bound by Spite Back Jacket"
                  className="w-full h-full object-cover"
                />
                <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-black/80 via-white/10 to-transparent pointer-events-none" />
              </div>
            ) : (
              <div className="w-64 sm:w-72 h-[380px] sm:h-[440px] rounded-xl overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-zinc-950 relative p-5 flex flex-col justify-between text-left">
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-black/80 via-white/10 to-transparent pointer-events-none border-l border-white/5" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between text-[10px] text-amber-400 font-mono tracking-wider mb-2 uppercase">
                    <span>{book.category}</span>
                    <span className="flex items-center gap-1 text-rose-400">
                      <Flame className="w-3 h-3 fill-rose-500 text-rose-500" />
                      Spice {book.spiceLevel}/5
                    </span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-amber-300 italic mb-2">
                    "{book.blurbTeaser}"
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans line-clamp-6">
                    {book.synopsis}
                  </p>
                </div>

                <div className="relative z-10 p-2.5 bg-black/80 border border-zinc-800 rounded text-[10px]">
                  <p className="text-zinc-300 italic mb-1">
                    <span className="text-amber-300 font-semibold">{book.femaleLead.name}:</span> "{book.femaleLead.signatureQuote}"
                  </p>
                  <p className="text-zinc-300 italic">
                    <span className="text-blue-300 font-semibold">{book.maleLead.name}:</span> "{book.maleLead.signatureQuote}"
                  </p>
                </div>

                <div className="relative z-10 pt-2 border-t border-zinc-800 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-zinc-400 font-mono">ISBN {book.isbn}</div>
                    <div className="text-[9px] text-zinc-400 font-mono flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      {book.rating} ({book.reviewsCount.toLocaleString()} reviews)
                    </div>
                  </div>

                  <div className="h-7 w-24 bg-white p-0.5 flex items-stretch justify-around rounded-[1px]">
                    <div className="w-[2px] bg-black" />
                    <div className="w-[1px] bg-black" />
                    <div className="w-[3px] bg-black" />
                    <div className="w-[1px] bg-black" />
                    <div className="w-[2px] bg-black" />
                    <div className="w-[4px] bg-black" />
                    <div className="w-[2px] bg-black" />
                    <div className="w-[3px] bg-black" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Action CTA */}
        <div className="flex items-center justify-center gap-3 pt-4 border-t border-zinc-800">
          <button
            onClick={() => {
              onClose();
              onRead(book);
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold font-sans shadow-lg shadow-amber-500/20 transition-all text-xs"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open in Digital Reader</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
