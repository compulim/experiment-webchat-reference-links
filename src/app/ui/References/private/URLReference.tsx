import './URLReference.css';

import { memo } from 'react';

import { type Claim } from '../../../types/SchemaOrg/Claim';

type Props = {
  claim: Claim;
};

export default memo(({ claim }: Props) => {
  return (
    <a className="pva__references__url-reference" href={claim.url} rel="noopener noreferrer" target="_blank">
      {claim.name}
    </a>
  );
});
