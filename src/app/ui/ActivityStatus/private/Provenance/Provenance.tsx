import './Provenance.css';

import { memo } from 'react';

import { type Person } from '../../../../types/SchemaOrg/Person';

type Props = { person: Person };

const Provenance = memo(({ person }: Props) =>
  person.url ? (
    <a
      className="pva-web-chat__provenance pva-web-chat__provenance--link"
      href={person.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {person.description || person.text}
    </a>
  ) : (
    <span className="pva-web-chat__provenance">{person.description || person.text}</span>
  )
);

Provenance.displayName = 'Provenance';

export default Provenance;
