import './CitationReference.css';

import { memo, type MouseEventHandler, useCallback } from 'react';

import { type Claim } from '../../../types/SchemaOrg/Claim';

// Citation is claim with text.
type CitationClaim = Claim & { text: string };

type Props = {
  claim: CitationClaim;
  onClick: (citation: CitationClaim) => void;
};

export default memo(({ onClick, claim }: Props) => {
  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    onClick(claim);
  }, [claim]);

  return (
    <button className="pva__references__citation-reference__button" onClick={handleClick} type="button">
      {claim.name}
    </button>
  );
});
