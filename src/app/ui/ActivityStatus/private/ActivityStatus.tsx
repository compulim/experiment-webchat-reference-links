import { memo, type PropsWithChildren, type ReactNode, useMemo } from 'react';

import { type WebChatActivity } from 'botframework-webchat-core';

import { isReplyAction, type ReplyAction } from '../../../types/SchemaOrg/ReplyAction';
import { isThing, type Thing } from '../../../types/SchemaOrg/Thing';

import Feedback from './Feedback/Feedback';
import Originator from './Originator/Originator';
import SlottedActivityStatus from './SlottedActivityStatus';

import { type ItemTypeOfArray } from '../../../types/ItemTypeOfArray';
import { isVoteAction, type VoteAction } from '../../../types/SchemaOrg/VoteAction';

type WebChatEntity = ItemTypeOfArray<Exclude<WebChatActivity['entities'], undefined>>;

type DownvoteAction = VoteAction & { actionOption: 'downvote' };
type UpvoteAction = VoteAction & { actionOption: 'upvote' };

function isDownvoteAction(voteAction: VoteAction): voteAction is DownvoteAction {
  return voteAction.actionOption === 'downvote';
}

function isUpvoteAction(voteAction: VoteAction): voteAction is UpvoteAction {
  return voteAction.actionOption === 'upvote';
}

type Props = PropsWithChildren<{ activity: WebChatActivity }>;

const ActivityStatus = memo(({ activity, children }: Props) => {
  const entities = (activity.entities || []) as Array<Thing | WebChatEntity>;

  const replyAction = entities.find<ReplyAction>(
    (entity): entity is ReplyAction => isThing(entity) && isReplyAction(entity)
  );

  const votes = useMemo(
    () =>
      Object.freeze(
        new Set(
          entities
            .filter<DownvoteAction | UpvoteAction>(
              (entity): entity is DownvoteAction | UpvoteAction =>
                isThing(entity) && isVoteAction(entity) && (isDownvoteAction(entity) || isUpvoteAction(entity))
            )
            .map(({ actionOption }) => actionOption)
        )
      ),
    [entities]
  );

  // TODO: add localized labels for tooltips

  return (
    <SlottedActivityStatus>
      {children}
      {useMemo<ReactNode[]>(
        () =>
          [
            replyAction && <Originator replyAction={replyAction} />,
            votes.size && <Feedback votes={votes} downvoteTooltip={'Downvote'} upvoteTooltip={'Upvote'} />
          ].filter(Boolean),
        [replyAction, votes]
      )}
    </SlottedActivityStatus>
  );
});

ActivityStatus.displayName = 'ActivityStatus';

export default ActivityStatus;
