export type Role = 'admin' | 'assistant' | 'moderator' | 'author' | 'reader';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  penName?: string;
  allegiance: string;
  canAccessFullStory: boolean;
  createdAt: string;
}

export interface LeadProfile {
  name: string;
  age: number;
  height: string;
  archetype: string;
  specs: string[];
  signatureQuote: string;
  avatarSeed?: string;
}

export interface Chapter {
  id: number;
  season: 1 | 2 | 3;
  title: string;
  subtitle?: string;
  wordCount: number;
  readingTimeMin: number;
  pov: string;
  location: string;
  paragraphs: string[];
}

export type SiteTheme = 'black' | 'white';

export type LanguageCode = 'en' | 'pt' | 'ru' | 'es' | 'fr' | 'it' | 'de' | 'ar' | 'ja' | 'zh';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  flag: string;
  nativeName: string;
}

export interface CollaborationRequest {
  id: string;
  bookId: number;
  bookTitle: string;
  requesterId?: string;
  requesterName: string;
  requesterPenName: string;
  requesterEmail: string;
  targetAuthor: string;
  role: 'co-author' | 'lore-consultant' | 'dialogue-writer' | 'editor';
  pitch: string;
  proposedChapterTitle?: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface Book {
  id: number;
  title: string;
  subtitle: string;
  author: string;
  penName?: string;
  coAuthors?: string[];
  collaborators?: string[];
  rating: number;
  reviewsCount: number;
  pages: number;
  spiceLevel: 1 | 2 | 3 | 4 | 5;
  category: string;
  series: string;
  tropes: string[];
  tags: string[];
  coverGradient: string;
  coverCrest: string;
  coverImage?: string;
  backCoverImage?: string;
  femaleLead: LeadProfile;
  maleLead: LeadProfile;
  synopsis: string;
  blurbTeaser: string;
  isbn: string;
  chapters?: Chapter[];
  isAuthorOriginal?: boolean;
}

export interface BanterQuote {
  id: number;
  speaker: string;
  listener: string;
  season: 1 | 2 | 3;
  chapter: number;
  quote: string;
  reply: string;
  intensity: 'Low Spark' | 'High Voltage' | 'Lethal Spite' | 'Obsessive Hunger';
}

export type ReadingTheme = 'obsidian' | 'sapphire' | 'crimson' | 'parchment';
export type SoundscapeType = 'none' | 'rain' | 'fireplace' | 'drone';

export interface Friend {
  id: string;
  name: string;
  email?: string;
  avatarSeed: string;
  tagline: string;
  allegiance: string;
  status: 'online' | 'away' | 'offline';
  isCharacter?: boolean;
  characterKey?: 'slay' | 'egor' | 'yasin' | 'nikolai' | 'valentina' | 'custom';
  unreadCount?: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  isSelf: boolean;
}
