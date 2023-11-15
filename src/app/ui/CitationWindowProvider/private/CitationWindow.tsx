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

    const icon = document.createElement('img');
    icon.className = 'webchat__render-markdown__external-link-icon externalLinkIcon';
    icon.ariaLabel = link.ariaLabel ?? externalLinkAlt;
    icon.width = 12;
    icon.src =
      'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIzIDMgMTggMTgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcuMjUwMSA0LjUwMDE3SDEwLjc0OTVDMTEuMTYzNyA0LjUwMDE3IDExLjQ5OTUgNC44MzU5NiAxMS40OTk1IDUuMjUwMTdDMTEuNDk5NSA1LjYyOTg2IDExLjIxNzMgNS45NDM2NiAxMC44NTEzIDUuOTkzMzJMMTAuNzQ5NSA2LjAwMDE3SDcuMjQ5NzRDNi4wNzA3OSA1Ljk5OTYxIDUuMTAzNDkgNi45MDY1NiA1LjAwNzg2IDguMDYxMTJMNS4wMDAyOCA4LjIyMDAzTDUuMDAzMTIgMTYuNzUwN0M1LjAwMzQzIDE3Ljk0MTUgNS45Mjg4NSAxOC45MTYxIDcuMDk5NjYgMTguOTk0OUw3LjI1MzcxIDE5LjAwMDFMMTUuNzUxOCAxOC45ODg0QzE2Ljk0MTUgMTguOTg2OCAxNy45MTQ1IDE4LjA2MiAxNy45OTM1IDE2Ljg5MjNMMTcuOTk4NyAxNi43Mzg0VjEzLjIzMjFDMTcuOTk4NyAxMi44MTc5IDE4LjMzNDUgMTIuNDgyMSAxOC43NDg3IDEyLjQ4MjFDMTkuMTI4NCAxMi40ODIxIDE5LjQ0MjIgMTIuNzY0MyAxOS40OTE4IDEzLjEzMDNMMTkuNDk4NyAxMy4yMzIxVjE2LjczODRDMTkuNDk4NyAxOC43NDA3IDE3LjkyOTMgMjAuMzc2OSAxNS45NTI4IDIwLjQ4MjlMMTUuNzUzOCAyMC40ODg0TDcuMjU4MjcgMjAuNTAwMUw3LjA1NDk1IDIwLjQ5NDlDNS4xNDIzOSAyMC4zOTU0IDMuNjA4OTUgMTguODYyNyAzLjUwODM3IDE2Ljk1MDJMMy41MDMxMiAxNi43NTExTDMuNTAwODkgOC4yNTI3TDMuNTA1MjkgOC4wNTAyQzMuNjA1MzkgNi4xMzc0OSA1LjEzODY3IDQuNjA0NDkgNy4wNTA5NiA0LjUwNTI3TDcuMjUwMSA0LjUwMDE3SDEwLjc0OTVINy4yNTAxWk0xMy43NDgxIDMuMDAxNDZMMjAuMzAxOCAzLjAwMTk3TDIwLjQwMTQgMy4wMTU3NUwyMC41MDIyIDMuMDQzOTNMMjAuNTU5IDMuMDY4MDNDMjAuNjEyMiAzLjA5MTIyIDIwLjY2MzQgMy4xMjE2MyAyMC43MTExIDMuMTU4ODVMMjAuNzgwNCAzLjIyMTU2TDIwLjg2NDEgMy4zMjAxNEwyMC45MTgzIDMuNDEwMjVMMjAuOTU3IDMuNTAwNTdMMjAuOTc2MiAzLjU2NDc2TDIwLjk4OTggMy42Mjg2MkwyMC45OTkyIDMuNzIyODJMMjAuOTk5NyAxMC4yNTU0QzIwLjk5OTcgMTAuNjY5NiAyMC42NjM5IDExLjAwNTQgMjAuMjQ5NyAxMS4wMDU0QzE5Ljg3IDExLjAwNTQgMTkuNTU2MiAxMC43MjMyIDE5LjUwNjUgMTAuMzU3MUwxOS40OTk3IDEwLjI1NTRMMTkuNDk4OSA1LjU2MTQ3TDEyLjI3OTcgMTIuNzg0N0MxMi4wMTM0IDEzLjA1MSAxMS41OTY4IDEzLjA3NTMgMTEuMzAzMSAxMi44NTc1TDExLjIxOSAxMi43ODQ5QzEwLjk1MjcgMTIuNTE4NyAxMC45Mjg0IDEyLjEwMjEgMTEuMTQ2MiAxMS44MDg0TDExLjIxODggMTEuNzI0M0wxOC40MzY5IDQuNTAxNDZIMTMuNzQ4MUMxMy4zNjg0IDQuNTAxNDYgMTMuMDU0NiA0LjIxOTMxIDEzLjAwNSAzLjg1MzI0TDEyLjk5ODEgMy43NTE0NkMxMi45OTgxIDMuMzcxNzcgMTMuMjgwMyAzLjA1Nzk3IDEzLjY0NjQgMy4wMDgzMUwxMy43NDgxIDMuMDAxNDZaIiBmaWxsPSIjMjEyMTIxIiAvPjwvc3ZnPg==';
    link.rel = 'noopener noreferrer';
    link.target = '_blank';

    link.appendChild(icon);
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
