import { memo, type MouseEventHandler, useCallback } from 'react';

import { type Claim } from '../../../../../types/SchemaOrg/Claim';
import stripMarkdown from '../../stripMarkdown';

// Citation is claim with text.
type CitationClaim = Claim & { text: string };

type Props = {
  claim: CitationClaim;
  onClick: (citation: CitationClaim) => void;
};

const CitationLinkDefinition = memo(({ onClick, claim }: Props) => {
  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    onClick(claim);
  }, [claim]);

  return (
    <button className="webchat__link-definitions__item-body--citation" onClick={handleClick} type="button">
      {claim.name ??
        stripMarkdown(claim.text)
          .replace(/\r\n/gu, ' ')
          .replace(/\s{2,}/gu, ' ')}
    </button>
  );
});

CitationLinkDefinition.displayName = 'CitationLinkDefinition';

export default CitationLinkDefinition;
