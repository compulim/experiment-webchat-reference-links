import './AttachmentWithReferences.css';

import { Fragment, memo, useMemo, type PropsWithChildren, useCallback } from 'react';

import getLinksFromMarkdown from '../utils/getLinksFromMarkdown';
import References from './References';

import { type Claim as SchemaOrgClaim } from '../types/SchemaOrg/Claim';
import { type Entity as SchemaOrgEntity } from '../types/SchemaOrg/Entity';

import type { ItemTypeOfArray } from '../types/ItemTypeOfArray';
import type { PropsOf } from '../types/PropsOf';
import type { WebChatActivity } from 'botframework-webchat-core';

type WebChatEntity = ItemTypeOfArray<Exclude<WebChatActivity['entities'], undefined>>;

type Props = PropsWithChildren<{
  activity: WebChatActivity & { type: 'message' };
}>;

function isClaim(entity: undefined | WebChatEntity | SchemaOrgEntity): entity is SchemaOrgClaim {
  return entity?.type === 'https://schema.org/Claim';
}

export default memo(function AttachmentWithReferences({ activity, children }: Props) {
  const entities = activity.entities as Array<SchemaOrgEntity | WebChatEntity> | undefined;
  const { text } = activity;

  if (activity.textFormat && activity.textFormat !== 'markdown') {
    return children;
  }

  const claimMap = useMemo<Map<string, SchemaOrgClaim>>(
    () =>
      (entities || []).reduce<Map<string, SchemaOrgClaim>>(
        (citationMap, entity) => (isClaim(entity) ? citationMap.set(entity['@id'], entity) : citationMap),
        new Map()
      ),
    [entities]
  );

  const references = useMemo(() => Object.freeze(text ? Array.from(getLinksFromMarkdown(text, claimMap)) : []), [text]);

  const handleCitationClick = useCallback<Exclude<PropsOf<typeof References>['onCitationClick'], undefined>>(
    reference => {
      alert(reference.citationText);
    },
    [references]
  );

  return (
    <Fragment>
      {children}
      {references.length && (
        <details className="ref-list">
          <summary className="ref-list__summary">{references.length} references.</summary>
          <References onCitationClick={handleCitationClick} references={references} />
        </details>
      )}
    </Fragment>
  );
});
