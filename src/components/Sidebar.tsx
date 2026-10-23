import type { Article } from '../types';

interface ArticleItemProps {
  article: Article;
  selected: boolean;
  onSelect: (id: string) => void;
  onDelete?: (id: string) => void;
}

const ArticleItem = ({ article, selected, onSelect, onDelete }: ArticleItemProps) => {
  const selectedClasses =
    'border-purple-500/70 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.3)]';
  const idleClasses = 'border-transparent hover:border-purple-500/30 hover:bg-white/5';
  const titleClasses = article.isEasterEgg ? 'text-pink-400 animate-pulse' : 'text-purple-50';

  return (
    <li
      className={`flex min-w-0 items-center gap-2 rounded-lg border px-3 py-2 transition ${
        selected ? selectedClasses : idleClasses
      }`}
    >
      {article.language && (
        <span className="shrink-0 rounded-lg border border-purple-500/30 bg-black/40 px-1.5 py-0.5 font-orbitron text-[9px] font-bold uppercase tracking-widest text-fuchsia-400 shadow-[0_0_8px_rgba(217,70,239,0.4)]">
          {article.language}
        </span>
      )}
      <button
        type="button"
        onClick={() => onSelect(article.id)}
        aria-current={selected ? 'true' : undefined}
        className={`min-w-0 flex-1 truncate py-1 text-left font-body text-sm font-medium ${titleClasses}`}
      >
        {article.title}
      </button>
      {onDelete && (
        <button
          type="button"
          onClick={() => onDelete(article.id)}
          aria-label={`Delete ${article.title}`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded text-lg leading-none text-purple-300/40 transition hover:text-pink-500"
        >
          ×
        </button>
      )}
    </li>
  );
};

interface SidebarProps {
  presets: Article[];
  uploads: Article[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

const Sidebar = ({ presets, uploads, selectedId, onSelect, onDelete }: SidebarProps) => (
  <nav className="flex flex-col gap-5 rounded-xl border border-purple-500/30 bg-black/40 p-4 shadow-neon backdrop-blur-md">
    <section>
      <h3 className="mb-2 text-lg text-purple-400">Presets</h3>
      <ul className="flex flex-col gap-1">
        {presets.map((article) => (
          <ArticleItem
            key={article.id}
            article={article}
            selected={article.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </section>

    <section>
      <h3 className="mb-2 text-lg text-fuchsia-400">Your files</h3>
      {uploads.length === 0 ? (
        <p className="px-3 text-sm text-purple-300/50">No files uploaded yet.</p>
      ) : (
        <ul className="flex flex-col gap-1">
          {uploads.map((article) => (
            <ArticleItem
              key={article.id}
              article={article}
              selected={article.id === selectedId}
              onSelect={onSelect}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </section>
  </nav>
);

export default Sidebar;
