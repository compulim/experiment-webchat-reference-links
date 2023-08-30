import './Badge.css';

import { memo } from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
  value: string;
};

export default memo(function Badge({ className, value }: Props) {
  return <div className={classNames('pva__references__badge', className)}>{value}</div>;
});
