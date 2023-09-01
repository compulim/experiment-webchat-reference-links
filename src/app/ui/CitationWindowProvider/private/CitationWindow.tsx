import { useMemo } from 'react';
import { hooks } from 'botframework-webchat';
import { css } from '@emotion/css';

import './CitationWindow.css';

type Props = {
  text: string;
  onClose: () => void;
};

const { useLocalizer, useRenderMarkdownAsHTML, useStyleOptions } = hooks;

const CitationWindow = ({ text, onClose }: Props) => {
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
    <div className="mainWindow">
      <button className="closeBox" onClick={onClose} tabIndex={0} aria-label={'close citation window'}>
        &times;
      </button>
      <span
        className={['contents', citationWindowOverrides].join(' ')}
        dangerouslySetInnerHTML={{
          __html: renderMarkdownAsHTML(text ?? '', styleOptions, { externalLinkAlt })
        }}
      />
    </div>
  );
};

export default CitationWindow;
