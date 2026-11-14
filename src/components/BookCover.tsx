import React, { useState } from 'react';
import { Book } from '@/types';
import { RefreshCw, Maximize2, Flame, BookOpen } from 'lucide-react';

interface BookCoverProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showFlipButton?: boolean;
  onInspect?: () => void;
  onRead?: () => void;
  className?: string;
}

export const BookCover: React.FC<BookCoverProps> = ({
  book,
  size = 'md',
  showFlipButton = true,
  onInspect,
  onRead,
  className = ''
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!book) return null;

  const isFlagship = book.id === 1;

  const sizeClasses = {
    sm: 'w-36 h-52 text-xs',
    md: 'w-48 h-72 text-sm',
    lg: 'w-64 h-96 text-base',
    hero: 'w-72 sm:w-80 h-[450px] sm:h-[480px] text-base'
  }[size];

  // Specific high-res photographic covers for prominent titles
  const localFrontCoverMap: Record<number, string> = {
    1: '/covers/bound-by-spite-front.jpg',
    2: '/covers/vicious-crown-front.jpg',
    3: '/covers/serpents-vow-front.jpg',
    4: '/covers/sinful-mercy-front.jpg',
    5: '/covers/iron-orchid-front.jpg',
    6: '/covers/savage-symphony-front.jpg',
    7: '/covers/gilded-cages-front.jpg'
  };

  const frontCoverImage = localFrontCoverMap[book.id] || book.coverImage;

  return (
    <div className={`relative group perspective-1000 ${className}`}>
      {/* 3D Flip Container */}
      <div
        className={`relative ${sizeClasses} transition-transform duration-700 transform-style-3d shadow-2xl rounded-xl cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* FRONT COVER */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl backface-hidden overflow-hidden border border-amber-500/40 shadow-2xl bg-zinc-950"
        >
          {isFlagship ? (
            /* REAL UPLOADED FRONT COVER FOR BOUND BY SPITE */
            <div className="relative w-full h-full">
              <img
                src="/covers/bound-by-spite-front.jpg"
                alt="Bound by Spite: Slay Gonçalves - Front Cover"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/70 via-white/10 to-transparent pointer-events-none border-r border-white/10" />
              <div className="absolute inset-0 shadow-inner pointer-events-none ring-1 ring-inset ring-amber-400/20" />
            </div>
          ) : (
            /* REAL PHOTOGRAPHIC PICTURE COVERS FOR ALL OTHER STORIES */
            <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
              {/* Crisp photographic image of couple / people */}
              <img
                src={frontCoverImage}
                alt={`${book.title} Cover - ${book.femaleLead.name} & ${book.maleLead.name}`}
                className="absolute inset-0 w-full h-full object-cover filter contrast-[1.08] brightness-[0.88] group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Movie-poster style bottom and top gradients - keeps faces clearly visible */}
              <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/75 to-transparent pointer-events-none" />

              {/* Left spine shadow */}
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/80 via-white/10 to-transparent pointer-events-none z-10 border-r border-white/10" />

              {/* Front Cover Typography Overlay */}
              <div className="relative z-10 h-full flex flex-col justify-between p-3 select-none">
                {/* Header series & category */}
                <div className="flex items-center justify-between text-[9px] font-mono">
                  <span className="text-amber-300 uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded-full border border-amber-500/30 backdrop-blur-sm">
                    {book.category}
                  </span>
                  <span className="text-zinc-200 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                    ★ {book.rating}
                  </span>
                </div>

                {/* Bottom title & author plate */}
                <div className="mt-auto pt-2 flex flex-col text-center">
                  <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,1)] uppercase font-display leading-tight px-1">
                    {book.title}
                  </h3>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-1 mx-auto" />
                  <p className="text-[10px] text-amber-200 font-serif italic drop-shadow-md truncate">
                    {book.subtitle}
                  </p>

                  <div className="mt-1 pt-1 border-t border-white/20 flex items-center justify-between text-[9px] text-zinc-300">
                    <span className="font-bold text-white uppercase tracking-wider">{book.author}</span>
                    <span className="text-zinc-400 font-sans">{book.femaleLead.name} ✕ {book.maleLead.name}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BACK COVER */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl backface-hidden rotate-y-180 overflow-hidden border border-amber-500/40 shadow-2xl bg-zinc-950"
        >
          {isFlagship ? (
            /* REAL UPLOADED BACK COVER FOR BOUND BY SPITE */
            <div className="relative w-full h-full">
              <img
                src="/covers/bound-by-spite-back.jpg"
                alt="Bound by Spite: Slay Gonçalves - Back Jacket"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-black/70 via-white/10 to-transparent pointer-events-none border-l border-white/10" />
              <div className="absolute inset-0 shadow-inner pointer-events-none ring-1 ring-inset ring-amber-400/20" />
            </div>
          ) : (
            /* REAL PICTURE BACK JACKET FOR ALL OTHER STORIES */
            <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
              <img
                src="/covers/syndicate-back-jacket.jpg"
                alt={`${book.title} Back Jacket`}
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.6] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-black/60 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-black/80 via-white/10 to-transparent pointer-events-none border-l border-white/5" />

              <div className="relative z-10 flex flex-col h-full justify-between p-3.5 text-left select-none">
                <div>
                  <div className="flex items-center justify-between text-[9px] text-amber-400 font-mono tracking-wider mb-1 uppercase">
                    <span>{book.category}</span>
                    <span className="flex items-center gap-0.5 text-rose-400">
                      <Flame className="w-2.5 h-2.5 fill-rose-500 text-rose-500" />
                      Spice {book.spiceLevel}/5
                    </span>
                  </div>
                  <h4 className="font-serif text-[11px] font-bold text-amber-300 italic mb-1.5 leading-snug drop-shadow">
                    "{book.blurbTeaser}"
                  </h4>
                  <p className="text-[10px] text-zinc-200 leading-relaxed line-clamp-5 font-sans drop-shadow">
                    {book.synopsis}
                  </p>
                </div>

                {/* Leads Quote Box */}
                <div className="p-2 bg-black/80 border border-amber-500/30 rounded text-[9px] my-1 backdrop-blur-sm">
                  <p className="text-zinc-300 italic mb-0.5 line-clamp-1">
                    <span className="text-amber-400 font-semibold">{book.femaleLead.name}:</span> "{book.femaleLead.signatureQuote}"
                  </p>
                  <p className="text-zinc-300 italic line-clamp-1">
                    <span className="text-blue-400 font-semibold">{book.maleLead.name}:</span> "{book.maleLead.signatureQuote}"
                  </p>
                </div>

                {/* Barcode & ISBN */}
                <div className="pt-1.5 border-t border-zinc-700/80 flex items-center justify-between">
                  <div>
                    <span className="text-[8px] text-zinc-400 font-mono block">ISBN {book.isbn}</span>
                    <span className="text-[8px] text-amber-300 font-mono block">{book.rating}★ ({book.reviewsCount.toLocaleString()})</span>
                  </div>

                  <div className="h-6 w-16 bg-white p-0.5 flex items-stretch justify-around rounded-[1px] shadow">
                    <div className="w-[2px] bg-black" />
                    <div className="w-[1px] bg-black" />
                    <div className="w-[3px] bg-black" />
                    <div className="w-[1px] bg-black" />
                    <div className="w-[2px] bg-black" />
                    <div className="w-[3px] bg-black" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Controls */}
      <div className="mt-2.5 flex items-center justify-center gap-1.5">
        {showFlipButton && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(!isFlipped);
            }}
            className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-zinc-900/90 hover:bg-zinc-800 text-amber-300 border border-amber-500/30 transition-colors shadow"
            title="Flip Book"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{isFlipped ? 'Front Cover' : 'Back Jacket'}</span>
          </button>
        )}

        {onInspect && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onInspect();
            }}
            className="p-1 rounded bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 transition-colors"
            title="Inspect Front & Back Covers"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        )}

        {onRead && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRead();
            }}
            className="p-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors"
            title="Read Chapter 1"
          >
            <BookOpen className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
