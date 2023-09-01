import './SlottedActivityStatus.css';

import { Children, Fragment, memo, type PropsWithChildren } from 'react';
import classNames from 'classnames';

type Props = PropsWithChildren<{
  className?: string;
}>;

const SlottedActivityStatus = memo(({ children, className }: Props) => (
  <span className={classNames('webchat__slotted-activity-status', className)}>
    {Children.map(children, (child, index) =>
      index ? (
        <Fragment>
          {'|'}
          {child}
        </Fragment>
      ) : (
        child
      )
    )}
  </span>
));

SlottedActivityStatus.displayName = 'SlottedActivityStatus';

export default SlottedActivityStatus;
