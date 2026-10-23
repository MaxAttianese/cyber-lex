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
    <article className="rounded-xl border border-purple-500/30 bg-black/40 p-6 shadow-neon backdrop-blur-md md:p-10">
      <header className="mb-6 border-b border-purple-500/30 pb-4">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-fuchsia-400">
          {formatDate(article.date)}
        </p>
        <h1
          className={`mt-2 text-3xl font-bold md:text-4xl ${
            article.isEasterEgg ? 'text-pink-400' : 'text-white'
          }`}
        >
          {article.title}
        </h1>
      </header>

      <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }} />
    </article>
  );
};

export default ArticleReader;
