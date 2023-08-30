import './Provenance.css';

import { memo, type PropsWithChildren } from 'react';

import { type Person } from '../../../types/SchemaOrg/Person';

type Props = PropsWithChildren<{ person: Person }>;

export default memo(function Provenance({ children, person }: Props) {
  console.log(person);

  return (
    <div className="pva-web-chat__provenance">
      <div>{children}</div>
      <div className="pva-web-chat__provenance__stamp">
        &nbsp;|&nbsp;
        {person.url ? (
          <a
            className="pva-web-chat__provenance__body pva-web-chat__provenance__body--link"
            href={person.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {person.description || person.text}
          </a>
        ) : (
          <span className="pva-web-chat__provenance__body">{person.description || person.text}</span>
        )}
      </div>
    </div>
  );
});
