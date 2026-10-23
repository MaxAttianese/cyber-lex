import { useState } from 'react';
import ArticleReader from './components/ArticleReader';
import FileUploader from './components/FileUploader';
import Header from './components/Header';
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
        <Header />

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
