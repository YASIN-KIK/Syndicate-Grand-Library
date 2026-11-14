import React from 'react';
import { Book, User } from '@/types';
import { BookCover } from './BookCover';
import { Bookmark, BookOpen, Trash2, ArrowLeft } from 'lucide-react';

interface ShelfViewProps {
  books: Book[];
  savedBookIds: number[];
  onToggleShelf: (bookId: number) => void;
  onOpenBook: (book: Book) => void;
  onInspectCover: (book: Book) => void;
  onBackToLibrary: () => void;
}

export const ShelfView: React.FC<ShelfViewProps> = ({
  books,
  savedBookIds,
  onToggleShelf,
  onOpenBook,
  onInspectCover,
  onBackToLibrary
}) => {
  const savedBooks = books.filter(b => savedBookIds.includes(b.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      <div className="flex items-center justify-between pb-6 border-b border-zinc-800 mb-8">
        <div>
          <button
            onClick={onBackToLibrary}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-amber-300 transition-colors font-mono mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Grand Library</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-amber-400 fill-amber-400" />
            <span>My Personal Syndicate Shelf</span>
          </h1>
          <p className="text-xs text-zinc-400">
            {savedBooks.length} Novels Saved for Offline Reading & Quick Audio Access
          </p>
        </div>
      </div>

      {savedBooks.length === 0 ? (
        <div className="p-16 text-center bg-zinc-950 border border-zinc-800 rounded-2xl max-w-md mx-auto">
          <Bookmark className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
          <h3 className="text-lg font-serif font-bold text-white">Your Shelf is Empty</h3>
          <p className="text-xs text-zinc-400 mt-1 mb-6">
            Browse the 150-book library and click the bookmark icon on any novel to save it to your personal shelf.
          </p>
          <button
            onClick={onBackToLibrary}
            className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs"
          >
            Explore 150 Books
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {savedBooks.map(book => (
            <div
              key={book.id}
              className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between"
            >
              <div className="flex justify-center mb-3">
                <BookCover
                  book={book}
                  size="md"
                  onInspect={() => onInspectCover(book)}
                  onRead={() => onOpenBook(book)}
                />
              </div>

              <div className="space-y-2 mt-auto">
                <span className="text-[10px] text-amber-400 font-mono uppercase">{book.category}</span>
                <h4 className="text-sm font-bold text-white font-serif line-clamp-1">{book.title}</h4>
                <p className="text-xs text-zinc-400 italic line-clamp-1">
                  {book.femaleLead.name} ✕ {book.maleLead.name}
                </p>

                <div className="pt-2 border-t border-zinc-900 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onOpenBook(book)}
                    className="flex-1 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 font-semibold text-xs flex items-center justify-center gap-1"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Read Now</span>
                  </button>

                  <button
                    onClick={() => onToggleShelf(book.id)}
                    className="p-1.5 rounded-lg bg-zinc-900 hover:bg-rose-950/60 text-zinc-400 hover:text-rose-400 border border-zinc-800 transition-colors"
                    title="Remove from Shelf"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
