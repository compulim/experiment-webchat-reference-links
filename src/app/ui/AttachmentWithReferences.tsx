import './AttachmentWithReferences.css';

import { Fragment, memo, type MouseEventHandler, type PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { hooks } from 'botframework-webchat';
import classNames from 'classnames';

import getLinksFromMarkdown from '../utils/getLinksFromMarkdown';
import References from './References';
import renderMarkdownAsHTML from './private/renderMarkdownAsHTML';
import CitationWindow from './CitationWindow';

import { isClaim, type Claim as SchemaOrgClaim } from '../types/SchemaOrg/Claim';
import { isEntity, type Entity as SchemaOrgEntity } from '../types/SchemaOrg/Entity';

import type { ItemTypeOfArray } from '../types/ItemTypeOfArray';
import type { PropsOf } from '../types/PropsOf';
import type { WebChatActivity } from 'botframework-webchat-core';

const { useLocalizer, useStyleOptions, useStyleSet } = hooks;

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

  const handleReferencesCitationClick = useCallback<Exclude<PropsOf<typeof References>['onCitationClick'], undefined>>(
    reference => {
      setDisplayedCitationId(reference.id);
    },
    [references]
  );

  // TODO: Unfork the code.

  const [{ textContent: textContentStyleSet }] = useStyleSet();
  const [styleOptions] = useStyleOptions();
  const localize = useLocalizer();
  // const renderMarkdownAsHTML = useRenderMarkdownAsHTML();

  const externalLinkAlt = localize('MARKDOWN_EXTERNAL_LINK_ALT');

  function isButtonElement(button: HTMLElement): button is HTMLButtonElement {
    return button.matches('button');
  }

  const handleMarkdownCitationClick = useCallback<MouseEventHandler<HTMLDivElement>>(({ target }) => {
    const targetElement = target as HTMLElement;
    const buttonTarget: HTMLButtonElement | undefined = isButtonElement(targetElement)
      ? targetElement
      : (targetElement.closest('button') as HTMLButtonElement | undefined);

    if (!buttonTarget) {
      return;
    }

    const href = buttonTarget.dataset.webchatCitationHref;

    if (!href) {
      return;
    }

    let url: URL;

    try {
      url = new URL(href);
    } catch (error) {
      console.error(error);
      return;
    }

    if (url.protocol !== 'x-pva-citation:') {
      return;
    }

    const claim = claimMap.get(href);

    claim && alert(JSON.stringify(claim, null, 2));
  }, []);

  return (
    <Fragment>
      <div
        className={classNames('markdown', textContentStyleSet + '')}
        dangerouslySetInnerHTML={{
          __html: renderMarkdownAsHTML(activity.text || '', styleOptions, { externalLinkAlt }, md => md)
        }}
        onClick={handleMarkdownCitationClick}
      />
      {references.length && (
        <details open className="ref-list">
          <summary className="ref-list__summary">{references.length} references</summary>
          <References onCitationClick={handleReferencesCitationClick} references={references} />
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
