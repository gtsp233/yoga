import React, { forwardRef } from 'react';
import styled, { withTheme } from 'styled-components';
import { node, number, arrayOf, bool, func, oneOfType } from 'prop-types';
import { hexToRgb } from '@gympass/yoga-common';

import { theme } from '../../Theme';
import Icon from '../../Icon';

import Counter from './Counter';

const Text = styled.span`
  display: inline-block;
  box-sizing: border-box;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Wrapper = styled.button`
  height: 32px;
  max-width: 216px;

  display: flex;
  align-items: center;
  box-sizing: border-box;

  border-style: solid;

  cursor: pointer;

  ${({ selected, ...props }) => {
    const {
      spacing,
      borders,
      colors,
      radii,
      baseFont,
      fontSizes,
      fontWeights,
      lineHeights,
    } = theme(props);

    const commonStyles = `

      padding: ${spacing.xxsmall}px;

      border-radius: ${radii.small}px;
      border-width: ${borders.small}px;

      font-family: ${baseFont.family};
      font-size: ${fontSizes.xsmall}px;
      line-height: ${lineHeights.xsmall}px;

      :not(:last-child) {
        margin-right: ${spacing.xxsmall}px;
      }

      &[disabled] {
        background-color: ${colors.elements.backgroundAndDisabled};
        color: ${colors.elements.selectionAndIcons};

        border-color: ${colors.elements.lineAndBorders};

        cursor: not-allowed;
      }

      svg {
        flex-shrink: 0;
      }
    `;

    if (selected) {
      return `
        ${commonStyles}

        background-color: ${colors.yoga};
        color: ${colors.primary};

        border-color: transparent;

        font-weight: ${fontWeights.medium};

        &:hover:enabled {
          border-color: ${colors.primary};
        }
      `;
    }

    return `
      ${commonStyles}

      border-color: ${colors.elements.lineAndBorders};

      background-color: ${colors.white};
      color: ${colors.secondary};

      font-weight: ${fontWeights.regular};

      &:hover:enabled {
        border-color: ${colors.secondary};
      }

      &:focus:enabled,
      &:active:enabled {
        border-color: ${hexToRgb(colors.elements.lineAndBorders, 0.75)};
      }
    `;
  }}
`;

const Chips = forwardRef(
  (
    {
      children,
      selected,
      counter,
      icons,
      disabled,
      onToggle,
      onClick = onToggle,
      theme: {
        yoga: { spacing },
      },
      ...props
    },
    ref,
  ) => {
    const [FirstIcon, SecondIcon] = icons;

    return (
      <Wrapper
        selected={selected}
        disabled={disabled}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        {SecondIcon && (
          <Icon
            as={SecondIcon}
            fill={selected ? 'primary' : 'secondary'}
            width="small"
            height="small"
            style={{
              marginRight: children ? spacing.xxxsmall : undefined,
            }}
          />
        )}
        {children && <Text>{children}</Text>}
        {selected && counter && !disabled && <Counter value={counter} />}
        {FirstIcon && (
          <Icon
            as={FirstIcon}
            fill={selected ? 'primary' : 'secondary'}
            width="small"
            height="small"
            style={{
              marginLeft: children ? spacing.xxxsmall : undefined,
            }}
          />
        )}
      </Wrapper>
    );
  },
);

Chips.propTypes = {
  /** text to be displayed */
  children: node,
  /** if the chip is selected */
  selected: bool,
  /** will display a three digit number, if the value is greater than 999 a plus
   * sign will be displayed instead. ex: "+999" */
  counter: number,
  /** disable chip */
  disabled: bool,
  /** a list of max two icons from @gympass/yoga-icons package */
  icons: arrayOf(oneOfType([node, func])),
  /** click event */
  onToggle: func,
  onClick: func,
};

Chips.defaultProps = {
  children: undefined,
  selected: false,
  disabled: false,
  counter: undefined,
  icons: [],
  onToggle: undefined,
  onClick: undefined,
};

export default withTheme(Chips);
