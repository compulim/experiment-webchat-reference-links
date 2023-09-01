import { css } from '@emotion/css';
import { FocusTrapZone } from '@fluentui/react/lib/FocusTrapZone';
import { hooks } from 'botframework-webchat';
import { useMemo } from 'react';

import Dismiss16Regular from './Dismiss16Regular';

import './CitationWindow.css';

type Props = {
  text: string;
  onClose: () => void;
};

const { useLocalizer, useRenderMarkdownAsHTML, useStyleOptions } = hooks;

const CitationWindow = ({ text, onClose: handleClose }: Props) => {
  const [styleOptions] = useStyleOptions();
  const renderMarkdownAsHTML = useRenderMarkdownAsHTML();

  const citationWindowOverrides = useMemo(
    () =>
      css({
        '--pva__accent-color': styleOptions.accent,
        '--pva__external-link-icon': styleOptions.markdownExternalLinkIconImage
      }),
    [styleOptions.accent]
  );

  const localize = useLocalizer();

  const externalLinkAlt = localize('MARKDOWN_EXTERNAL_LINK_ALT');

  return (
    <div className="mainWindow webchat__popover">
      <FocusTrapZone className="webchat__popover__box" firstFocusableTarget={'.closeBox'}>
        <button
          aria-label={'TODO: XXX close citation window XXX'}
          className="webchat__popover__close-button"
          onClick={handleClose}
        >
          <Dismiss16Regular />
        </button>
        <span
          className={['contents', citationWindowOverrides].join(' ')}
          dangerouslySetInnerHTML={{
            __html: renderMarkdownAsHTML(text ?? '', styleOptions, { externalLinkAlt })
          }}
        />
      </FocusTrapZone>
    </div>
  );
};

export default CitationWindow;
