import './Item.css';

import { PropsWithChildren, memo } from 'react';

import Badge from './Badge';

type Props = PropsWithChildren<{
  badge?: string;
}>;

export default memo(function ReferenceBox({ badge, children }: Props) {
  return (
    <li className="pva__references__item">
      {badge && <Badge className="pva__references__item__badge" value={badge} />}
      {children}
    </li>
  );
});
