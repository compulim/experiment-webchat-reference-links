import ReactWebChat from 'botframework-webchat';

import ActivityStatus from './activityStatusMiddleware.UI';

import { type PropsOf } from '../../types/PropsOf';

type WebChatProps = PropsOf<typeof ReactWebChat>;
type ActivityStatusMiddleware = Exclude<WebChatProps['activityStatusMiddleware'], undefined>;

const createActivityStatusMiddleware: () => ActivityStatusMiddleware =
  () =>
  () =>
  next =>
  (...args) => {
    const [{ activity }] = args;
    const original = next(...args);

    return <ActivityStatus activity={activity}>{original}</ActivityStatus>;
  };

export default createActivityStatusMiddleware;
