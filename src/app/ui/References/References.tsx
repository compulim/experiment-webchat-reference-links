import './References.css';

import { memo } from 'react';

import CitationReference from './private/CitationReference';
import URLReference from './private/URLReference';

import { type Claim, hasText } from '../../types/SchemaOrg/Claim';

type Props = {
  claims: ReadonlyArray<Claim>;
  onCitationClick: (citation: Claim & { text: string }) => void;
};

export default memo(({ claims, onCitationClick }: Props) => {
  return (
    <ul>
      {claims.map(claim => {
        if (hasText(claim)) {
          return <CitationReference claim={claim} onClick={onCitationClick} />;
        }

        return <URLReference claim={claim} />;
      })}
    </ul>
  );
});
