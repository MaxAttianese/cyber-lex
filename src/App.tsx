import { useState } from 'react';
import logo from './assets/logo.jpeg';
import ArticleReader from './components/ArticleReader';
import FileUploader from './components/FileUploader';
import ParticleBackground from './components/ParticleBackground';
import Sidebar from './components/Sidebar';
import { defaultArticles } from './data/defaultArticles';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Article } from './types';

const UPLOADS_STORAGE_KEY = 'cyberlex:uploaded-articles';
const FIRST_PRESET_ID = defaultArticles[0]?.id ?? null;

const App = () => {
  const [uploads, saveUploads] = useLocalStorage<Article[]>(UPLOADS_STORAGE_KEY, []);
  const [selectedId, setSelectedId] = useState<string | null>(FIRST_PRESET_ID);

  const selectedArticle =
    [...defaultArticles, ...uploads].find((article) => article.id === selectedId) ?? null;

  const handleNewArticle = (article: Article): boolean => {
    const saved = saveUploads([article, ...uploads]);
    if (saved) setSelectedId(article.id);
    return saved;
  };

  const handleDelete = (id: string) => {
    const saved = saveUploads(uploads.filter((article) => article.id !== id));
    if (saved && selectedId === id) setSelectedId(FIRST_PRESET_ID);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#07030f] text-purple-100">
      <ParticleBackground />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:px-8 md:py-10">
        <header className="flex w-full items-center justify-between gap-4 rounded-xl border border-purple-500/30 bg-black/40 p-5 shadow-neon backdrop-blur-md">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="CyberLex logo"
              className="h-10 w-10 animate-pulse rounded-lg object-contain shadow-neon"
            />
            <h1 className="font-orbitron bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 bg-clip-text text-3xl font-bold uppercase tracking-widest text-transparent md:text-4xl">
              CYBERLEX
            </h1>
          </div>

          <span className="rounded-full border border-purple-500/40 bg-purple-500/10 px-3 py-1 font-body text-xs uppercase tracking-widest text-purple-200">
            v0.1 · beta
          </span>
        </header>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="flex flex-col gap-6">
            <FileUploader onArticleReady={handleNewArticle} />
            <Sidebar
              presets={defaultArticles}
              uploads={uploads}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onDelete={handleDelete}
            />
          </aside>

          <ArticleReader article={selectedArticle} />
        </div>
      </div>
    </div>
  );
};

export default App;
