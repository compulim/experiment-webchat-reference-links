import './References.css';

import { memo } from 'react';

import CitationReference from './private/CitationReference';
import Item from './private/Item';
import URLReference from './private/URLReference';

import { type Claim, hasText } from '../../types/SchemaOrg/Claim';

type Props = {
  claims: ReadonlyArray<Claim>;
  onCitationClick: (citation: Claim & { text: string }) => void;
};

export default memo(({ claims, onCitationClick }: Props) => {
  return (
    <ul className="pva__references">
      {claims.map(claim => (
        <Item badge={claim.alternateName}>
          {hasText(claim) ? (
            <CitationReference claim={claim} onClick={onCitationClick} />
          ) : (
            <URLReference claim={claim} />
          )}
        </Item>
      ))}
    </ul>
  );
});
