import ReactWebChat from 'botframework-webchat';

import Provenance from './private/Provenance';

import { Entity, isEntity } from '../../types/SchemaOrg/Entity';
import { isPerson, type Person } from '../../types/SchemaOrg/Person';

import { type ItemTypeOfArray } from '../../types/ItemTypeOfArray';
import { type PropsOf } from '../../types/PropsOf';
import { type WebChatActivity } from 'botframework-webchat-core';

type Props = PropsOf<typeof ReactWebChat>;
type ActivityStatusMiddleware = Exclude<Props['activityStatusMiddleware'], undefined>;
type WebChatEntity = ItemTypeOfArray<Exclude<WebChatActivity['entities'], undefined>>;

const provenanceActivityStatusMiddleware: ActivityStatusMiddleware =
  () =>
  next =>
  (...args) => {
    const original = next(...args);

    const [{ activity }] = args;
    const entities = (activity.entities || []) as Array<Entity | WebChatEntity>;

    const person = entities.find<Person>(
      (entity): entity is Person =>
        isEntity(entity) && isPerson(entity) && entity['@id'] === `x-direct-line-account-id:${activity.from.id}`
    );

    if (person) {
      return <Provenance person={person}>{original}</Provenance>;
    }

    return original;
  };

export default provenanceActivityStatusMiddleware;
