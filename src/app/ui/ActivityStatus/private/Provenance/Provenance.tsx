import './Provenance.css';

import { memo } from 'react';

import { type Person } from '../../../../types/SchemaOrg/Person';

type Props = { person: Person };

const Provenance = memo(({ person }: Props) =>
  person.url ? (
    <a
      className="webchat__provenance-activity-status webchat__provenance-activity-status--link"
      href={person.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {person.description || person.text}
    </a>
  ) : (
    <span className="webchat__provenance-activity-status">{person.description || person.text}</span>
  )
);

Provenance.displayName = 'Provenance';

export default Provenance;
