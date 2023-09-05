import './Originator.css';

import { memo } from 'react';

import { type ReplyAction } from '../../../../types/SchemaOrg/ReplyAction';

type Props = { replyAction: ReplyAction };

const Originator = memo(({ replyAction }: Props) => {
  const text = replyAction.description || replyAction.provider?.name;

  return replyAction.provider?.url ? (
    <a
      className="webchat__originator-activity-status webchat__originator-activity-status--link"
      href={replyAction.provider?.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {text}
    </a>
  ) : (
    <span className="webchat__originator-activity-status">{text}</span>
  );
});

Originator.displayName = 'Originator';

export default Originator;
