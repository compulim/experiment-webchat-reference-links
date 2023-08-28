import { memo } from 'react';

type Reference = {
  id: string;
  text?: string;
  title: string;
  url?: string;
};

type Props = {
  references: ReadonlyArray<Reference>;
};

export default memo(({ references }: Props) => {
  return (
    <ul>
      {references.map(reference => (
        <li>
          <pre>{JSON.stringify(reference, null, 2)}</pre>
        </li>
      ))}
    </ul>
  );
});
