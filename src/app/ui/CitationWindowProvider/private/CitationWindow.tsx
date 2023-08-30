import { hooks } from 'botframework-webchat';

import renderMarkdownAsHTML from '../../private/renderMarkdownAsHTML';

import './CitationWindow.css';

type Props = {
  text: string;
  onClose: () => void;
};

const { useLocalizer, useStyleOptions } = hooks;

const CitationWindow = ({ text, onClose }: Props) => {
  const [styleOptions] = useStyleOptions();
  const localize = useLocalizer();

  const externalLinkAlt = localize('MARKDOWN_EXTERNAL_LINK_ALT');

  return (
    <div className="mainWindow">
      <button className="closeBox" onClick={onClose} tabIndex={0}>
        &times;
      </button>
      <span
        className="contents"
        dangerouslySetInnerHTML={{
          __html: renderMarkdownAsHTML(text || '', styleOptions, { externalLinkAlt })
        }}
      />
    </div>
  );
};

export default CitationWindow;
