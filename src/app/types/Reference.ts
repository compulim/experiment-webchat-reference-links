type BaseReference = {
  /** ID of the reference. */
  id: string;

  /** Text referenced in the original content, usually `"[1]"`. */
  textReferenced: string;

  /** Title of the reference. */
  title?: string;
};

export type CitationReference = BaseReference & {
  /** Citation text */
  citationText: string;
};

export type URLReference = BaseReference & {
  /** URL of the reference. */
  url: string;
};

export type Reference = CitationReference | URLReference;
