/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */

import { memo } from 'react';

import {
  ThumbDislike16Filled,
  ThumbDislike16Regular,
  ThumbLike16Filled,
  ThumbLike16Regular
} from '@fluentui/react-icons';

type Props = {
  className?: string;
  direction: 'down' | 'up';
  filled?: boolean;
};

const ThumbImage = memo(({ className, direction, filled = false }: Props) =>
  direction === 'down' ? (
    filled ? (
      <ThumbDislike16Filled className={className} />
    ) : (
      <ThumbDislike16Regular className={className} />
    )
  ) : filled ? (
    <ThumbLike16Filled className={className} />
  ) : (
    <ThumbLike16Regular className={className} />
  )
);

ThumbImage.displayName = 'ThumbImage';

export default ThumbImage;
