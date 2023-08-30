import { memo } from 'react';

import { type Claim } from '../../../types/SchemaOrg/Claim';

type Props = {
  claim: Claim;
};

export default memo(({ claim }: Props) => {
  return (
    <li className="outerBox">
      <span className="innerBox">{claim.alternateName}</span>
      <span className="link">
        <a href={claim.url} rel="noopener noreferrer" target="_blank">
          {claim.name}
        </a>
      </span>
    </li>
  );
});
