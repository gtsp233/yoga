import React, { forwardRef } from 'react';
import { func, node, oneOfType, bool, string } from 'prop-types';
import StyledButton from './StyledButton';

/** Buttons make common actions more obvious and help users more easily perform them. Buttons use labels and sometimes icons to communicate the action that will occur when the user touches them. */
const Button = forwardRef(
  (
    {
      children,
      onClick,
      full,
      disabled,
      inverted,
      small,
      secondary,
      icon: Icon,
      ...props
    },
    ref,
  ) => {
    const finalProps = {
      ...props,
    };

    if (props.href) {
      finalProps.as = 'a';
    }

    return (
      <StyledButton
        ref={ref}
        disabled={disabled}
        aria-disabled={disabled}
        full={full}
        inverted={inverted}
        onClick={onClick}
        small={small}
        secondary={secondary}
        {...finalProps}
      >
        {Icon && <Icon />}
        {children}
      </StyledButton>
    );
  },
);

Button.propTypes = {
  ariaLabel: string,
  children: node,
  disabled: bool,
  full: bool,
  inverted: bool,
  onClick: func,
  small: bool,
  secondary: bool,
  /** an Icon from yoga-icons package */
  icon: oneOfType([node, func]),
  href: string,
};

Button.defaultProps = {
  ariaLabel: undefined,
  children: 'Button',
  disabled: undefined,
  full: false,
  inverted: false,
  onClick: () => {},
  small: false,
  secondary: false,
  icon: undefined,
  href: undefined,
};

Button.displayName = 'Button';

export default Button;
