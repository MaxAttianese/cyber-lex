export interface Article {
  id: string;
  title: string;
  /** HTML already sanitized by the parsers (or by the default data). */
  content: string;
  /** ISO 8601 */
  date: string;
  isEasterEgg?: boolean;
}
