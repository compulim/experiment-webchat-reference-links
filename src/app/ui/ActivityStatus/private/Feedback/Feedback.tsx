import { Fragment, memo, type PropsWithChildren, useCallback, useState, useEffect, useRef } from 'react';

import FeedbackVoteButton from './Feedback.VoteButton';

import { type Vote } from './types/Vote';

type Props = PropsWithChildren<{
  downvoteTooltip?: string;
  upvoteTooltip?: string;
  votes: ReadonlySet<Vote>;
}>;

const DEBOUNCE_TIMEOUT = 500;

const Feedback = memo(({ downvoteTooltip, upvoteTooltip, votes }: Props) => {
  const [value, setValue] = useState<Vote>('initial');

  const handleChange = useCallback<(vote: Vote) => void>(
    nextVote => setValue(vote => (nextVote === vote ? 'initial' : nextVote)),
    [setValue]
  );

  const feedbackPayloadRef = useRef({});
  const postFeedback = console.log.bind(console);

  useEffect(() => {
    // In the future, we should handle when the user "uncheck" the vote (`vote === 'unset'`).
    if (value === 'downvote' || value === 'upvote') {
      const timeout = setTimeout(
        () =>
          postFeedback({
            ...feedbackPayloadRef.current,
            category: 'gptanswers',
            userResponse: value === 'downvote' ? 0 : 1
          }),
        DEBOUNCE_TIMEOUT
      );

      return () => clearTimeout(timeout);
    }
  }, [feedbackPayloadRef, postFeedback, value]);

  return (
    <Fragment>
      {Array.from(votes).map(vote => (
        <FeedbackVoteButton
          key={vote}
          onClick={handleChange}
          pressed={value === vote}
          title={vote === 'downvote' ? downvoteTooltip : vote === 'upvote' ? upvoteTooltip : undefined}
          vote={vote}
        />
      ))}
    </Fragment>
  );
});

Feedback.displayName = 'ActivityStatusFeedback';

export default Feedback;
