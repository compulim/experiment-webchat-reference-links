import './Chat.css';

import { css } from '@emotion/css';
import { Components, createStore, hooks } from 'botframework-webchat';
import { memo, useEffect, useMemo, useState } from 'react';

// @ts-expect-error "createDirectLineEmulator" is not typed.
import createDirectLineEmulator from '../createDirectLineEmulator';
import TextAttachment from './external/component/Attachment/Text/TextAttachment';

import { type PropsOf } from '../types/PropsOf';
import { WebChatAttachment } from './external/component/Attachment/private/types/WebChatAttachment';
import ModalDialogComposer from './external/component/providers/ModalDialog/ModalDialogComposer';
import renderMarkdownAsHTML from './external/bundle/renderMarkdown/renderMarkdownAsHTML';

const { BasicWebChat, Composer } = Components;
const { useStyleOptions } = hooks;

type AttachmentMiddleware = PropsOf<typeof Composer>['attachmentMiddleware'];

type Props = {
  activity: unknown;
};

const _Chat = memo(function () {
  const [{ accent, markdownExternalLinkIconImage }] = useStyleOptions();

  const className = useMemo(
    () =>
      css({
        '--pva__accent-color': accent,
        '--pva__external-link-icon': markdownExternalLinkIconImage,
        '--pva__semantic-colors__link': accent
      }),
    [accent]
  );

  return <BasicWebChat className={className} />;
});

function isTextAttachment(
  attachment: WebChatAttachment
): attachment is WebChatAttachment & { contentType: `text/${string}` } {
  return attachment.contentType.startsWith('text/');
}

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

  const attachmentMiddleware = useMemo<AttachmentMiddleware>(() => {
    return () =>
      next =>
      (...args) => {
        if (!args?.[0]) {
          return next(...args);
        }

        const [
          {
            activity,
            activity: { from: { role = undefined } = {} } = {},
            attachment,
            attachment: { contentType = undefined, contentUrl = undefined, thumbnailUrl = undefined } = {}
          }
        ] = args;

        const isText = isTextAttachment(attachment);

        return (isText ? !attachment.content : role === 'user' && !thumbnailUrl) ? (
          next(...args)
        ) : /^audio\//u.test(contentType || '') ? (
          next(...args)
        ) : /^image\//u.test(contentType || '') ? (
          next(...args)
        ) : /^video\//u.test(contentType || '') ? (
          next(...args)
        ) : contentUrl || contentType === 'application/octet-stream' ? (
          next(...args)
        ) : isText ? (
          <TextAttachment activity={activity} attachment={attachment} />
        ) : (
          next(...args)
        );
      };
  }, []);

  return (
    <div className="chat">
      <Composer
        attachmentMiddleware={attachmentMiddleware}
        directLine={directLine}
        // TODO: Comment out "renderMarkdown" to see what's Web Chat today's behavior.
        renderMarkdown={renderMarkdownAsHTML}
        store={store}
      >
        <ModalDialogComposer>
          <_Chat />
        </ModalDialogComposer>
      </Composer>
    </div>
  );
});
