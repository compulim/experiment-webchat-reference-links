import './ActivityInput.css';

import { ChangeEventHandler, memo, useCallback } from 'react';
import { useRefFrom } from 'use-ref-from';

type Props = {
  onChange: (value: string) => void;
  value: string;
};

export default memo(function ActivityInput({ onChange, value }: Props) {
  const onChangeRef = useRefFrom(onChange);

  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    ({ currentTarget: { value } }) => onChangeRef.current?.(value),
    [onChangeRef]
  );

  return (
    <textarea
      autoCapitalize="false"
      autoComplete="false"
      autoCorrect="false"
      className="activity-input"
      onChange={handleChange}
      spellCheck={false}
      value={value}
    />
  );
});
