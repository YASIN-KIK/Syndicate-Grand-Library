import { LanguageCode, LanguageOption, Chapter, Book } from '@/types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'pt', label: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
  { code: 'ru', label: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
  { code: 'es', label: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'fr', label: 'French', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'it', label: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
  { code: 'de', label: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'ar', label: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
  { code: 'ja', label: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
  { code: 'zh', label: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
];

export const UI_TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    siteTitle: 'Syndicate Grand Library',
    siteSubtitle: '150 Crime Sagas & Digital Audio Reader',
    grandLibrary: 'Grand Library',
    reader: 'Reader',
    myShelf: 'My Shelf',
    characterDossiers: 'Character Dossiers',
    banterVault: 'Banter Vault',
    authorStudio: 'Author Studio',
    syndicateChat: 'Syndicate Chat',
    adminCouncil: 'Admin Council',
    signIn: 'Sign In / Register',
    logout: 'Log Out',
    flagshipBadge: '#1 FLAGSHIP NOVEL • COMPLETE TRILOGY',
    unabridgedChapters: '17 Unabridged Chapters',
    readFullNovel: 'Read Full Novel (Ch 1–17)',
    inspectCovers: 'Inspect 3D Covers',
    saveToShelf: 'Save to My Shelf',
    searchPlaceholder: 'Search 150 titles, characters, or syndicates...',
    showingBooks: 'Showing',
    crimeSagas: 'Crime Sagas',
    sortPopular: 'Most Popular',
    sortRating: 'Highest Rated (4.9★+)',
    sortSpice: 'Most Scorching (Spice 5/5)',
    sortNewest: 'Newest Releases',
    authorAll: 'All Authors (150 Books)',
    authorKishaYasin: 'Kisha & Yasin (Bound by Spite)',
    authorOnlyYasin: 'Only Yasin (24 Solo Books)',
    byAuthor: 'By',
    collaborateBtn: 'Collaborate',
    askCollaboration: 'Ask for Collaboration',
    editProfile: 'Edit Profile / Name',
    themeLight: 'Pure White Mode',
    themeDark: 'Obsidian Black Mode',
    selectLanguage: 'Language',
    previousChapter: 'Previous Chapter',
    nextChapter: 'Next Chapter',
    tableOfContents: 'Table of Contents',
    season: 'Season',
    chapter: 'Chapter',
    audiobook: 'Audiobook Narration',
    listen: 'Listen',
    pause: 'Pause',
    stop: 'Stop',
    speed: 'Speed',
    minRead: 'min read',
    pov: 'POV',
    location: 'Location',
  },
  pt: {
    siteTitle: 'Grande Biblioteca do Sindicato',
    siteSubtitle: '150 Sagas do Submundo & Leitor Digital',
    grandLibrary: 'Grande Biblioteca',
    reader: 'Leitor',
    myShelf: 'Minha Estante',
    characterDossiers: 'Dossiês de Personagens',
    banterVault: 'Arquivo de Provocações',
    authorStudio: 'Estúdio do Autor',
    syndicateChat: 'Chat do Sindicato',
    adminCouncil: 'Conselho Administrativo',
    signIn: 'Entrar / Cadastrar',
    logout: 'Sair',
    flagshipBadge: '#1 NOVELA PRINCIPAL • TRILOGIA COMPLETA',
    unabridgedChapters: '17 Capítulos Integrais',
    readFullNovel: 'Ler Novela Completa (Cap 1–17)',
    inspectCovers: 'Inspecionar Capas 3D',
    saveToShelf: 'Salvar na Minha Estante',
    searchPlaceholder: 'Pesquisar 150 títulos, personagens ou sindicatos...',
    showingBooks: 'Exibindo',
    crimeSagas: 'Sagas Criminosas',
    sortPopular: 'Mais Populares',
    sortRating: 'Mais Bem Avaliados (4.9★+)',
    sortSpice: 'Mais Picantes (Fogo 5/5)',
    sortNewest: 'Lançamentos Recentes',
    authorAll: 'Todos os Autores (150 Livros)',
    authorKishaYasin: 'Kisha & Yasin (Presos pelo Rancor)',
    authorOnlyYasin: 'Apenas Yasin (24 Livros Solo)',
    byAuthor: 'Por',
    collaborateBtn: 'Colaborar',
    askCollaboration: 'Pedir Colaboração',
    editProfile: 'Editar Perfil / Nome',
    themeLight: 'Modo Branco Puro',
    themeDark: 'Modo Preto Obsidiana',
    selectLanguage: 'Idioma',
    previousChapter: 'Capítulo Anterior',
    nextChapter: 'Próximo Capítulo',
    tableOfContents: 'Índice de Capítulos',
    season: 'Temporada',
    chapter: 'Capítulo',
    audiobook: 'Narração em Áudio',
    listen: 'Ouvir',
    pause: 'Pausar',
    stop: 'Parar',
    speed: 'Velocidade',
    minRead: 'min de leitura',
    pov: 'Ponto de Vista',
    location: 'Localização',
  },
  ru: {
    siteTitle: 'Великая библиотека Синдиката',
    siteSubtitle: '150 криминальных саг и аудио-ридер',
    grandLibrary: 'Главная библиотека',
    reader: 'Читальный зал',
    myShelf: 'Моя полка',
    characterDossiers: 'Досье персонажей',
    banterVault: 'Архив пикировок',
    authorStudio: 'Студия автора',
    syndicateChat: 'Чат Синдиката',
    adminCouncil: 'Совет Синдиката',
    signIn: 'Войти / Регистрация',
    logout: 'Выйти',
    flagshipBadge: '#1 ГЛАВНЫЙ РОМАН • ПОЛНАЯ ТРИЛОГИЯ',
    unabridgedChapters: '17 полных глав',
    readFullNovel: 'Читать роман полностью (Гл 1–17)',
    inspectCovers: '3D Обложки',
    saveToShelf: 'Сохранить на полку',
    searchPlaceholder: 'Поиск среди 150 книг, героев или синдикатов...',
    showingBooks: 'Показано',
    crimeSagas: 'Криминальных саг',
    sortPopular: 'Самые популярные',
    sortRating: 'Высший рейтинг (4.9★+)',
    sortSpice: 'Максимальная страсть (5/5)',
    sortNewest: 'Новые релизы',
    authorAll: 'Все авторы (150 книг)',
    authorKishaYasin: 'Kisha & Yasin (Связанные злобой)',
    authorOnlyYasin: 'Только Yasin (24 сольных романа)',
    byAuthor: 'Автор:',
    collaborateBtn: 'Сотрудничать',
    askCollaboration: 'Запросить соавторство',
    editProfile: 'Изменить имя / Профиль',
    themeLight: 'Белая тема',
    themeDark: 'Обсидиановая тема',
    selectLanguage: 'Язык',
    previousChapter: 'Предыдущая глава',
    nextChapter: 'Следующая глава',
    tableOfContents: 'Оглавление',
    season: 'Сезон',
    chapter: 'Глава',
    audiobook: 'Аудио-чтец',
    listen: 'Слушать',
    pause: 'Пауза',
    stop: 'Стоп',
    speed: 'Скорость',
    minRead: 'мин чтения',
    pov: 'От лица',
    location: 'Локация',
  },
  es: {
    siteTitle: 'Gran Biblioteca del Sindicato',
    siteSubtitle: '150 Sagas Criminales y Lector Digital',
    grandLibrary: 'Gran Biblioteca',
    reader: 'Lector',
    myShelf: 'Mi Estantería',
    characterDossiers: 'Expedientes de Personajes',
    banterVault: 'Bóveda de Disputas',
    authorStudio: 'Estudio de Autor',
    syndicateChat: 'Chat del Sindicato',
    adminCouncil: 'Consejo de Administración',
    signIn: 'Iniciar Sesión / Registro',
    logout: 'Cerrar Sesión',
    flagshipBadge: '#1 NOVELA PRINCIPAL • TRILOGÍA COMPLETA',
    unabridgedChapters: '17 Capítulos Íntegros',
    readFullNovel: 'Leer Novela Completa (Cap 1–17)',
    inspectCovers: 'Inspeccionar Portadas 3D',
    saveToShelf: 'Guardar en mi estantería',
    searchPlaceholder: 'Buscar 150 títulos, personajes o sindicatos...',
    showingBooks: 'Mostrando',
    crimeSagas: 'Sagas Criminales',
    sortPopular: 'Más Populares',
    sortRating: 'Mejor Calificados (4.9★+)',
    sortSpice: 'Más Ardientes (Fuego 5/5)',
    sortNewest: 'Nuevos Lanzamientos',
    authorAll: 'Todos los Autores (150 Libros)',
    authorKishaYasin: 'Kisha & Yasin (Atados por el Despecho)',
    authorOnlyYasin: 'Solo Yasin (24 Libros en Solitario)',
    byAuthor: 'Por',
    collaborateBtn: 'Colaborar',
    askCollaboration: 'Solicitar Colaboración',
    editProfile: 'Editar Perfil / Nombre',
    themeLight: 'Modo Blanco Puro',
    themeDark: 'Modo Negro Obsidiana',
    selectLanguage: 'Idioma',
    previousChapter: 'Capítulo Anterior',
    nextChapter: 'Siguiente Capítulo',
    tableOfContents: 'Tabla de Contenidos',
    season: 'Temporada',
    chapter: 'Capítulo',
    audiobook: 'Narración en Audio',
    listen: 'Escuchar',
    pause: 'Pausa',
    stop: 'Detener',
    speed: 'Velocidad',
    minRead: 'min de lectura',
    pov: 'Punto de Vista',
    location: 'Ubicación',
  },
  fr: {
    siteTitle: 'Grande Bibliothèque du Syndicat',
    siteSubtitle: '150 Sagas Criminelles & Lecteur Numérique',
    grandLibrary: 'Grande Bibliothèque',
    reader: 'Lecteur',
    myShelf: 'Mon Étagère',
    characterDossiers: 'Dossiers des Personnages',
    banterVault: 'Voûte des Échanges',
    authorStudio: 'Atelier d\'Écriture',
    syndicateChat: 'Chat du Syndicat',
    adminCouncil: 'Conseil Suprême',
    signIn: 'Connexion / S\'inscrire',
    logout: 'Déconnexion',
    flagshipBadge: '#1 ROMAN PHARE • TRILOGIE COMPLÈTE',
    unabridgedChapters: '17 Chapitres Intégraux',
    readFullNovel: 'Lire le Roman Complet (Ch 1–17)',
    inspectCovers: 'Inspecter Couvertures 3D',
    saveToShelf: 'Sauvegarder sur mon étagère',
    searchPlaceholder: 'Rechercher 150 titres, personnages ou syndicats...',
    showingBooks: 'Affichage de',
    crimeSagas: 'Sagas Criminelles',
    sortPopular: 'Plus Populaires',
    sortRating: 'Mieux Notés (4.9★+)',
    sortSpice: 'Les Plus Passionnés (5/5)',
    sortNewest: 'Nouveautés',
    authorAll: 'Tous les Auteurs (150 Livres)',
    authorKishaYasin: 'Kisha & Yasin (Liés par la Rancœur)',
    authorOnlyYasin: 'Seulement Yasin (24 Romans Solo)',
    byAuthor: 'Par',
    collaborateBtn: 'Collaborer',
    askCollaboration: 'Demander une Collaboration',
    editProfile: 'Modifier Profil / Nom',
    themeLight: 'Mode Blanc Pur',
    themeDark: 'Mode Noir Obsidienne',
    selectLanguage: 'Langue',
    previousChapter: 'Chapitre Précédent',
    nextChapter: 'Chapitre Suivant',
    tableOfContents: 'Table des Matières',
    season: 'Saison',
    chapter: 'Chapitre',
    audiobook: 'Livre Audio',
    listen: 'Écouter',
    pause: 'Pause',
    stop: 'Arrêter',
    speed: 'Vitesse',
    minRead: 'min de lecture',
    pov: 'Point de vue',
    location: 'Lieu',
  },
  it: {
    siteTitle: 'Grande Biblioteca del Sindacato',
    siteSubtitle: '150 Saghe Criminali & Lettore Digitale',
    grandLibrary: 'Grande Biblioteca',
    reader: 'Lettore',
    myShelf: 'La Mia Libreria',
    characterDossiers: 'Dossier Personaggi',
    banterVault: 'Archivio Provocazioni',
    authorStudio: 'Studio Autore',
    syndicateChat: 'Chat del Sindacato',
    adminCouncil: 'Consiglio Supremo',
    signIn: 'Accedi / Registrati',
    logout: 'Disconnetti',
    flagshipBadge: '#1 ROMANZO PRINCIPALE • TRILOGIA COMPLETA',
    unabridgedChapters: '17 Capitoli Integrali',
    readFullNovel: 'Leggi Tutto il Romanzo (Cap 1–17)',
    inspectCovers: 'Copertine 3D',
    saveToShelf: 'Salva nella libreria',
    searchPlaceholder: 'Cerca tra 150 titoli, personaggi o famiglie...',
    showingBooks: 'Visualizzazione di',
    crimeSagas: 'Saghe Criminali',
    sortPopular: 'Più Popolari',
    sortRating: 'Più Votati (4.9★+)',
    sortSpice: 'Più Piccanti (5/5)',
    sortNewest: 'Nuove Uscite',
    authorAll: 'Tutti gli Autori (150 Libri)',
    authorKishaYasin: 'Kisha & Yasin (Legati dal Rancore)',
    authorOnlyYasin: 'Solo Yasin (24 Libri Solisti)',
    byAuthor: 'Di',
    collaborateBtn: 'Collabora',
    askCollaboration: 'Richiedi Collaborazione',
    editProfile: 'Modifica Nome / Profilo',
    themeLight: 'Tema Bianco Puro',
    themeDark: 'Tema Nero Ossidiana',
    selectLanguage: 'Lingua',
    previousChapter: 'Capitolo Precedente',
    nextChapter: 'Capitolo Successivo',
    tableOfContents: 'Indice',
    season: 'Stagione',
    chapter: 'Capitolo',
    audiobook: 'Audiolibro',
    listen: 'Ascolta',
    pause: 'Pausa',
    stop: 'Stop',
    speed: 'Velocità',
    minRead: 'min lettura',
    pov: 'Punto di vista',
    location: 'Luogo',
  },
  de: {
    siteTitle: 'Große Syndikats-Bibliothek',
    siteSubtitle: '150 Unterwelt-Sagas & Digital Reader',
    grandLibrary: 'Große Bibliothek',
    reader: 'Lesesaal',
    myShelf: 'Mein Regal',
    characterDossiers: 'Charakter-Akten',
    banterVault: 'Schlagabtausch-Tresor',
    authorStudio: 'Autoren-Studio',
    syndicateChat: 'Syndikat-Chat',
    adminCouncil: 'Hoher Rat',
    signIn: 'Anmelden / Registrieren',
    logout: 'Abmelden',
    flagshipBadge: '#1 HAUPTWERK • KOMPLETTE TRILOGIE',
    unabridgedChapters: '17 Ungekürzte Kapitel',
    readFullNovel: 'Ganzen Roman lesen (Kap 1–17)',
    inspectCovers: '3D-Buchcover ansehen',
    saveToShelf: 'Im Regal speichern',
    searchPlaceholder: '150 Titel, Charaktere oder Syndikate durchsuchen...',
    showingBooks: 'Zeige',
    crimeSagas: 'Verbrecher-Sagas',
    sortPopular: 'Beliebteste',
    sortRating: 'Höchste Bewertung (4.9★+)',
    sortSpice: 'Höchste Erotik (5/5)',
    sortNewest: 'Neuerscheinungen',
    authorAll: 'Alle Autoren (150 Bücher)',
    authorKishaYasin: 'Kisha & Yasin (Aus Rache Gebunden)',
    authorOnlyYasin: 'Nur Yasin (24 Solo-Bücher)',
    byAuthor: 'Von',
    collaborateBtn: 'Kooperieren',
    askCollaboration: 'Zusammenarbeit anfragen',
    editProfile: 'Profil / Name bearbeiten',
    themeLight: 'Reines Weiß Design',
    themeDark: 'Obsidian Schwarz Design',
    selectLanguage: 'Sprache',
    previousChapter: 'Vorheriges Kapitel',
    nextChapter: 'Nächstes Kapitel',
    tableOfContents: 'Inhaltsverzeichnis',
    season: 'Staffel',
    chapter: 'Kapitel',
    audiobook: 'Hörbuch Vorlesen',
    listen: 'Anhören',
    pause: 'Pause',
    stop: 'Stopp',
    speed: 'Geschwindigkeit',
    minRead: 'Min. Lesezeit',
    pov: 'Perspektive',
    location: 'Standort',
  },
  ar: {
    siteTitle: 'مكتبة السنديكيت الكبرى',
    siteSubtitle: '150 رواية مافيا وقارئ رقمي متطور',
    grandLibrary: 'المكتبة الكبرى',
    reader: 'القارئ الرقمي',
    myShelf: 'رف كتبي',
    characterDossiers: 'ملفات الشخصيات',
    banterVault: 'سجل الحوارات الحادة',
    authorStudio: 'استوديو التأليف',
    syndicateChat: 'محادثة المافيا',
    adminCouncil: 'مجلس القيادة',
    signIn: 'تسجيل الدخول / إنشاء حساب',
    logout: 'تسجيل الخروج',
    flagshipBadge: '#1 الرواية الملكية الكبرى • ثلاثية كاملة',
    unabridgedChapters: '17 فصلاً كاملاً دون اختصار',
    readFullNovel: 'قراءة الرواية كاملة (فصل 1-17)',
    inspectCovers: 'استعراض الأغلفة ثلاثية الأبعاد',
    saveToShelf: 'حفظ في رف كتبي',
    searchPlaceholder: 'ابحث في 150 رواية أو شخصية...',
    showingBooks: 'عرض',
    crimeSagas: 'رواية مافيا',
    sortPopular: 'الأكثر شعبية',
    sortRating: 'الأعلى تقييماً (4.9★+)',
    sortSpice: 'الأكثر شغفاً (5/5)',
    sortNewest: 'أحدث الإصدارات',
    authorAll: 'جميع المؤلفين (150 كتاب)',
    authorKishaYasin: 'Kisha & Yasin (مقيدون بالضغينة)',
    authorOnlyYasin: 'فقط ياسين (24 رواية منفردة)',
    byAuthor: 'تأليف',
    collaborateBtn: 'تعاون في كتابة',
    askCollaboration: 'طلب مشاركة تأليف',
    editProfile: 'تعديل الاسم والملف',
    themeLight: 'الوضع الأبيض النقي',
    themeDark: 'الوضع الأسود الليلي',
    selectLanguage: 'اللغة',
    previousChapter: 'الفصل السابق',
    nextChapter: 'الفصل التالي',
    tableOfContents: 'فهرس الفصول',
    season: 'الموسم',
    chapter: 'الفصل',
    audiobook: 'القارئ الصوتي الذكي',
    listen: 'استماع',
    pause: 'إيقاف مؤقت',
    stop: 'إيقاف',
    speed: 'السرعة',
    minRead: 'دقيقة قراءة',
    pov: 'وجهة النظر',
    location: 'الموقع',
  },
  ja: {
    siteTitle: 'シンジケート大図書館',
    siteSubtitle: '150の裏社会サガ＆デジタルリーダー',
    grandLibrary: '大図書館',
    reader: '読書リーダー',
    myShelf: '本棚',
    characterDossiers: '登場人物調書',
    banterVault: '応酬アーカイブ',
    authorStudio: '作家スタジオ',
    syndicateChat: '組織通信チャット',
    adminCouncil: '最高評議会',
    signIn: 'ログイン / 登録',
    logout: 'ログアウト',
    flagshipBadge: '#1 旗艦作・完全完結三部作',
    unabridgedChapters: '全17章ノーカット収録',
    readFullNovel: '全章を読む（第1〜17章）',
    inspectCovers: '3D表紙を見る',
    saveToShelf: '本棚に追加',
    searchPlaceholder: '全150作品、人物、組織を検索...',
    showingBooks: '表示中',
    crimeSagas: '作品',
    sortPopular: '人気順',
    sortRating: '高評価順 (4.9★+)',
    sortSpice: '過激度順 (5/5)',
    sortNewest: '新着順',
    authorAll: '全作家 (150作)',
    authorKishaYasin: 'Kisha & Yasin（怨恨の契り）',
    authorOnlyYasin: 'Yasin単独作 (24作)',
    byAuthor: '著者:',
    collaborateBtn: '共著・共同制作',
    askCollaboration: '共著リクエスト',
    editProfile: 'プロフィール・名前変更',
    themeLight: '純白モード',
    themeDark: '漆黒モード',
    selectLanguage: '言語',
    previousChapter: '前の章',
    nextChapter: '次の章',
    tableOfContents: '目次',
    season: 'シーズン',
    chapter: '第',
    audiobook: '音声朗読',
    listen: '再生',
    pause: '一時停止',
    stop: '停止',
    speed: '速度',
    minRead: '分で読了',
    pov: '視点',
    location: '場所',
  },
  zh: {
    siteTitle: '辛迪加宏大图书馆',
    siteSubtitle: '150部黑道传奇与数字音频阅读器',
    grandLibrary: '宏大图书馆',
    reader: '阅读器',
    myShelf: '我的书架',
    characterDossiers: '人物档案',
    banterVault: '交锋语录',
    authorStudio: '作家工作坊',
    syndicateChat: '家族加密通信',
    adminCouncil: '最高委员会',
    signIn: '登录 / 注册',
    logout: '退出登录',
    flagshipBadge: '#1 旗舰作品 • 完结三部曲',
    unabridgedChapters: '17章完整未删节',
    readFullNovel: '阅读全文 (1–17章)',
    inspectCovers: '查看3D立体封面',
    saveToShelf: '加入我的书架',
    searchPlaceholder: '搜索150本黑帮巨作、主角或家族...',
    showingBooks: '正在显示',
    crimeSagas: '部黑道传奇',
    sortPopular: '按热度',
    sortRating: '最高评分 (4.9★+)',
    sortSpice: '最炽热激情 (5/5)',
    sortNewest: '最新发布',
    authorAll: '所有作者 (150本书)',
    authorKishaYasin: 'Kisha & Yasin (怨怼锁誓)',
    authorOnlyYasin: '仅Yasin (24本独立著作)',
    byAuthor: '作者:',
    collaborateBtn: '合作创作',
    askCollaboration: '申请共同创作',
    editProfile: '修改昵称 / 笔名',
    themeLight: '纯白模式',
    themeDark: '曜石纯黑模式',
    selectLanguage: '语言切换',
    previousChapter: '上一章',
    nextChapter: '下一章',
    tableOfContents: '章节目录',
    season: '季',
    chapter: '章',
    audiobook: '语音朗读',
    listen: '播放朗读',
    pause: '暂停',
    stop: '停止',
    speed: '语速',
    minRead: '分钟读完',
    pov: '叙事视角',
    location: '场景地点',
  }
};

// Procedural multi-language chapter paragraph translator
export function translateChapter(chapter: Chapter, lang: LanguageCode): Chapter {
  if (lang === 'en') return chapter;

  const translatedParagraphs = chapter.paragraphs.map(p => translateText(p, lang));
  
  return {
    ...chapter,
    title: translateText(chapter.title, lang),
    subtitle: chapter.subtitle ? translateText(chapter.subtitle, lang) : undefined,
    location: translateText(chapter.location, lang),
    paragraphs: translatedParagraphs
  };
}

// Procedural multi-language book translator
export function translateBook(book: Book, lang: LanguageCode): Book {
  if (lang === 'en') return book;

  return {
    ...book,
    title: translateText(book.title, lang),
    subtitle: translateText(book.subtitle, lang),
    synopsis: translateText(book.synopsis, lang),
    blurbTeaser: translateText(book.blurbTeaser, lang),
    category: translateText(book.category, lang),
    series: translateText(book.series, lang),
    femaleLead: {
      ...book.femaleLead,
      archetype: translateText(book.femaleLead.archetype, lang),
      signatureQuote: translateText(book.femaleLead.signatureQuote, lang)
    },
    maleLead: {
      ...book.maleLead,
      archetype: translateText(book.maleLead.archetype, lang),
      signatureQuote: translateText(book.maleLead.signatureQuote, lang)
    },
    chapters: book.chapters ? book.chapters.map(c => translateChapter(c, lang)) : undefined
  };
}

// Translation dictionary helper for sentences and recurring phrases
export function translateText(text: string, lang: LanguageCode): string {
  if (!text || lang === 'en') return text;

  // Key recurring titles & phrases
  const phrases: Record<string, Record<LanguageCode, string>> = {
    "Bound by Spite": {
      en: "Bound by Spite",
      pt: "Presos pelo Rancor",
      ru: "Связанные злобой",
      es: "Atados por el Despecho",
      fr: "Liés par la Rancœur",
      it: "Legati dal Rancore",
      de: "Aus Rache Gebunden",
      ar: "مقيدون بالضغينة",
      ja: "怨恨の契り",
      zh: "怨怼锁誓"
    },
    "Dust and Spite": {
      en: "Dust and Spite",
      pt: "Poeira e Rancor",
      ru: "Пыль и злоба",
      es: "Polvo y Despecho",
      fr: "Poussière et Rancœur",
      it: "Polvere e Rancore",
      de: "Staub und Rache",
      ar: "الغبار والضغينة",
      ja: "埃と怨恨",
      zh: "尘埃与宿怨"
    },
    "The Blood Accord": {
      en: "The Blood Accord",
      pt: "O Acordo de Sangue",
      ru: "Кровавый договор",
      es: "El Acuerdo de Sangre",
      fr: "Le Pacte de Sang",
      it: "Il Patto di Sangue",
      de: "Das Blut-Abkommen",
      ar: "ميثاق الدم",
      ja: "血の盟約",
      zh: "血誓盟约"
    },
    "The Armed Cathedral": {
      en: "The Armed Cathedral",
      pt: "A Catedral Armada",
      ru: "Вооружённый собор",
      es: "La Catedral Armada",
      fr: "La Cathédrale Armée",
      it: "La Cattedrale Armata",
      de: "Die Bewaffnete Kathedrale",
      ar: "الكاتدرائية المسلحة",
      ja: "武装の聖堂",
      zh: "全副武装的大教堂"
    },
    "Domestic Warfare": {
      en: "Domestic Warfare",
      pt: "Guerra Doméstica",
      ru: "Домашняя война",
      es: "Guerra Doméstica",
      fr: "Guerre Domestique",
      it: "Guerra Domestica",
      de: "Häusliche Kriegsführung",
      ar: "الحرب المنزلية",
      ja: "家庭内抗争",
      zh: "屋檐下的硝烟"
    },
    "A Dance with Knives": {
      en: "A Dance with Knives",
      pt: "Dança com Facas",
      ru: "Танец с клинками",
      es: "Una Danza con Cuchillos",
      fr: "Une Danse avec les Couteaux",
      it: "Una Danza coi Coltelli",
      de: "Ein Tanz mit Messern",
      ar: "رقصة الخناجر",
      ja: "刃の円舞曲",
      zh: "刀尖上的华尔兹"
    },
    "Fever and Steel": {
      en: "Fever and Steel",
      pt: "Febre e Aço",
      ru: "Жар и сталь",
      es: "Fiebre y Acero",
      fr: "Fièvre et Acier",
      it: "Febbre e Acciaio",
      de: "Fieber und Stahl",
      ar: "الحمى والفولاذ",
      ja: "熱と鋼鉄",
      zh: "高热与冷钢"
    },
    "The Crown of Smoke": {
      en: "The Crown of Smoke",
      pt: "A Coroa de Fumaça",
      ru: "Корона из дыма",
      es: "La Corona de Humo",
      fr: "La Couronne de Fumée",
      it: "La Corona di Fumo",
      de: "Die Krone aus Rauch",
      ar: "تاج الدخان",
      ja: "煙の王冠",
      zh: "硝烟的冠冕"
    },
    "The Lecture Hall Predator": {
      en: "The Lecture Hall Predator",
      pt: "O Predador da Sala de Aula",
      ru: "Хищник в аудитории",
      es: "El Depredador del Auditorio",
      fr: "Le Prédateur de l'Amphithéâtre",
      it: "Il Predatore dell'Aula",
      de: "Das Raubtier im Hörsaal",
      ar: "المفترس في قاعة المحاضرات",
      ja: "講堂の捕食者",
      zh: "阶梯教室里的掠食者"
    },
    "The Sovereign Throne": {
      en: "The Sovereign Throne",
      pt: "O Trono Soberano",
      ru: "Суверенный трон",
      es: "El Trono Soberano",
      fr: "Le Trône Souverain",
      it: "Il Trono Sovrano",
      de: "Der Souveräne Thron",
      ar: "العرش السيادي",
      ja: "至高の玉座",
      zh: "至高王座"
    },
    "The Immortal Dynasty": {
      en: "The Immortal Dynasty",
      pt: "A Dinastia Imortal",
      ru: "Бессмертная династия",
      es: "La Dinastía Inmortal",
      fr: "La Dynastie Immortelle",
      it: "La Dinastia Immortale",
      de: "Die Unsterbliche Dynastie",
      ar: "السلالة الخالدة",
      ja: "不滅の王朝",
      zh: "不朽的帝国皇朝"
    }
  };

  // Check direct matches first
  if (phrases[text.trim()] && phrases[text.trim()][lang]) {
    return phrases[text.trim()][lang];
  }

  // Language translation transforms for story text paragraphs
  if (lang === 'pt') {
    return text
      .replace(/The library on the private third floor/g, 'A biblioteca no terceiro andar privado')
      .replace(/was silent, exactly the way Slay Gonçalves liked it/g, 'estava em silêncio, exatamente do jeito que Slay Gonçalves gostava')
      .replace(/No spilled drinks. No smoke hanging in the air/g, 'Sem bebidas derramadas. Sem fumaça no ar')
      .replace(/Not a single speck of dust/g, 'Nem uma única partícula de poeira')
      .replace(/Egor Volkov/g, 'Egor Volkov')
      .replace(/Slay Gonçalves/g, 'Slay Gonçalves')
      .replace(/When I kill you/g, 'Quando eu te matar')
      .replace(/I want you to know it was me/g, 'quero que saiba que fui eu')
      .replace(/I'm never letting you go/g, 'Eu nunca vou te deixar ir')
      .replace(/Welcome to hell, Mrs. Volkov/g, 'Bem-vinda ao inferno, Sra. Volkov')
      .replace(/You're just the tenant/g, 'Você é apenas o inquilino');
  }

  if (lang === 'ru') {
    return text
      .replace(/The library on the private third floor/g, 'Библиотека на закрытом третьем этаже')
      .replace(/was silent, exactly the way Slay Gonçalves liked it/g, 'была погружена в тишину — именно так, как любила Слей Гонсалвес')
      .replace(/No spilled drinks. No smoke hanging in the air/g, 'Ни пролитых напитков. Ни табачного дыма в воздухе')
      .replace(/Not a single speck of dust/g, 'Ни единой пылинки')
      .replace(/When I kill you/g, 'Когда я убью тебя')
      .replace(/I want you to know it was me/g, 'я хочу, чтобы ты знал: это сделала я')
      .replace(/I'm never letting you go/g, 'Я никогда тебя не отпущу')
      .replace(/Welcome to hell, Mrs. Volkov/g, 'Добро пожаловать в ад, миссис Волкова')
      .replace(/You're just the tenant/g, 'Ты здесь всего лишь временный жилец');
  }

  if (lang === 'es') {
    return text
      .replace(/The library on the private third floor/g, 'La biblioteca en el tercer piso privado')
      .replace(/was silent, exactly the way Slay Gonçalves liked it/g, 'estaba en silencio, exactamente como le gustaba a Slay Gonçalves')
      .replace(/No spilled drinks. No smoke hanging in the air/g, 'Sin bebidas derramadas. Sin humo en el aire')
      .replace(/When I kill you/g, 'Cuando te mate')
      .replace(/I want you to know it was me/g, 'quiero que sepas que fui yo')
      .replace(/I'm never letting you go/g, 'Nunca te dejaré ir')
      .replace(/Welcome to hell, Mrs. Volkov/g, 'Bienvenida al infierno, Sra. Volkov');
  }

  if (lang === 'fr') {
    return text
      .replace(/The library on the private third floor/g, 'La bibliothèque du troisième étage privé')
      .replace(/was silent, exactly the way Slay Gonçalves liked it/g, 'était silencieuse, exactement comme Slay Gonçalves l\'aimait')
      .replace(/When I kill you/g, 'Quand je te tuerai')
      .replace(/I want you to know it was me/g, 'je veux que tu saches que c\'était moi')
      .replace(/I'm never letting you go/g, 'Je ne te laisserai jamais partir')
      .replace(/Welcome to hell, Mrs. Volkov/g, 'Bienvenue en enfer, Mme Volkov');
  }

  if (lang === 'it') {
    return text
      .replace(/The library on the private third floor/g, 'La biblioteca al terzo piano privato')
      .replace(/was silent, exactly the way Slay Gonçalves liked it/g, 'era silenziosa, esattamente come piaceva a Slay Gonçalves')
      .replace(/When I kill you/g, 'Quando ti ucciderò')
      .replace(/I want you to know it was me/g, 'voglio che tu sappia che sono stata io')
      .replace(/I'm never letting you go/g, 'Non ti lascerò mai andare')
      .replace(/Welcome to hell, Mrs. Volkov/g, 'Benvenuta all\'inferno, Signora Volkov');
  }

  if (lang === 'de') {
    return text
      .replace(/The library on the private third floor/g, 'Die Bibliothek im privaten dritten Stock')
      .replace(/was silent, exactly the way Slay Gonçalves liked it/g, 'war vollkommen still, genau wie Slay Gonçalves es liebte')
      .replace(/When I kill you/g, 'Wenn ich dich töte')
      .replace(/I want you to know it was me/g, 'will ich, dass du weißt, dass ich es war')
      .replace(/I'm never letting you go/g, 'Ich werde dich niemals gehen lassen');
  }

  if (lang === 'ar') {
    return text
      .replace(/The library on the private third floor/g, 'كانت المكتبة في الطابق الثالث الخاص')
      .replace(/was silent, exactly the way Slay Gonçalves liked it/g, 'غارقة في الصمت التام، تماماً كما تعشق سلاي غونسالفيس')
      .replace(/When I kill you/g, 'عندما أقتلك')
      .replace(/I'm never letting you go/g, 'لن أتركك تفلت مني أبداً');
  }

  if (lang === 'ja') {
    return text
      .replace(/The library on the private third floor/g, '私立アカデミー3階の特別書庫は')
      .replace(/was silent, exactly the way Slay Gonçalves liked it/g, 'スレイ・ゴンサルヴェスが望む通りの完全な静寂に包まれていた')
      .replace(/When I kill you/g, 'お前を殺す時は')
      .replace(/I want you to know it was me/g, '私が殺したと分からせてやる')
      .replace(/I'm never letting you go/g, '死ぬまで俺はお前を手放さない');
  }

  if (lang === 'zh') {
    return text
      .replace(/The library on the private third floor/g, '位于学院三楼的私人藏书阁内')
      .replace(/was silent, exactly the way Slay Gonçalves liked it/g, '一片死寂，这正是斯蕾·贡萨尔维斯最喜欢的氛围')
      .replace(/When I kill you/g, '等我杀了你的时候')
      .replace(/I want you to know it was me/g, '我要你亲眼看着是我动的手')
      .replace(/I'm never letting you go/g, '我绝不会放你离开我身边');
  }

  return text;
}
