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

const ThumbsButton = memo(({ direction, onClick, pressed, title }: Props) => (
  <button
    aria-pressed={pressed}
    className={classNames('pva-web-chat__thumbs-button', { 'pva-web-chat__thumbs-button--is-pressed': pressed })}
    onClick={onClick}
    title={title}
    type="button"
  >
    <ThumbButtonImage
      className={classNames('pva-web-chat__thumbs-button__image pva-web-chat__thumbs-button__image--is-down')}
      direction={direction}
    />
    <ThumbButtonImage
      className={classNames(
        'pva-web-chat__thumbs-button__image pva-web-chat__thumbs-button__image--is-down pva-web-chat__thumbs-button__image--is-filled'
      )}
      direction={direction}
      filled={true}
    />
  </button>
));

ThumbsButton.displayName = 'ThumbsButton';

export default ThumbsButton;
