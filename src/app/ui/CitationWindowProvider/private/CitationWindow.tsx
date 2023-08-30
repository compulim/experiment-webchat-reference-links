import './CitationWindow.css';

type Props = {
  text: string;
  onClose: () => void;
};

const CitationWindow = ({ text, onClose }: Props) => {
  return (
    <div className="mainWindow">
      <button className="closeBox" onClick={onClose} tabIndex={0}>
        &times;
      </button>
      <span className="contents">{text}</span>
    </div>
  );
};

export default CitationWindow;
