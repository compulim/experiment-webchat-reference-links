import './References.css';

import { memo } from 'react';
import type { CitationReference, Reference } from '../types/Reference';

type Props = {
  onCitationClick?: (citation: CitationReference) => void;
  references: ReadonlyArray<Reference>;
};

export default memo(({ references }: Props) => {
  return (
    <ul>
      {references.map(reference => (
        <li className='outerBox'>
          <span className='innerBox'>{reference.id}</span>
          <span className='link'>
            {
              reference.url ? <a target="_blank" rel="noopener noreferrer" href={reference.url}>{reference.title}</a> : <button>{reference.title}</button>
            }
          </span>
        </li>
      ))}
    </ul>
  );
});
