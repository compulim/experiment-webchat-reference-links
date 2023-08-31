import { Fragment, memo, type PropsWithChildren, useCallback, useState } from 'react';

import FeedbackDecoratorVoteButton from './FeedbackDecorator.VoteButton';

import { type Vote } from './types/Vote';

type Props = PropsWithChildren<{
  downvoteTooltip?: string;
  upvoteTooltip?: string;
  votes: ReadonlySet<Vote>;
}>;

const FeedbackDecorator = memo(({ downvoteTooltip, upvoteTooltip, votes }: Props) => {
  const [value, setValue] = useState<Vote>('initial');

  const handleChange = useCallback<(vote: Vote) => void>(
    nextVote => setValue(vote => (nextVote === vote ? 'initial' : nextVote)),
    [setValue]
  );

  return (
    <Fragment>
      {Array.from(votes).map(vote => (
        <FeedbackDecoratorVoteButton
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

FeedbackDecorator.displayName = 'FeedbackDecorator';

export default FeedbackDecorator;
