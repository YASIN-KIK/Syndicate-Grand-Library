import React, { useState, useEffect } from 'react';
import { Book, User, SiteTheme, CollaborationRequest } from '@/types';
import {
  Feather, Sparkles, BookOpen, Crown, CheckCircle2, Flame,
  Shield, ArrowRight, Users, Check, X, MessageSquare
} from 'lucide-react';
import { BookCover } from './BookCover';

interface AuthorStudioProps {
  currentUser: User | null;
  onPublishBook: (newBook: Book) => void;
  authoredBooks: Book[];
  onOpenBook: (book: Book) => void;
  siteTheme: SiteTheme;
}

export const AuthorStudio: React.FC<AuthorStudioProps> = ({
  currentUser,
  onPublishBook,
  authoredBooks,
  onOpenBook,
  siteTheme
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'my-books' | 'collaborations'>('create');
  const isDark = siteTheme === 'black';

  // Collaborations State
  const [collaborations, setCollaborations] = useState<CollaborationRequest[]>([]);

  // Builder form state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Italian Cosa Nostra');
  const [series, setSeries] = useState('');
  const [selectedTropes, setSelectedTropes] = useState<string[]>(['Enemies to Lovers', 'He Falls First']);
  const [spiceLevel, setSpiceLevel] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [coverGradient, setCoverGradient] = useState('from-zinc-950 via-rose-950/80 to-black');
  const [coverCrest, setCoverCrest] = useState('🗡️');
  const [coAuthorName, setCoAuthorName] = useState('');

  // Leads
  const [hName, setHName] = useState('');
  const [hAge, setHAge] = useState(22);
  const [hHeight, setHHeight] = useState("5'3\"");
  const [hArchetype, setHArchetype] = useState('Lethal Heiress & Blade Specialist');
  const [hQuote, setHQuote] = useState('');

  const [mName, setMName] = useState('');
  const [mAge, setMAge] = useState(25);
  const [mHeight, setMHeight] = useState("6'3\"");
  const [mArchetype, setMArchetype] = useState('Cold-Blooded Underworld King');
  const [mQuote, setMQuote] = useState('');

  // Blurb & Text
  const [synopsis, setSynopsis] = useState('');
  const [blurbTeaser, setBlurbTeaser] = useState('');
  const [chapter1Text, setChapter1Text] = useState('');
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  // Load Collaborations
  useEffect(() => {
    try {
      const stored = localStorage.getItem('syndicate_collaborations');
      if (stored) {
        setCollaborations(JSON.parse(stored));
      } else {
        const initialCollabs: CollaborationRequest[] = [
          {
            id: 'collab-init-1',
            bookId: 1,
            bookTitle: 'Bound by Spite: Slay Gonçalves',
            requesterName: 'Genevieve Vance',
            requesterPenName: 'G. Vance',
            requesterEmail: 'genevieve.vance@bratva.net',
            targetAuthor: 'Kisha & Yasin',
            role: 'co-author',
            pitch: 'Proposing a special Season 4 crossover arc set in Saint Petersburg where Slay and Egor uncover an old Vance Bratva family secret.',
            proposedChapterTitle: 'Chapter 18: The Northern Bloodline',
            status: 'pending',
            createdAt: new Date().toISOString()
          },
          {
            id: 'collab-init-2',
            bookId: 2,
            bookTitle: 'Vicious Crown',
            requesterName: 'Matteo Bellini',
            requesterPenName: 'Don Bellini',
            requesterEmail: 'm.bellini@camorra.it',
            targetAuthor: 'Yasin',
            role: 'lore-consultant',
            pitch: 'I have authentic Sicilian underworld shipping route records and dialetical dialogue to refine Matteo & Sofia\'s family feud in Book 2.',
            status: 'pending',
            createdAt: new Date().toISOString()
          }
        ];
        setCollaborations(initialCollabs);
        localStorage.setItem('syndicate_collaborations', JSON.stringify(initialCollabs));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleUpdateCollabStatus = (id: string, newStatus: 'accepted' | 'declined') => {
    const updated = collaborations.map(c => c.id === id ? { ...c, status: newStatus } : c);
    setCollaborations(updated);
    localStorage.setItem('syndicate_collaborations', JSON.stringify(updated));
  };

  const startJointStoryWith = (collab: CollaborationRequest) => {
    setTitle(`Crossfire of Shadows`);
    setSubtitle(`Co-Authored with ${collab.requesterPenName}`);
    setCoAuthorName(collab.requesterPenName);
    setSynopsis(`A joint syndicate chronicle co-created by ${currentUser?.penName || 'Yasin'} and ${collab.requesterPenName}. Based on the proposal: "${collab.pitch}"`);
    setBlurbTeaser(`When two authors unite their lethal leads, no syndicate will remain unbroken.`);
    setActiveTab('create');
  };

  const tropesList = [
    "Enemies to Lovers", "He Falls First", "Arranged Marriage", "Height Difference",
    "Touch Her and Die", "Forced Proximity", "Morally Grey Hero", "Lethal Heroine",
    "Childhood Rivals", "Revenge Arc"
  ];

  const gradients = [
    { label: 'Obsidian Crimson', val: 'from-zinc-950 via-rose-950/80 to-black' },
    { label: 'Midnight Sapphire', val: 'from-slate-950 via-blue-950/80 to-black' },
    { label: 'Royal Emerald', val: 'from-zinc-950 via-emerald-950/70 to-black' },
    { label: 'Gilded Amber', val: 'from-neutral-950 via-amber-950/70 to-black' },
    { label: 'Velvet Plum', val: 'from-stone-950 via-purple-950/80 to-black' },
    { label: 'Blood Noir', val: 'from-red-950 via-zinc-950 to-black' }
  ];

  const crests = ["🗡️", "🐺", "👑", "🐍", "🥀", "🔥", "⚜️", "⚔️", "🦅", "💎"];

  const handleToggleTrope = (trope: string) => {
    if (selectedTropes.includes(trope)) {
      setSelectedTropes(selectedTropes.filter(t => t !== trope));
    } else {
      setSelectedTropes([...selectedTropes, trope]);
    }
  };

  const autoFillSample = () => {
    setTitle("Cruel Allegiance");
    setSubtitle("A Sicilian Blood Legacy");
    setCategory("Italian Cosa Nostra");
    setSeries("The Bellini Dynasty #1");
    setSelectedTropes(["Enemies to Lovers", "He Falls First", "Height Difference", "Touch Her and Die"]);
    setCoverGradient("from-zinc-950 via-rose-950/80 to-black");
    setCoverCrest("👑");
    setHName("Alessia Bellini");
    setHAge(22);
    setHHeight("5'2\"");
    setHArchetype("Silent Syndicate Chemist");
    setHQuote("You think your wealth makes you untouchable, Dante. My toxins disagree.");
    setMName("Dante Moretti");
    setMAge(26);
    setMHeight("6'4\"");
    setMArchetype("Ruthless Capo & Possessive Shadow");
    setMQuote("Run to the end of the earth, Alessia. I'll still find you and put my ring on your finger.");
    setBlurbTeaser("They were raised to tear down each other's empires. Now they must rule together or bleed.");
    setSynopsis("When an explosive power vacuum shatters the Sicilian commission, Alessia Bellini is forced into an ironclad marriage with Dante Moretti, her father's fiercest rival. He has watched her from the shadows for years; she wants his head on a silver platter.");
    setChapter1Text("The rainfall pounded against the stained glass windows of the cathedral as Alessia checked her lace gloves. Standing across the aisle was Dante Moretti—broad, lethal, and staring at her like a predator who had finally cornered his salvation. 'You're trembling, little bird,' he rumbled. 'I'm not trembling from fear, Dante,' she whispered. 'I'm trembling from restraint.'");
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !hName.trim() || !mName.trim()) return;

    const baseAuthor = currentUser?.penName || currentUser?.name || 'Yasin';
    const finalAuthor = coAuthorName.trim() ? `${baseAuthor} & ${coAuthorName.trim()}` : baseAuthor;

    const newBook: Book = {
      id: Date.now(),
      title: title.trim(),
      subtitle: subtitle.trim() || `${hName} & ${mName}`,
      author: finalAuthor,
      penName: finalAuthor,
      coAuthors: coAuthorName.trim() ? [coAuthorName.trim()] : undefined,
      rating: 4.95,
      reviewsCount: 1,
      pages: 420,
      spiceLevel,
      category,
      series: series.trim() || `${title} Series #1`,
      tropes: selectedTropes,
      tags: ["Author Original", category, selectedTropes[0] || "Romance"],
      coverGradient,
      coverCrest,
      femaleLead: {
        name: hName.trim(),
        age: hAge,
        height: hHeight,
        archetype: hArchetype,
        specs: ["Lethal strategist", "High-society heiress"],
        signatureQuote: hQuote.trim() || "Surrender is not in my vocabulary."
      },
      maleLead: {
        name: mName.trim(),
        age: mAge,
        height: mHeight,
        archetype: mArchetype,
        specs: ["Underworld kingpin", "Fiercely protective"],
        signatureQuote: mQuote.trim() || "You are mine, now and forever."
      },
      synopsis: synopsis.trim() || "An explosive underworld dark romance.",
      blurbTeaser: blurbTeaser.trim() || "When hate burns hotter than blood.",
      isbn: `978-1-ORG-${Date.now().toString().slice(-4)}-1`,
      isAuthorOriginal: true,
      chapters: [
        {
          id: 1,
          season: 1,
          title: "The Genesis of Spite",
          subtitle: "Chapter 1 Manuscript",
          wordCount: chapter1Text ? chapter1Text.split(' ').length : 350,
          readingTimeMin: 4,
          pov: hName,
          location: `Neutral Territory — ${category}`,
          paragraphs: chapter1Text ? chapter1Text.split('\n\n').filter(p => p.trim()) : [
            `The rain beat against the black tinted glass of the estate as ${hName} straightened her tailored cuffs. Across the room, ${mName} stood watching, his blue eyes sharp and unblinking.`,
            `"You shouldn't have come here alone," ${mName} warned, taking a slow step toward her.`,
            `"I'm never alone, ${mName.split(' ')[0]}," she whispered, touching the concealed blade beneath her jacket. "I brought everything I need to bring you to your knees."`,
            `A dangerous smile touched his lips. "I look forward to seeing you try."`
          ]
        }
      ]
    };

    onPublishBook(newBook);
    setPublishedSuccess(true);
    setTimeout(() => {
      setPublishedSuccess(false);
      setActiveTab('my-books');
    }, 1200);
  };

  const previewBook: Book = {
    id: 9999,
    title: title || 'Book Title Preview',
    subtitle: subtitle || 'Subtitle & Series',
    author: coAuthorName.trim() ? `${currentUser?.penName || 'Author'} & ${coAuthorName}` : (currentUser?.penName || 'Author Pen Name'),
    rating: 4.95,
    reviewsCount: 1,
    pages: 420,
    spiceLevel,
    category,
    series: series || 'Series #1',
    tropes: selectedTropes,
    tags: [category],
    coverGradient,
    coverCrest,
    femaleLead: {
      name: hName || 'Heroine Name',
      age: hAge,
      height: hHeight,
      archetype: hArchetype,
      specs: [],
      signatureQuote: hQuote || 'Quote...'
    },
    maleLead: {
      name: mName || 'Hero Name',
      age: mAge,
      height: mHeight,
      archetype: mArchetype,
      specs: [],
      signatureQuote: mQuote || 'Quote...'
    },
    synopsis: synopsis || 'Book synopsis will display here on the back jacket.',
    blurbTeaser: blurbTeaser || 'Teaser hook goes here.',
    isbn: '978-0-PREVIEW-1'
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-300 transition-colors ${
      isDark ? 'text-zinc-100' : 'text-zinc-900'
    }`}>
      {/* Studio Header */}
      <div className={`p-6 rounded-2xl border shadow-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors ${
        isDark
          ? 'bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border-amber-500/40 text-white'
          : 'bg-gradient-to-r from-zinc-50 via-white to-amber-50 border-zinc-200 text-zinc-900 shadow-xl'
      }`}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl border-2 border-amber-500/50 bg-amber-500/10 flex items-center justify-center shadow-lg">
            <Feather className="w-7 h-7 text-amber-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded border ${
                isDark ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' : 'text-amber-800 bg-amber-100 border-amber-300'
              }`}>
                Author Studio
              </span>
              <span className={`text-xs font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Byline: {currentUser?.penName || currentUser?.name || 'Yasin (Author)'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold mt-1">
              Syndicate Chronicle Workshop
            </h1>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Draft novels, collaborate with co-authors, customize 3D covers, and publish into the Grand Library.
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className={`flex border rounded-lg p-1 shrink-0 ${
          isDark ? 'border-zinc-800 bg-black/50' : 'border-zinc-300 bg-zinc-100'
        }`}>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'create'
                ? 'bg-amber-500 text-zinc-950 shadow'
                : isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Novel Creator
          </button>
          <button
            onClick={() => setActiveTab('my-books')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'my-books'
                ? 'bg-amber-500 text-zinc-950 shadow'
                : isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <span>My Books</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-200 text-zinc-700'
            }`}>
              {authoredBooks.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('collaborations')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'collaborations'
                ? 'bg-amber-500 text-zinc-950 shadow'
                : isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Collaborations</span>
            <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-500 font-bold rounded-full text-[10px]">
              {collaborations.length}
            </span>
          </button>
        </div>
      </div>

      {activeTab === 'collaborations' ? (
        /* COLLABORATIONS TAB */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-serif font-bold">Author Collaboration Hub</h3>
              <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Manage co-author invitations, incoming scene pitches, and joint story proposals.
              </p>
            </div>
            <button
              onClick={() => {
                setCoAuthorName('Guest Co-Author');
                setTitle('Untitled Joint Sagas');
                setActiveTab('create');
              }}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-zinc-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Users className="w-4 h-4" />
              <span>Start Joint Co-Authored Story</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collaborations.map((collab) => (
              <div
                key={collab.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isDark
                    ? 'bg-zinc-950 border-zinc-800 hover:border-amber-500/40'
                    : 'bg-white border-zinc-200 hover:border-amber-400 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                    <span className="text-amber-500 font-semibold uppercase">{collab.role} Request</span>
                    <span className={`px-2 py-0.5 rounded-full border ${
                      collab.status === 'accepted'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : collab.status === 'declined'
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                        : isDark ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-amber-100 text-amber-800 border-amber-300'
                    }`}>
                      {collab.status.toUpperCase()}
                    </span>
                  </div>

                  <h4 className="font-serif text-base font-bold mb-1">
                    Book: "{collab.bookTitle}"
                  </h4>
                  <div className={`text-xs mb-3 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    From: <span className="font-semibold text-amber-500">{collab.requesterPenName}</span> ({collab.requesterEmail})
                  </div>

                  {collab.proposedChapterTitle && (
                    <div className={`p-2 rounded-lg border text-xs font-mono mb-2 ${
                      isDark ? 'bg-zinc-900 border-zinc-800 text-amber-300' : 'bg-zinc-50 border-zinc-200 text-amber-800'
                    }`}>
                      Proposal: {collab.proposedChapterTitle}
                    </div>
                  )}

                  <p className={`text-xs leading-relaxed italic ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    "{collab.pitch}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-800/40 flex items-center justify-between gap-2">
                  {collab.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleUpdateCollabStatus(collab.id, 'accepted')}
                        className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept & Co-Author</span>
                      </button>
                      <button
                        onClick={() => handleUpdateCollabStatus(collab.id, 'declined')}
                        className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                          isDark ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border-zinc-800' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600 border-zinc-300'
                        }`}
                      >
                        Decline
                      </button>
                    </>
                  ) : (
                    <div className="w-full flex items-center justify-between text-xs">
                      <span className={`font-mono text-[11px] ${collab.status === 'accepted' ? 'text-emerald-500' : 'text-rose-400'}`}>
                        {collab.status === 'accepted' ? '✓ Accepted — Co-Author active' : '✗ Proposal declined'}
                      </span>
                      {collab.status === 'accepted' && (
                        <button
                          onClick={() => startJointStoryWith(collab)}
                          className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs"
                        >
                          Co-Write Story
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : activeTab === 'my-books' ? (
        /* MY BOOKS TAB */
        <div>
          {authoredBooks.length === 0 ? (
            <div className={`p-12 text-center rounded-2xl border ${
              isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'
            }`}>
              <BookOpen className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
              <h3 className="text-lg font-serif font-bold">No Published Novels Yet</h3>
              <p className={`text-xs max-w-sm mx-auto mt-1 mb-4 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Switch to the Novel Creator tab to write and publish your first mafia romance into the Grand Library!
              </p>
              <button
                onClick={() => setActiveTab('create')}
                className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs"
              >
                Start Writing
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {authoredBooks.map(book => (
                <div key={book.id} className={`p-4 rounded-xl border flex flex-col items-center ${
                  isDark ? 'bg-zinc-950 border-amber-500/30' : 'bg-white border-zinc-200 shadow-sm'
                }`}>
                  <BookCover book={book} size="md" onRead={() => onOpenBook(book)} />
                  <div className="mt-3 text-center">
                    <span className="text-[10px] text-amber-500 font-mono">Author Original</span>
                    <h4 className="text-sm font-bold font-serif">{book.title}</h4>
                    <button
                      onClick={() => onOpenBook(book)}
                      className="mt-2 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded text-xs"
                    >
                      Read in Reader
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* NOVEL CREATOR FORM */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold flex items-center gap-2">
                <span>Configure Novel Manuscript</span>
              </h3>
              <button
                type="button"
                onClick={autoFillSample}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                  isDark
                    ? 'bg-zinc-900 hover:bg-zinc-800 text-amber-300 border-amber-500/30'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-amber-800 border-zinc-300'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-Fill Sample Concept</span>
              </button>
            </div>

            <form onSubmit={handlePublish} className="space-y-6">
              {/* Section 1: Identity & Co-Authors */}
              <div className={`p-5 rounded-xl border space-y-4 ${
                isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'
              }`}>
                <h4 className="text-xs uppercase font-mono tracking-wider text-amber-500 font-bold">
                  Step 1: Novel Identity & Authorship
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-xs mb-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Book Title</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Vicious Vows"
                      className={`w-full rounded-lg px-3 py-2 text-xs border focus:outline-none focus:border-amber-400 ${
                        isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs mb-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Subtitle / Series Hook</label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="e.g. An Arranged Bratva Romance"
                      className={`w-full rounded-lg px-3 py-2 text-xs border focus:outline-none focus:border-amber-400 ${
                        isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                      }`}
                    />
                  </div>
                </div>

                {/* Co-Author byline option */}
                <div>
                  <label className={`block text-xs mb-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Collaborating Co-Author (Optional)
                  </label>
                  <input
                    type="text"
                    value={coAuthorName}
                    onChange={(e) => setCoAuthorName(e.target.value)}
                    placeholder="Enter co-author pen name (e.g. Kisha, or fellow user)..."
                    className={`w-full rounded-lg px-3 py-2 text-xs border focus:outline-none focus:border-amber-400 ${
                      isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                    }`}
                  />
                  <span className={`text-[10px] mt-0.5 block ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    Both authors will be accredited on the 3D book cover and in the library.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-xs mb-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Syndicate Subgenre</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={`w-full rounded-lg px-3 py-2 text-xs border focus:outline-none focus:border-amber-400 ${
                        isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                      }`}
                    >
                      <option value="Italian Cosa Nostra">Italian Cosa Nostra</option>
                      <option value="Russian Bratva">Russian Bratva</option>
                      <option value="Irish Syndicate">Irish Syndicate</option>
                      <option value="Iberian & Latin Cartels">Iberian & Latin Cartels</option>
                      <option value="Dark Academia">Dark Academia</option>
                      <option value="Billionaire Dynasties">Billionaire Dynasties</option>
                      <option value="Yakuza & Triads">Yakuza & Triads</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-xs mb-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Series Name & Number</label>
                    <input
                      type="text"
                      value={series}
                      onChange={(e) => setSeries(e.target.value)}
                      placeholder="e.g. The Sovereign Crown #1"
                      className={`w-full rounded-lg px-3 py-2 text-xs border focus:outline-none focus:border-amber-400 ${
                        isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                      }`}
                    />
                  </div>
                </div>

                {/* Tropes Selection */}
                <div>
                  <label className={`block text-xs mb-2 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Key Tropes</label>
                  <div className="flex flex-wrap gap-1.5">
                    {tropesList.map(trope => (
                      <button
                        type="button"
                        key={trope}
                        onClick={() => handleToggleTrope(trope)}
                        className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                          selectedTropes.includes(trope)
                            ? 'bg-amber-500/20 border-amber-400 text-amber-500 font-semibold'
                            : isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-zinc-100 border-zinc-300 text-zinc-600'
                        }`}
                      >
                        {trope}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 2: Cover Styling */}
              <div className={`p-5 rounded-xl border space-y-4 ${
                isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'
              }`}>
                <h4 className="text-xs uppercase font-mono tracking-wider text-amber-500 font-bold">
                  Step 2: Cover Jacket Aesthetic & Crest
                </h4>
                <div>
                  <label className={`block text-xs mb-2 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Color Gradient</label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {gradients.map(g => (
                      <button
                        type="button"
                        key={g.label}
                        onClick={() => setCoverGradient(g.val)}
                        className={`p-2 rounded-lg border text-[10px] text-center transition-all ${
                          coverGradient === g.val
                            ? 'border-amber-500 bg-amber-500/15 font-bold'
                            : isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-400' : 'border-zinc-200 bg-zinc-50 text-zinc-700'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={`block text-xs mb-2 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Syndicate Crest Icon</label>
                  <div className="flex flex-wrap gap-2">
                    {crests.map(c => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setCoverCrest(c)}
                        className={`w-9 h-9 rounded-lg border flex items-center justify-center text-lg transition-all ${
                          coverCrest === c
                            ? 'border-amber-500 bg-amber-500/20 shadow'
                            : isDark ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-200 bg-zinc-50'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 3: Characters */}
              <div className={`p-5 rounded-xl border space-y-4 ${
                isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'
              }`}>
                <h4 className="text-xs uppercase font-mono tracking-wider text-amber-500 font-bold">
                  Step 3: Character Leads Configuration
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Female Lead */}
                  <div className={`p-3 rounded-lg border space-y-2 ${
                    isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                  }`}>
                    <span className="text-[11px] font-bold text-amber-500">Female Lead (Heroine)</span>
                    <input
                      type="text"
                      required
                      value={hName}
                      onChange={(e) => setHName(e.target.value)}
                      placeholder="Heroine Name..."
                      className={`w-full rounded px-2.5 py-1.5 text-xs border ${
                        isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-zinc-300 text-zinc-900'
                      }`}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={hHeight}
                        onChange={(e) => setHHeight(e.target.value)}
                        placeholder="Height e.g. 5'2&quot;"
                        className={`rounded px-2 py-1 text-xs border ${
                          isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-zinc-300 text-zinc-900'
                        }`}
                      />
                      <input
                        type="text"
                        value={hArchetype}
                        onChange={(e) => setHArchetype(e.target.value)}
                        placeholder="Archetype..."
                        className={`rounded px-2 py-1 text-xs border ${
                          isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-zinc-300 text-zinc-900'
                        }`}
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={hQuote}
                      onChange={(e) => setHQuote(e.target.value)}
                      placeholder="Signature dialogue quote..."
                      className={`w-full rounded px-2.5 py-1.5 text-xs border resize-none ${
                        isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-zinc-300 text-zinc-900'
                      }`}
                    />
                  </div>

                  {/* Male Lead */}
                  <div className={`p-3 rounded-lg border space-y-2 ${
                    isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                  }`}>
                    <span className="text-[11px] font-bold text-blue-500">Male Lead (Hero)</span>
                    <input
                      type="text"
                      required
                      value={mName}
                      onChange={(e) => setMName(e.target.value)}
                      placeholder="Hero Name..."
                      className={`w-full rounded px-2.5 py-1.5 text-xs border ${
                        isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-zinc-300 text-zinc-900'
                      }`}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={mHeight}
                        onChange={(e) => setMHeight(e.target.value)}
                        placeholder="Height e.g. 6'3&quot;"
                        className={`rounded px-2 py-1 text-xs border ${
                          isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-zinc-300 text-zinc-900'
                        }`}
                      />
                      <input
                        type="text"
                        value={mArchetype}
                        onChange={(e) => setMArchetype(e.target.value)}
                        placeholder="Archetype..."
                        className={`rounded px-2 py-1 text-xs border ${
                          isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-zinc-300 text-zinc-900'
                        }`}
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={mQuote}
                      onChange={(e) => setMQuote(e.target.value)}
                      placeholder="Signature dialogue quote..."
                      className={`w-full rounded px-2.5 py-1.5 text-xs border resize-none ${
                        isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-zinc-300 text-zinc-900'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Blurb & Manuscript */}
              <div className={`p-5 rounded-xl border space-y-4 ${
                isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'
              }`}>
                <h4 className="text-xs uppercase font-mono tracking-wider text-amber-500 font-bold">
                  Step 4: Synopsis & Chapter 1 Story Manuscript
                </h4>
                <div>
                  <label className={`block text-xs mb-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Teaser Hook Line</label>
                  <input
                    type="text"
                    value={blurbTeaser}
                    onChange={(e) => setBlurbTeaser(e.target.value)}
                    placeholder="e.g. They were sworn enemies. Now they share a blood contract."
                    className={`w-full rounded-lg px-3 py-2 text-xs border ${
                      isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs mb-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Full Back-Cover Synopsis</label>
                  <textarea
                    rows={3}
                    value={synopsis}
                    onChange={(e) => setSynopsis(e.target.value)}
                    placeholder="Describe the underworld conflict, family rivalry, and romance arc..."
                    className={`w-full rounded-lg px-3 py-2 text-xs border ${
                      isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs mb-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Chapter 1 Manuscript (Opening Scene)
                  </label>
                  <textarea
                    rows={6}
                    value={chapter1Text}
                    onChange={(e) => setChapter1Text(e.target.value)}
                    placeholder="Write the opening paragraphs of your story..."
                    className={`w-full rounded-lg px-3 py-2 text-xs border font-serif leading-relaxed ${
                      isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                    }`}
                  />
                </div>
              </div>

              {/* Publish Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-zinc-950 font-bold font-sans shadow-xl shadow-amber-500/25 transition-all text-sm flex items-center justify-center gap-2"
              >
                <Feather className="w-4 h-4" />
                <span>Publish Novel into Grand Library</span>
              </button>
            </form>
          </div>

          {/* Live 3D Cover Preview Column */}
          <div className="flex flex-col items-center">
            <div className={`sticky top-20 p-5 rounded-2xl border flex flex-col items-center text-center shadow-2xl w-full ${
              isDark ? 'bg-zinc-950 border-amber-500/30' : 'bg-white border-zinc-300'
            }`}>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 font-bold mb-3">
                Live 3D Cover Preview
              </span>
              <BookCover book={previewBook} size="hero" />
              <p className={`text-[11px] mt-4 max-w-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Click the book cover or use the Flip button to preview both the front and back jacket in real-time.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
