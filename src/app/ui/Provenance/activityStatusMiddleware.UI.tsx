import { memo, type PropsWithChildren, type ReactNode, useMemo } from 'react';

import { type WebChatActivity } from 'botframework-webchat-core';

import { isEntity, type Entity } from '../../types/SchemaOrg/Entity';
import { isPerson, type Person } from '../../types/SchemaOrg/Person';

import FeedbackDecorator from './private/FeedbackDecorator';
import Provenance from './private/Provenance';
import SlottedActivityStatus from './private/SlottedActivityStatus';

import { type ItemTypeOfArray } from '../../types/ItemTypeOfArray';
import { isVoteAction, type VoteAction } from '../../types/SchemaOrg/VoteAction';

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
  const entities = (activity.entities || []) as Array<Entity | WebChatEntity>;

  const person = entities.find<Person>(
    (entity): entity is Person =>
      isEntity(entity) && isPerson(entity) && entity['@id'] === `ms-bf-channel-account-id:${activity.from.id}`
  );

  const votes = useMemo(
    () =>
      Object.freeze(
        new Set(
          entities
            .filter<DownvoteAction | UpvoteAction>(
              (entity): entity is DownvoteAction | UpvoteAction =>
                isEntity(entity) && isVoteAction(entity) && (isDownvoteAction(entity) || isUpvoteAction(entity))
            )
            .map(({ actionOption }) => actionOption)
        )
      ),
    [entities]
  );

  return (
    <SlottedActivityStatus>
      {children}
      {useMemo<ReactNode[]>(
        () =>
          [person && <Provenance person={person} />, votes.size && <FeedbackDecorator votes={votes} />].filter(Boolean),
        [person, votes]
      )}
    </SlottedActivityStatus>
  );
});

ActivityStatus.displayName = 'ActivityStatus';

export default ActivityStatus;
