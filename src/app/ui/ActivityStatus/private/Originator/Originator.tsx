import './Originator.css';

import { memo } from 'react';

import { type Person } from '../../../../types/SchemaOrg/Person';

type Props = { person: Person };

const Originator = memo(({ person }: Props) =>
  person.url ? (
    <a
      className="webchat__originator-activity-status webchat__originator-activity-status--link"
      href={person.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {person.description || person.text}
    </a>
  ) : (
    <span className="webchat__originator-activity-status">{person.description || person.text}</span>
  )
);

Originator.displayName = 'Originator';

export default Originator;
