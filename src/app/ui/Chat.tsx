import './Chat.css';

import { memo, useEffect, useMemo, useState } from 'react';
import ReactWebChat, { createStore } from 'botframework-webchat';

// import ActivityWithReferences from './ActivityWithReferences';
// @ts-expect-error 7016
import createDirectLineEmulator from '../createDirectLineEmulator';

import { type PropsOf } from '../types/PropsOf';
import AttachmentWithReferences from './AttachmentWithReferences';

// type ActivityMiddleware = PropsOf<typeof ReactWebChat>['activityMiddleware'];
type AttachmentMiddleware = PropsOf<typeof ReactWebChat>['attachmentMiddleware'];

type Props = {
  activity: unknown;
};

export default memo(function Chat({ activity }: Props) {
  const [ready, setReady] = useState(false);
  const store = useMemo(
    () =>
      // @ts-expect-error 7016
      createStore({}, () => next => action => {
        if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
          setReady(true);
        }

        return next(action);
      }),
    [setReady]
  );

  const { directLine } = useMemo(() => createDirectLineEmulator({ store }), [store]);

  useEffect(() => {
    activity && ready && directLine.emulateIncomingActivity(activity);
  }, [activity, directLine, ready]);

  // const activityMiddleware = useMemo<ActivityMiddleware>(() => {
  //   return () =>
  //     next =>
  //     (...args) => {
  //       const [{ activity }] = args;

  //       const original = next(...args);

  //       if (activity.type === 'message') {
  //         return (renderAttachment, props) => (
  //           <ActivityWithReferences activity={activity}>
  //             {original && original(renderAttachment, props)}
  //           </ActivityWithReferences>
  //         );
  //       }

  //       return original;
  //     };
  // }, []);

  const attachmentMiddleware = useMemo<AttachmentMiddleware>(() => {
    return () =>
      next =>
      (...args) => {
        const original = next(...args);

        const activity = args[0]?.activity;

        if (activity?.type === 'message') {
          return <AttachmentWithReferences activity={activity}>{original}</AttachmentWithReferences>;
        }

        return original;
      };
  }, []);

  return (
    <div className="chat">
      <ReactWebChat
        // activityMiddleware={activityMiddleware}
        attachmentMiddleware={attachmentMiddleware}
        directLine={directLine}
        store={store}
      />
    </div>
  );
});
