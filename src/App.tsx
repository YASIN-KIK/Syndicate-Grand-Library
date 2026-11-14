import * as React from "react";
import { BOOKS } from "@/data/books";
import { Book, User, SiteTheme, LanguageCode, CollaborationRequest } from "@/types";
import { Navbar } from "@/components/Navbar";
import { LibraryView } from "@/components/LibraryView";
import { ReaderView } from "@/components/ReaderView";
import { CharacterDossiers } from "@/components/CharacterDossiers";
import { BanterVault } from "@/components/BanterVault";
import { AuthorStudio } from "@/components/AuthorStudio";
import { AdminCouncil } from "@/components/AdminCouncil";
import { ShelfView } from "@/components/ShelfView";
import { FriendsChatView } from "@/components/FriendsChatView";
import { CoverModal } from "@/components/CoverModal";
import { AuthModal } from "@/components/AuthModal";
import { AiAssistantWidget } from "@/components/AiAssistantWidget";
import { EditProfileModal } from "@/components/EditProfileModal";
import { CollaborationModal } from "@/components/CollaborationModal";

export default function App() {
  const [books, setBooks] = React.useState<Book[]>(BOOKS);
  const [currentBook, setCurrentBook] = React.useState<Book | null>(BOOKS[0]);
  const [activeView, setActiveView] = React.useState<
    'library' | 'reader' | 'dossiers' | 'banter' | 'author' | 'admin' | 'shelf' | 'chat'
  >('library');

  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [savedBookIds, setSavedBookIds] = React.useState<number[]>([1]);
  const [inspectingBook, setInspectingBook] = React.useState<Book | null>(null);
  const [collaboratingBook, setCollaboratingBook] = React.useState<Book | null>(null);
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);

  // Site Theme: Pure Black vs Pure White
  const [siteTheme, setSiteTheme] = React.useState<SiteTheme>('black');

  // Multi-language system (English, Portuguese, Russian, Spanish, French, Italian, German, Arabic, Japanese, Chinese)
  const [language, setLanguage] = React.useState<LanguageCode>('en');

  // Initialize books, theme, language, and user profile on mount
  React.useEffect(() => {
    try {
      // Theme
      const storedTheme = localStorage.getItem('syndicate_site_theme') as SiteTheme | null;
      if (storedTheme === 'white' || storedTheme === 'black') {
        setSiteTheme(storedTheme);
      }

      // Language
      const storedLang = localStorage.getItem('syndicate_lang') as LanguageCode | null;
      if (storedLang) {
        setLanguage(storedLang);
      }

      // Authored books
      const storedAuthored = localStorage.getItem('syndicate_authored_books');
      const authored: Book[] = storedAuthored ? JSON.parse(storedAuthored) : [];
      const combined = [...authored, ...BOOKS];
      setBooks(combined);
      setCurrentBook(BOOKS[0]);

      // User
      const storedUser = localStorage.getItem('syndicate_current_user');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }

      // Shelf
      const storedShelf = localStorage.getItem('syndicate_saved_shelf');
      if (storedShelf) {
        setSavedBookIds(JSON.parse(storedShelf));
      }
    } catch (e) {
      console.warn("Storage load error", e);
      setBooks(BOOKS);
      setCurrentBook(BOOKS[0]);
    }
  }, []);

  const handleToggleTheme = () => {
    setSiteTheme(prev => {
      const next: SiteTheme = prev === 'black' ? 'white' : 'black';
      localStorage.setItem('syndicate_site_theme', next);
      return next;
    });
  };

  const handleSelectLanguage = (newLang: LanguageCode) => {
    setLanguage(newLang);
    localStorage.setItem('syndicate_lang', newLang);
  };

  const handleOpenBook = (book: Book) => {
    setCurrentBook(book);
    setActiveView('reader');
  };

  const handleToggleShelf = (bookId: number) => {
    setSavedBookIds(prev => {
      const updated = prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId];
      localStorage.setItem('syndicate_saved_shelf', JSON.stringify(updated));
      return updated;
    });
  };

  const handlePublishBook = (newBook: Book) => {
    setBooks(prev => {
      const updated = [newBook, ...prev];
      const authoredOnly = updated.filter(b => b.isAuthorOriginal);
      localStorage.setItem('syndicate_authored_books', JSON.stringify(authoredOnly));
      return updated;
    });
    setSavedBookIds(prev => {
      const next = [newBook.id, ...prev];
      localStorage.setItem('syndicate_saved_shelf', JSON.stringify(next));
      return next;
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('syndicate_current_user');
    setCurrentUser(null);
    if (activeView === 'admin') {
      setActiveView('library');
    }
  };

  const handleUpdateUser = (updated: User) => {
    setCurrentUser(updated);
    localStorage.setItem('syndicate_current_user', JSON.stringify(updated));
  };

  const handleSendCollaborationRequest = (req: CollaborationRequest) => {
    try {
      const stored = localStorage.getItem('syndicate_collaborations');
      const list: CollaborationRequest[] = stored ? JSON.parse(stored) : [];
      list.unshift(req);
      localStorage.setItem('syndicate_collaborations', JSON.stringify(list));
    } catch (e) {
      console.warn("Collab save error", e);
    }
  };

  const authoredBooks = books.filter(b => b.isAuthorOriginal);
  const isDark = siteTheme === 'black';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 selection:bg-amber-500 selection:text-black ${
        isDark ? 'bg-black text-zinc-100' : 'bg-white text-zinc-900'
      }`}
    >
      {/* Primary Navigation */}
      <Navbar
        activeView={activeView}
        onSelectView={setActiveView}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        hasActiveBook={!!currentBook}
        savedBooksCount={savedBookIds.length}
        siteTheme={siteTheme}
        onToggleTheme={handleToggleTheme}
        language={language}
        onSelectLanguage={handleSelectLanguage}
        onOpenEditProfile={() => setIsEditProfileOpen(true)}
      />

      {/* Main View Router */}
      <div className="flex-1">
        {activeView === 'library' && (
          <LibraryView
            books={books}
            onOpenBook={handleOpenBook}
            onInspectCover={setInspectingBook}
            savedBookIds={savedBookIds}
            onToggleShelf={handleToggleShelf}
            currentUser={currentUser}
            onOpenAuth={() => setIsAuthOpen(true)}
            onOpenChat={() => setActiveView('chat')}
            siteTheme={siteTheme}
            language={language}
            onRequestCollaboration={setCollaboratingBook}
          />
        )}

        {activeView === 'reader' && currentBook && (
          <ReaderView
            book={currentBook}
            onBackToLibrary={() => setActiveView('library')}
            currentUser={currentUser}
            onOpenAuth={() => setIsAuthOpen(true)}
            onInspectCover={setInspectingBook}
            siteTheme={siteTheme}
            language={language}
            onRequestCollaboration={setCollaboratingBook}
          />
        )}

        {activeView === 'dossiers' && (
          <CharacterDossiers />
        )}

        {activeView === 'banter' && (
          <BanterVault />
        )}

        {activeView === 'shelf' && (
          <ShelfView
            books={books}
            savedBookIds={savedBookIds}
            onToggleShelf={handleToggleShelf}
            onOpenBook={handleOpenBook}
            onInspectCover={setInspectingBook}
            onBackToLibrary={() => setActiveView('library')}
          />
        )}

        {activeView === 'author' && (
          <AuthorStudio
            currentUser={currentUser}
            onPublishBook={handlePublishBook}
            authoredBooks={authoredBooks}
            onOpenBook={handleOpenBook}
            siteTheme={siteTheme}
          />
        )}

        {activeView === 'chat' && (
          <FriendsChatView
            currentUser={currentUser}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {activeView === 'admin' && (
          <AdminCouncil
            currentUser={currentUser}
            onUpdateUser={handleUpdateUser}
          />
        )}
      </div>

      {/* Floating Syndicate AI Assistant Widget */}
      <AiAssistantWidget />

      {/* Front & Back Cover Inspection Modal */}
      <CoverModal
        book={inspectingBook}
        onClose={() => setInspectingBook(null)}
        onRead={handleOpenBook}
      />

      {/* Authentication & Clearance Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={setCurrentUser}
      />

      {/* User Name / Profile Change Modal */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        currentUser={currentUser}
        onSaveUser={handleUpdateUser}
        siteTheme={siteTheme}
      />

      {/* Collaboration / Co-Author Request Modal */}
      <CollaborationModal
        isOpen={!!collaboratingBook}
        onClose={() => setCollaboratingBook(null)}
        book={collaboratingBook}
        currentUser={currentUser}
        onSendRequest={handleSendCollaborationRequest}
        siteTheme={siteTheme}
      />
    </div>
  );
}
