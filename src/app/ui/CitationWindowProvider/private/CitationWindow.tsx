import * as React from 'react';
import { css } from '@emotion/css';
import { FocusTrapZone } from '@fluentui/react/lib/FocusTrapZone';
import { hooks } from 'botframework-webchat';
import { sanitize } from 'dompurify';

import Dismiss16Regular from './Dismiss16Regular';

import './CitationWindow.css';

type Props = {
  text: string;
  title?: string;
  onClose: () => void;
};

const { useLocalizer, useRenderMarkdownAsHTML, useStyleOptions } = hooks;
const domParser = new DOMParser();

const CitationWindow = ({ text, title, onClose: handleClose }: Props) => {
  const [styleOptions] = useStyleOptions();
  const renderMarkdownAsHTML = useRenderMarkdownAsHTML();

  const citationWindowOverrides = React.useMemo(
    () =>
      css({
        '--pva__accent-color': styleOptions.accent,

        '--pva__external-link-icon': styleOptions.markdownExternalLinkIconImage
      }),
    [styleOptions.accent]
  );

  const localize = useLocalizer();

  const externalLinkAlt = localize('MARKDOWN_EXTERNAL_LINK_ALT');

  // return the DOM tree if parsing this string returns anything with a non-text HTML node in it, otherwise
  // parse it as Markdown into HTML and return that tree. Sanitizes the output in either case.
  function parseIntoHTML(text: string): HTMLElement {
    // DOMParser is safe; even if it finds potentially dangerous objects, it doesn't run them, just parses them.
    const parsedBody = domParser.parseFromString(text, 'text/html').body;
    // need to use the old-school syntax here for ES version reasons
    for (let i = 0; i < parsedBody.childNodes.length; i++) {
      const node = parsedBody.childNodes[i];
      if (node.nodeType !== Node.TEXT_NODE) {
        return sanitize(parsedBody, { RETURN_DOM: true });
      }
    }
    return sanitize(renderMarkdownAsHTML(text, undefined, { externalLinkAlt }), { RETURN_DOM: true });
  }

  function annotateLink(link: HTMLAnchorElement) {
    console.log(link);
    link.ariaLabel = link.ariaLabel ?? externalLinkAlt;
    link.rel = 'noopener noreferrer';
    link.target = '_blank';
    // other link manipulation here
  }

  const contents = parseIntoHTML(text);

  contents.querySelectorAll('a').forEach(annotateLink);

  return (
    <div className="mainWindow webchat__popover">
      <FocusTrapZone className="webchat__popover__box" firstFocusableTarget={'.closeBox'}>
        <span className="webchat__popover__header">
          <button
            aria-label={localize('KEYBOARD_HELP_CLOSE_BUTTON_ALT')}
            className="webchat__popover__close-button"
            onClick={handleClose}
          >
            <Dismiss16Regular />
          </button>
          {title && <h2 className="webchat__popover__title">{title}</h2>}
        </span>

        <span
          className={['contents', citationWindowOverrides].join(' ')}
          ref={ref => {
            contents.childNodes.forEach(node => ref?.appendChild(node));
          }}
        />
      </FocusTrapZone>
    </div>
  );
};

export default CitationWindow;
