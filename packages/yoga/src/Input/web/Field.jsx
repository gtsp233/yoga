import styled, { css } from 'styled-components';

const ICON_SIZE = 20;

const labelTransition = css`
  ${({
    theme: {
      yoga: {
        transition,
        components: { input },
      },
    },
  }) => `
    transform: translateY(-${input.height / 2 - 2}px);
    transition-property: transform, font-size, color;
    transition-duration: ${transition.duration[1]}ms;
    transition-timing-function: cubic-bezier(${transition.timing[0].join()});

    font-size: ${input.label.font.size.typed}px;
  `}
`;

const Field = styled.input`
  width: 100%;

  appearance: none;
  background-color: transparent;
  outline: none;

  position: absolute;
  bottom: 0;
  left: 0;

  border: none;
  box-sizing: border-box;

  ${({
    cleanable,
    error,
    value,
    theme: {
      yoga: {
        transition,
        colors,
        baseFont,
        components: { input },
      },
    },
  }) => css`
    height: ${input.height}px;
    padding-top: ${input.padding.top}px;
    padding-right: ${cleanable
      ? ICON_SIZE + input.padding.right * 2
      : input.padding.right}px;
    padding-bottom: ${input.padding.bottom}px;
    padding-left: ${input.padding.left}px;

    color: ${input.font.color.focus};
    font-family: ${baseFont.family}, sans-serif;
    font-size: ${input.font.size}px;
    font-weight: ${input.font.weight};

    &:focus {
      color: ${input.font.color.focus};

      & ~ legend {
        max-width: max-content;
        transition-property: max-width;
        transition-duration: ${transition.duration[1]}ms;
      }

      & ~ label {
        ${labelTransition}

        font-weight: ${input.label.font.weight};
        color: ${error
          ? `${colors.feedback.attention[1]}`
          : `${colors.text.primary}`};
      }
    }

    &:disabled {
      cursor: not-allowed;
      color: ${colors.text.disabled};
    }

    &::placeholder {
      color: ${input.label.color.default};
    }

    ${value &&
    css`
      & ~ legend {
        max-width: max-content;
      }

      & ~ label {
        color: ${error ? `${colors.feedback.attention[1]}` : ''};
        ${labelTransition}
      }
    `}
  `}

  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    display: none;
  }

  &:invalid {
    box-shadow: none;
  }
`;

export default Field;
