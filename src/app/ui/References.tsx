import { memo } from 'react';

type Reference = {
  title: string;
  url: string;
};

type Props = {
  references: Array<Reference>;
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
