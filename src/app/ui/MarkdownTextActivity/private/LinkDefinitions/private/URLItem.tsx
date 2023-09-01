import { memo } from 'react';

import { type Claim } from '../../../../../types/SchemaOrg/Claim';

type Props = {
  claim: Claim;
};

const URLLinkDefinition = memo(({ claim }: Props) => {
  return (
    <a className="webchat__link-definitions__item-body--url" href={claim.url} rel="noopener noreferrer" target="_blank">
      {claim.name}
    </a>
  );
});

URLLinkDefinition.displayName = 'URLLinkDefinition';

export default URLLinkDefinition;
