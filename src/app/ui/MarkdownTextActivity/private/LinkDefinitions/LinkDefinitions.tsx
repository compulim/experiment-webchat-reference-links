import './LinkDefinitions.css';

import { memo } from 'react';

import CitationItem from './private/CitationItem';
import Badge from './private/Badge';
import URLItem from './private/URLItem';

import { type Claim, hasText } from '../../../../types/SchemaOrg/Claim';

type Props = {
  claims: ReadonlyArray<Claim>;
  onCitationClick: (citation: Claim & { text: string }) => void;
};

const LinkDefinitions = memo(({ claims, onCitationClick }: Props) => {
  return (
    claims.length > 0 && (
      <details open className="webchat__link-definitions">
        <summary className="webchat__link-definitions__header">{claims.length} references</summary>
        <ul className="webchat__link-definitions__body">
          {claims.map(claim => (
            <li className="webchat__link-definitions__item">
              {claim.alternateName && <Badge value={claim.alternateName} />}
              {hasText(claim) ? <CitationItem claim={claim} onClick={onCitationClick} /> : <URLItem claim={claim} />}
            </li>
          ))}
        </ul>
      </details>
    )
  );
});

LinkDefinitions.displayName = 'LinkDefinitions';

export default LinkDefinitions;
