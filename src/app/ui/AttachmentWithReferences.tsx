import './AttachmentWithReferences.css';

import { Fragment, memo, useMemo, type PropsWithChildren, useCallback, useState } from 'react';

import getLinksFromMarkdown from '../utils/getLinksFromMarkdown';
import References from './References';
import CitationWindow from './CitationWindow';

import { isClaim, type Claim as SchemaOrgClaim } from '../types/SchemaOrg/Claim';
import { isEntity, type Entity as SchemaOrgEntity } from '../types/SchemaOrg/Entity';

import type { ItemTypeOfArray } from '../types/ItemTypeOfArray';
import type { PropsOf } from '../types/PropsOf';
import type { WebChatActivity } from 'botframework-webchat-core';

type WebChatEntity = ItemTypeOfArray<Exclude<WebChatActivity['entities'], undefined>>;

type Props = PropsWithChildren<{
  activity: WebChatActivity & { type: 'message' };
}>;

export default memo(function AttachmentWithReferences({ activity, children }: Props) {
  const entities = (activity.entities || []) as Array<SchemaOrgEntity | WebChatEntity>;
  const { text } = activity;
  const [displayedCitationId, setDisplayedCitationId] = useState<string | null>(null);

  if (activity.textFormat && activity.textFormat !== 'markdown') {
    return children;
  }

  const claimMap = useMemo<Map<string, SchemaOrgClaim>>(
    () =>
      entities.reduce<Map<string, SchemaOrgClaim>>(
        (citationMap, entity) =>
          isEntity(entity) && isClaim(entity) && entity['@id'] ? citationMap.set(entity['@id'], entity) : citationMap,
        new Map()
      ),
    [entities]
  );

  const references = useMemo(() => Object.freeze(text ? Array.from(getLinksFromMarkdown(text, claimMap)) : []), [text]);

  const handleCitationClick = useCallback<Exclude<PropsOf<typeof References>['onCitationClick'], undefined>>(
    reference => {
      setDisplayedCitationId(reference.id);
    },
    [references]
  );

  return (
    <Fragment>
      {children}
      {references.length && (
        <details open className="ref-list">
          <summary className="ref-list__summary">{references.length} references</summary>
          <References onCitationClick={handleCitationClick} references={references} />
        </details>
      )}
      {displayedCitationId !== null && (
        <CitationWindow
          text={'text'}
          onClose={() => {
            console.log('>> clicked close');
            setDisplayedCitationId(null);
          }}
        />
      )}
    </Fragment>
  );
});
