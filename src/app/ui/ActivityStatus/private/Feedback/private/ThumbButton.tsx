/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */

import './ThumbButton.css';

import { memo } from 'react';
import classNames from 'classnames';

import ThumbButtonImage from './ThumbButton.Image';

type Props = {
  direction: 'down' | 'up';
  onClick?: () => void;
  pressed?: boolean;
  title?: string;
};

const ThumbButton = memo(({ direction, onClick, pressed, title }: Props) => (
  <button
    aria-pressed={pressed}
    className={classNames('webchat__thumb-button', { 'webchat__thumb-button--is-pressed': pressed })}
    onClick={onClick}
    title={title}
    aria-label={title}
    type="button"
  >
    <ThumbButtonImage
      className={classNames('webchat__thumb-button__image webchat__thumb-button__image--is-down')}
      direction={direction}
    />
    <ThumbButtonImage
      className={classNames(
        'webchat__thumb-button__image webchat__thumb-button__image--is-down webchat__thumb-button__image--is-filled'
      )}
      direction={direction}
      filled={true}
    />
  </button>
));

ThumbButton.displayName = 'ThumbButton';

export default ThumbButton;
