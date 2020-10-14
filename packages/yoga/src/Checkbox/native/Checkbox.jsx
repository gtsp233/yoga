import React, { useState } from 'react';
import { bool, func, string, shape } from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { TouchableWithoutFeedback, View } from 'react-native';
import { hexToRgb } from '@gympass/yoga-common';
import { Done } from '@gympass/yoga-icons';

import Text from '../../Text';

const CheckboxWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Label = styled(Text.Regular)(
  ({
    theme: {
      yoga: {
        components: { checkbox },
      },
    },
  }) => `
  padding-left: ${checkbox.label.padding.left}px;

  font-size: ${checkbox.label.font.size}px;

  color: ${checkbox.label.font.color};
`,
);

const HelperWrapper = styled.View(
  ({
    theme: {
      yoga: {
        components: { checkbox },
      },
    },
  }) => `
  margin-top: ${checkbox.helper.margin.top}px;
`,
);

const Helper = styled(Text.Regular)(
  ({
    error,
    theme: {
      yoga: {
        colors: { feedback },
        components: { checkbox },
      },
    },
  }) => `
  font-size: ${checkbox.helper.font.size}px;

  color: ${error ? feedback.attention[1] : checkbox.helper.font.color};
`,
);

const CheckBackground = styled.View(
  ({
    checked,
    disabled,
    error,
    theme: {
      yoga: {
        colors: { primary, feedback },
        components: { checkbox },
      },
    },
  }) => `
    position: absolute;

    width: ${checkbox.size}px;
    height: ${checkbox.size}px;

    border-radius: ${checkbox.border.radius}px;
    border-width: ${checkbox.border.width}px;
    border-style: solid;

    ${checked ? `background-color: ${primary};` : ''}

    border-color: ${disabled ? checkbox.disabled.border.color : primary};

    ${
      disabled && checked
        ? `background-color: ${checkbox.disabled.backgroundColor};`
        : ''
    }

    ${error ? `border-color: ${feedback.attention[1]};` : ''}

    ${error && checked ? `background-color: ${feedback.attention[1]};` : ''}
  `,
);

const Shadow = styled.View(
  ({
    theme: {
      yoga: {
        colors: { elements },
        components: { checkbox },
      },
    },
  }) => {
    const size = checkbox.size * 1.67;

    return `
      width: ${size}px;
      height: ${size}px;

      background-color: ${hexToRgb(elements.lineAndBorders, 0.75)};
      border-radius: ${checkbox.hover.border.radius}px;
    `;
  },
);

const CheckArea = styled.View(
  ({
    theme: {
      yoga: {
        components: { checkbox },
      },
    },
  }) => `
  justify-content: center;
  align-items: center;

  width: ${checkbox.size}px;
  height: ${checkbox.size}px;
`,
);

/** The checkbox component is used when the user needs to select one or more
 * items on a task. This component can also allow the user to turn an option on
 * or off.  */
const Checkbox = ({
  label,
  helper,
  disabled,
  checked,
  error,
  style,
  onPressIn,
  onPressOut,
  theme: {
    yoga: {
      components: { checkbox },
    },
  },
  ...rest
}) => {
  const [pressed, setPressed] = useState(false);
  return (
    <View>
      <TouchableWithoutFeedback
        {...rest}
        disabled={disabled}
        onPressIn={e => {
          setPressed(true);
          onPressIn(e);
        }}
        onPressOut={e => {
          setPressed(false);
          onPressOut(e);
        }}
      >
        <CheckboxWrapper style={style}>
          <CheckArea>
            {pressed && !disabled && <Shadow pressed={pressed} />}
            <CheckBackground
              {...{
                disabled,
                checked,
                error,
                pressed,
              }}
            />
            {checked && (
              <Done
                fill={checkbox.checked.icon.color}
                style={{ position: 'absolute' }}
              />
            )}
          </CheckArea>

          {label && <Label>{label}</Label>}
        </CheckboxWrapper>
      </TouchableWithoutFeedback>
      {(helper || error) && (
        <HelperWrapper>
          <Helper error={error}>{error || helper}</Helper>
        </HelperWrapper>
      )}
    </View>
  );
};

Checkbox.propTypes = {
  label: string,
  /** set a short helper text under checkbox */
  helper: string,
  checked: bool,
  disabled: bool,
  error: string,
  style: shape({}),
  onPressIn: func,
  onPressOut: func,
};

Checkbox.defaultProps = {
  label: undefined,
  helper: undefined,
  checked: false,
  disabled: false,
  error: undefined,
  style: {},
  onPressIn: () => {},
  onPressOut: () => {},
};

Checkbox.displayName = 'Checkbox';

export default withTheme(Checkbox);
