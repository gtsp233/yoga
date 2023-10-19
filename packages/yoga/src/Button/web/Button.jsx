import React, { forwardRef } from 'react';
import { func, node, oneOfType, bool, string } from 'prop-types';
import styled from 'styled-components';
import StyledButton from './StyledButton';
import Spinner from '../../Spinner';

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
      isLoading,
      ...props
    },
    ref,
  ) => {
    const ContentContainer = styled.div`
      position: relative;

      & > span {
        color: transparent;
      }
    `;

    const SpinnerContainer = styled.div`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `;

    const finalProps = {
      ...props,
    };

    const renderLoading = () => {
      return (
        <ContentContainer>
          {Icon && <Icon />}
          <span>{children}</span>

          <SpinnerContainer>
            <Spinner color="deep" size={small ? 'small' : 'medium'} />
          </SpinnerContainer>
        </ContentContainer>
      );
    };

    if (props.href) {
      finalProps.as = 'a';
    }

    return (
      <StyledButton
        ref={ref}
        disabled={disabled || isLoading}
        aria-disabled={disabled}
        full={full}
        inverted={inverted}
        onClick={onClick}
        small={small}
        secondary={secondary}
        isLoading={isLoading}
        {...finalProps}
      >
        {isLoading ? (
          renderLoading()
        ) : (
          <>
            {Icon && <Icon />}
            <span>{children}</span>
          </>
        )}
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
  isLoading: bool,
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
  isLoading: false,
  onClick: () => {},
  small: false,
  secondary: false,
  icon: undefined,
  href: undefined,
};

Button.displayName = 'Button';

export default Button;
