import { Fragment, memo, type PropsWithChildren } from 'react';

type Entity = { type: string };

type Props = PropsWithChildren<{
  activity: {
    entities?: Array<Entity>;
  };
}>;

export default memo(function ActivityWithReferences({ activity: { entities }, children }: Props) {
  return (
    <Fragment>
      {children}
      <div>This is the reference footnote below activity {entities?.length}.</div>
    </Fragment>
  );
});
