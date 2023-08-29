import './References.css';

import { memo } from 'react';
import { CitationReference, Reference, isURLReference } from '../types/Reference';

type Props = {
  onCitationClick: (citation: CitationReference) => void;
  references: ReadonlyArray<Reference>;
};

export default memo(({ references, onCitationClick }: Props) => {
  return (
    <ul>
      {references.map(reference => (
        <>
          <li className="outerBox">
            <span className="innerBox">{reference.id}</span>
            <span className="link">
              {isURLReference(reference) ? (
                <a target="_blank" rel="noopener noreferrer" href={reference.url}>
                  {reference.title}
                </a>
              ) : (
                <button
                  onClick={() => {
                    onCitationClick(reference);
                  }}
                >
                  {reference.title}
                </button>
              )}
            </span>
          </li>
        </>
      ))}
    </ul>
  );
});
