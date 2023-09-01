import { memo } from 'react';

type Props = {
  value: string;
};

export default memo(function Badge({ value }: Props) {
  return <div className="webchat__link-definitions__badge">{value}</div>;
});
