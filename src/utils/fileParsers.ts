import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import type { Article } from '../types';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export const SUPPORTED_EXTENSIONS = ['txt', 'md', 'docx', 'pdf'] as const;
export type SupportedExtension = (typeof SUPPORTED_EXTENSIONS)[number];

const MAX_SUBTITLE_LENGTH = 60;

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const stripExtension = (fileName: string): string => fileName.replace(/\.[^.]+$/, '');

const createId = (): string =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const buildArticle = (title: string, html: string): Article => ({
  id: createId(),
  title,
  content: html,
  date: new Date().toISOString(),
});

const isSubtitleLine = (lines: string[], index: number): boolean => {
  const line = lines[index];
  const isIsolated = (lines[index - 1] ?? '') === '' && (lines[index + 1] ?? '') === '';
  return isIsolated && line.length <= MAX_SUBTITLE_LENGTH && !/[.,;:!?]$/.test(line);
};

/**
 * Heuristic for plain text: a short line isolated between two blank lines
 * (without ending punctuation) becomes a subtitle; everything else is a paragraph.
 */
export const plainTextToHtml = (text: string): string => {
  const lines = text
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((line) => line.trim());

  const blocks: string[] = [];
  let paragraph: string[] = [];

  lines.forEach((line, index) => {
    if (line === '') {
      if (paragraph.length) {
        blocks.push(`<p>${escapeHtml(paragraph.join(' '))}</p>`);
        paragraph = [];
      }
      return;
    }

    if (isSubtitleLine(lines, index)) {
      blocks.push(`<h2>${escapeHtml(line)}</h2>`);
      return;
    }

    paragraph.push(line);
  });

  if (paragraph.length) {
    blocks.push(`<p>${escapeHtml(paragraph.join(' '))}</p>`);
  }

  return blocks.join('\n');
};

/** Inline Markdown applied to already-escaped text. */
const inlineMarkdown = (escaped: string): string =>
  escaped
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*(.+?)\*(?=[\s).,;:!?]|$)/g, '$1<em>$2</em>')
    .replace(/(^|[\s(])_(.+?)_(?=[\s).,;:!?]|$)/g, '$1<em>$2</em>')
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    );

type ListType = 'ul' | 'ol';

const flushParagraph = (paragraph: string[], html: string[]): string[] => {
  if (paragraph.length) {
    html.push(`<p>${inlineMarkdown(escapeHtml(paragraph.join(' ')))}</p>`);
  }
  return [];
};

const closeList = (listType: ListType | null, html: string[]): null => {
  if (listType) html.push(`</${listType}>`);
  return null;
};

/** Markdown subset: headings, lists, quotes, code, bold, italic, links. */
export const markdownToHtml = (markdown: string): string => {
  const html: string[] = [];
  let paragraph: string[] = [];
  let listType: ListType | null = null;
  let inCodeBlock = false;
  let codeLines: string[] = [];

  for (const rawLine of markdown.replace(/\r\n?/g, '\n').split('\n')) {
    const line = rawLine.trimEnd();

    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
        codeLines = [];
        inCodeBlock = false;
      } else {
        paragraph = flushParagraph(paragraph, html);
        listType = closeList(listType, html);
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(rawLine);
      continue;
    }

    if (line.trim() === '') {
      paragraph = flushParagraph(paragraph, html);
      listType = closeList(listType, html);
      continue;
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      paragraph = flushParagraph(paragraph, html);
      listType = closeList(listType, html);
      const level = heading[1].length;
      html.push(`<h${level}>${inlineMarkdown(escapeHtml(heading[2]))}</h${level}>`);
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      paragraph = flushParagraph(paragraph, html);
      listType = closeList(listType, html);
      html.push('<hr />');
      continue;
    }

    const unordered = /^\s*[-*+]\s+(.*)$/.exec(line);
    const ordered = /^\s*\d+\.\s+(.*)$/.exec(line);
    if (unordered || ordered) {
      paragraph = flushParagraph(paragraph, html);
      const nextType: ListType = unordered ? 'ul' : 'ol';
      if (listType !== nextType) {
        closeList(listType, html);
        html.push(`<${nextType}>`);
        listType = nextType;
      }
      const itemText = (unordered ?? ordered)?.[1] ?? '';
      html.push(`<li>${inlineMarkdown(escapeHtml(itemText))}</li>`);
      continue;
    }

    const quote = /^>\s?(.*)$/.exec(line);
    if (quote) {
      paragraph = flushParagraph(paragraph, html);
      listType = closeList(listType, html);
      html.push(`<blockquote>${inlineMarkdown(escapeHtml(quote[1]))}</blockquote>`);
      continue;
    }

    listType = closeList(listType, html);
    paragraph.push(line.trim());
  }

  if (inCodeBlock) {
    html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
  }
  flushParagraph(paragraph, html);
  closeList(listType, html);

  return html.join('\n');
};

const parseTxt = async (file: File): Promise<Article> => {
  const text = await file.text();
  return buildArticle(stripExtension(file.name), plainTextToHtml(text));
};

const parseMarkdown = async (file: File): Promise<Article> => {
  const markdown = await file.text();
  const title = /^#\s+(.+)$/m.exec(markdown)?.[1].trim() ?? stripExtension(file.name);
  return buildArticle(title, markdownToHtml(markdown));
};

const firstHeadingText = (html: string): string | undefined => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.querySelector('h1')?.textContent?.trim() || undefined;
};

const parseDocx = async (file: File): Promise<Article> => {
  const { value: html } = await mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() });
  if (!html.trim()) {
    throw new Error('The .docx file does not contain readable text.');
  }
  return buildArticle(firstHeadingText(html) ?? stripExtension(file.name), html);
};

const parsePdf = async (file: File): Promise<Article> => {
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(await file.arrayBuffer()) })
    .promise;

  const pages: string[] = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const { items } = await page.getTextContent();
    pages.push(
      items.map((item) => ('str' in item ? item.str + (item.hasEOL ? '\n' : '') : '')).join(''),
    );
  }
  await pdf.destroy();

  const text = pages.join('\n\n');
  if (!text.trim()) {
    throw new Error('No extractable text found in the PDF (it may be a scanned document).');
  }
  return buildArticle(stripExtension(file.name), plainTextToHtml(text));
};

const isSupportedExtension = (extension: string): extension is SupportedExtension =>
  (SUPPORTED_EXTENSIONS as readonly string[]).includes(extension);

/** Single entry point: picks the parser based on the file extension. */
export const parseFile = async (file: File): Promise<Article> => {
  const extension = file.name.split('.').pop()?.toLowerCase() ?? '';

  if (!isSupportedExtension(extension)) {
    throw new Error(`Unsupported format: .${extension}`);
  }

  switch (extension) {
    case 'txt':
      return parseTxt(file);
    case 'md':
      return parseMarkdown(file);
    case 'docx':
      return parseDocx(file);
    case 'pdf':
      return parsePdf(file);
  }
};
