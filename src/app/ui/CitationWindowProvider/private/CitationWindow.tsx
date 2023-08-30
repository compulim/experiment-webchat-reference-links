import './CitationWindow.css';

type Props = {
  text: string;
  onClose: () => void;
};

const CitationWindow = ({ text, onClose }: Props) => {
  return (
    <div className="mainWindow">
      <button className="closeBox" onClick={onClose}>
        &times;
      </button>
      <span className="contents">{text}</span>
    </div>
  );
};

export default CitationWindow;
