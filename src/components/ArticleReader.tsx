import type { Article } from '../types';

interface ArticleReaderProps {
  article: Article | null;
}

const formatDate = (isoDate: string): string =>
  new Date(isoDate).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

const ArticleReader = ({ article }: ArticleReaderProps) => {
  if (!article) {
    return (
      <section className="flex min-h-[320px] items-center justify-center rounded-xl border border-purple-500/30 bg-black/40 p-8 text-center backdrop-blur-md">
        <p className="font-body text-purple-200/60">
          Select an article from the list to start reading.
        </p>
      </section>
    );
  }

  return (
    <article className="min-w-0 rounded-xl border border-purple-500/30 bg-black/40 p-5 shadow-neon backdrop-blur-md sm:p-6 md:p-10">
      <header className="mb-6 border-b border-purple-500/30 pb-4">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-fuchsia-400">
          {formatDate(article.date)}
        </p>
        <h1
          className={`mt-2 break-words text-3xl font-bold md:text-4xl ${
            article.isEasterEgg ? 'text-pink-400' : 'text-white'
          }`}
        >
          {article.title}
        </h1>
        {article.language && (
          <span className="mt-3 inline-block w-fit rounded-lg border border-purple-500/30 bg-black/40 px-3 py-1 font-orbitron text-[10px] font-bold uppercase tracking-widest text-fuchsia-400 shadow-[0_0_10px_rgba(217,70,239,0.5)] backdrop-blur-md">
            {article.language}
          </span>
        )}
      </header>

      <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }} />
    </article>
  );
};

export default ArticleReader;
