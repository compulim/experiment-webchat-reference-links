import { Fragment, memo, type PropsWithChildren } from 'react';

type Entity = { type: string };

type Props = PropsWithChildren<{
  activity: {
    entities?: Array<Entity>;
  };
}>;

export default memo(function AttachmentWithReferences({ activity: { entities }, children }: Props) {
  return (
    <Fragment>
      {children}
      <div>This is the reference footnote below attachment with {entities?.length} entities.</div>
      {entities && <pre>{JSON.stringify(entities, null, 2)}</pre>}
    </Fragment>
  );
});
