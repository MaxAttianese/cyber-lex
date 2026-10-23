import { useRef, useState, type ChangeEvent, type DragEvent, type KeyboardEvent } from 'react';
import { parseFile, SUPPORTED_EXTENSIONS } from '../utils/fileParsers';
import type { Article } from '../types';

interface FileUploaderProps {
  /** Returns `false` if saving to LocalStorage did not succeed. */
  onArticleReady: (article: Article) => boolean;
}

const ACCEPT = SUPPORTED_EXTENSIONS.map((extension) => `.${extension}`).join(',');

const FileUploader = ({ onArticleReady }: FileUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;

    setIsLoading(true);
    setError(null);
    try {
      const article = await parseFile(file);
      if (!onArticleReady(article)) {
        throw new Error('LocalStorage quota exceeded: delete some files and try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error while uploading.');
    } finally {
      setIsLoading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const openPicker = () => inputRef.current?.click();

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    void handleFile(event.dataTransfer.files[0]);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPicker();
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    void handleFile(event.target.files?.[0]);
  };

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-purple-500/30 bg-black/40 p-4 shadow-neon backdrop-blur-md">
      <h3 className="text-lg text-purple-400">Upload an article</h3>

      <div
        role="button"
        tabIndex={0}
        onClick={openPicker}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-8 text-center transition ${
          isDragging
            ? 'border-fuchsia-500 bg-fuchsia-500/10 shadow-[0_0_20px_rgba(217,70,239,0.35)]'
            : 'border-purple-500/40 hover:border-pink-500/70 hover:bg-white/5'
        }`}
      >
        <span className="font-display text-base font-semibold uppercase tracking-wide text-purple-50">
          {isLoading ? 'Processing...' : 'Drag your file here'}
        </span>
        <span className="font-body text-xs text-purple-200/60">
          or click to choose · {SUPPORTED_EXTENSIONS.map((e) => `.${e}`).join(' ')}
        </span>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          onChange={handleInputChange}
          onClick={(event) => event.stopPropagation()}
          className="hidden"
        />
      </div>

      <p className="rounded-lg border border-pink-500/40 bg-pink-500/10 p-3 font-body text-xs leading-relaxed text-pink-200">
        This is a trial version: your files are not sent to any server, but saved locally in your
        browser (LocalStorage).
      </p>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-500/50 bg-red-500/10 p-3 font-body text-xs text-red-300"
        >
          {error}
        </p>
      )}
    </section>
  );
};

export default FileUploader;
