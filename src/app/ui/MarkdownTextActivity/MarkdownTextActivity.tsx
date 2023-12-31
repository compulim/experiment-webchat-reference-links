import './MarkdownTextActivity.css';

import { Fragment, memo, type MouseEventHandler, type PropsWithChildren, useCallback, useMemo } from 'react';
import { hooks } from 'botframework-webchat';
import classNames from 'classnames';

import { type Claim, isClaim, hasText } from '../../types/SchemaOrg/Claim';
import { type Thing, isThing } from '../../types/SchemaOrg/Thing';
import getClaimsFromMarkdown from './private/getClaimsFromMarkdown';
import getURLProtocol from './private/getURLProtocol';
import isHTMLButtonElement from './private/LinkDefinitions/private/isHTMLButtonElement';
import LinkDefinitions from '../MarkdownTextActivity/private/LinkDefinitions/LinkDefinitions';
import renderMarkdownAsHTML from './private/renderMarkdownAsHTML';
import useShowCitationWindow from '../CitationWindowProvider/useShowCitationWindow';

import { type ItemTypeOfArray } from '../../types/ItemTypeOfArray';
import { type PropsOf } from '../../types/PropsOf';
import { type WebChatActivity } from 'botframework-webchat-core';

const { useLocalizer, useStyleOptions, useStyleSet } = hooks;

type WebChatEntity = ItemTypeOfArray<Exclude<WebChatActivity['entities'], undefined>>;

type Props = PropsWithChildren<{
  activity: WebChatActivity &
    // tl;dr must be a Markdown message
    (| {
          type: 'message';
        }
      | {
          textFormat: 'markdown' | undefined;
          type: 'message';
        }
    );
}>;

type OnCitationClick = PropsOf<typeof LinkDefinitions>['onCitationClick'];

const MarkdownTextActivity = memo(({ activity }: Props) => {
  const { text } = activity;
  const entities = (activity.entities || []) as Array<Thing | WebChatEntity>;
  const showCitationWindow = useShowCitationWindow();

  // Citations are claim with text.
  // We are building a map for quick lookup.
  const citationMap = useMemo<Map<string, Claim & { text: string }>>(
    () =>
      entities.reduce<Map<string, Claim & { text: string }>>((citationMap, entity) => {
        if (isThing(entity) && isClaim(entity) && hasText(entity) && entity['@id']) {
          return citationMap.set(entity['@id'], entity);
        }

        return citationMap;
      }, new Map()),
    [entities]
  );

  // These are all the claims, including citation (claim with text) and links (claim without text but URL).
  const claims = useMemo(() => Object.freeze(text ? Array.from(getClaimsFromMarkdown(text, citationMap)) : []), [text]);

  // Handles all clicks on citation inside Markdown text.
  const handleMarkdownCitationClick = useCallback<MouseEventHandler<HTMLDivElement>>(({ target }) => {
    // Find out what <button> is being clicked.
    const targetElement = target as HTMLElement;
    const buttonElement: HTMLButtonElement | undefined = isHTMLButtonElement(targetElement)
      ? targetElement
      : (targetElement.closest('button') as HTMLButtonElement | undefined);

    if (!buttonElement) {
      return;
    }

    // <button data-webchat-citation-href="cite:1">1</button>
    const href = buttonElement.dataset.webchatCitationHref;

    if (!href || getURLProtocol(href) !== 'cite:') {
      return;
    }

    const claim = citationMap.get(href);

    if (claim && hasText(claim)) {
      showCitationWindow(claim);
    }
  }, []);

  // Handles all clicks on citation in the reference list.
  const handleReferencesCitationClick = useCallback<Exclude<OnCitationClick, undefined>>(
    claim => showCitationWindow(claim),
    [showCitationWindow]
  );

  // --- Separate out the section below. The following code are forked/adopted. ---
  // TODO: Unfork the code.

  const [{ textContent: textContentStyleSet }] = useStyleSet();
  const [styleOptions] = useStyleOptions();
  const localize = useLocalizer();

  const externalLinkAlt = localize('MARKDOWN_EXTERNAL_LINK_ALT');

  return (
    <Fragment>
      <div
        className={classNames('webchat__bot-markdown-text-activity', 'markdown', textContentStyleSet + '')}
        dangerouslySetInnerHTML={{
          __html: renderMarkdownAsHTML(activity.text || '', styleOptions, { externalLinkAlt })
        }}
        onClick={handleMarkdownCitationClick}
      />
      <LinkDefinitions onCitationClick={handleReferencesCitationClick} claims={claims} />
    </Fragment>
  );
});

MarkdownTextActivity.displayName = 'MarkdownTextActivity';

export default MarkdownTextActivity;
