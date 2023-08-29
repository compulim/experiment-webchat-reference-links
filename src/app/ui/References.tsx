import './References.css';

import { memo } from 'react';

type Reference = {
  id: string;
  text?: string;
  title?: string;
  url?: string;
};

type Props = {
  references: ReadonlyArray<Reference>;
};

export default memo(({ references }: Props) => {
  return (
    <ul>
      {references.map(reference => (
        <li className='outerBox'>
          <span className='innerBox'>{reference.id}</span>
          <span className='link'>
            {
              reference.url ? <a target="_blank" rel="noopener noreferrer" href={reference.url}>{reference.title}</a> : <button>{reference.title}</button>
            }
          </span>
        </li>
      ))}
    </ul>
  );
});
