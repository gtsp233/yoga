import React from 'react';
import { number, arrayOf, string, bool } from 'prop-types';
import styled, { css } from 'styled-components';

import activeDot from '../activeDot';
import Text from '../../Text';

const Dot = styled.div`
  ${({
    theme: {
      yoga: {
        components: { stepper },
      },
    },
  }) => css`
    width: 15px;
    height: 15px;

    border-radius: ${stepper.dot.radius}px;
  `}
`;

const Label = styled(Text.Bold)`
  ${({
    theme: {
      yoga: {
        components: { stepper },
      },
    },
  }) => css`
    width: 95px;

    font-size: ${stepper.label.font.size}px;

    transform: translateX(-50%);
  `}
`;

const DotWrapper = styled.div`
  ${({
    active,
    secondary,
    theme: {
      yoga: {
        components: { stepper },
      },
    },
  }) => {
    const state = secondary ? 'secondary' : 'active';

    return css`
      position: relative;
      width: 15px;

      text-align: center;

      ${Label} {
        position: absolute;
        left: 50%;
        top: 10px;

        color: ${active
          ? stepper.label.color[state]
          : stepper.label.color.inactive};
      }

      ${Dot} {
        position: absolute;
        top: -10px;

        background-color: ${active
          ? stepper.dot.backgroundColor[state]
          : stepper.dot.backgroundColor.inactive};
      }
    `;
  }}
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Dots({ activeStep, labels, secondary }) {
  return (
    <Wrapper>
      {labels.map((label, index) => (
        <DotWrapper
          active={activeDot(index, activeStep)}
          secondary={secondary}
          key={label}
        >
          <Dot />
          <Label as="span">{label}</Label>
        </DotWrapper>
      ))}
    </Wrapper>
  );
}

Dots.propTypes = {
  activeStep: number,
  labels: arrayOf(string),
  secondary: bool,
};

Dots.defaultProps = {
  activeStep: 0,
  labels: [],
  secondary: false,
};

export default Dots;
