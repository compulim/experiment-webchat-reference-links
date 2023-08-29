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

export function isCitationReference(ref: Reference): ref is CitationReference {
  return (ref as CitationReference).citationText !== undefined;
}
export function isURLReference(ref: Reference): ref is URLReference {
  return (ref as URLReference).url !== undefined;
}

export type Reference = CitationReference | URLReference;
