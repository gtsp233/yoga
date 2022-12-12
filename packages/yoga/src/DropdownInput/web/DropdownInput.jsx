import React, { useRef, useState } from 'react';
import PropTypes, { bool } from 'prop-types';
import { theme, Box, Icon, Text } from '@gympass/yoga';
import styled, { css } from 'styled-components';
import { Check, ChevronUp, ChevronDown, Close } from '@gympass/yoga-icons';
import { display, flexes } from '@gympass/yoga-system';
import { useOnClickOutside } from '../../hooks';

const Wrapper = styled.div`
  ${({
    full,
    theme: {
      yoga: {
        components: { dropdowninput },
      },
    },
  }) => `
    position: relative;
    width: ${full ? '100%' : `${dropdowninput.width}px`};
  `}
`;

const Container = styled.div`
  ${display}
  ${flexes}
  border-radius: ${theme.radii.small}px;
  background: #fff;
  border: ${theme.borders.small}px solid #ccc;
  box-sizing: border-box;
  background: #fff;
  height: 52px;
  margin: ${theme.spacing.xxsmall}px 0 0;
  transition: all 0.1s ease-in-out;
  ${({ showDropDown }) =>
    showDropDown &&
    css`
      border-top: ${theme.borders.small}px solid #ccc;
      border-left: ${theme.borders.small}px solid #ccc;
      border-right: ${theme.borders.small}px solid #ccc;
      border-radius: ${theme.radii.small}px ${theme.radii.small}px 0px 0px;
      border-bottom: 0;
    `}
`;

const Clear = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: none;
  outline: none;
  padding: ${theme.spacing.medium}px;
`;

const Input = styled.input`
  background: none;
  border: none;
  color: ${theme.colors.text.primary};
  flex: 1;
  font-family: ${({ theme: { yoga } }) => yoga.baseFont.family};
  font-size: ${theme.fontSizes.small}px;
  font-style: normal;
  font-weight: ${theme.fontWeights.regular};
  height: 100%;
  letter-spacing: 0px;
  line-height: ${theme.lineHeights.small}px;
  outline: none;
  text-align: left;
  padding-left: ${theme.spacing.small}px;

  &::placeholder {
    color: ${theme.colors.text.secondary};
  }

  ${({ value }) =>
    value &&
    css`
      + ${Clear} {
        display: block;
      }
    `}
`;

const Divisor = styled.div`
  width: 1px;
  height: 28px;
  background: ${theme.colors.elements.lineAndBorders};
`;

const ContainerDropDown = styled.ul`
  margin: 0;
  height: 272px;
  width: ${props => `${props.width}px`};
  overflow-y: scroll;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  list-style: none;
  padding: 0 16px 0 16px;
  transition: all 0.1s ease-in-out;
  border-radius: 0px 0px ${theme.radii.small}px ${theme.radii.small}px;
  background: #fff;
  position: absolute;
  top: ${props => `${props.position}px`};
  z-index: 9999;
`;

const ButtonDropDown = styled.button`
  display: flex;
  align-items: center;
  width: auto;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  height: 100%;
`;

const ItemDropDown = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  height: 72px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;

  div {
    display: flex;
    align-items: center;
  }

  &:last-child {
    border: none;
  }
`;

const ContainerName = styled.div``;

const DropdownInput = ({
  full,
  placeholder,
  onClear,
  value,
  selectedCountry,
  onChangeSelectedCountry,
  countries,
  ...other
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const inputRef = useRef(null);
  const DropDownRef = useRef(null);
  const containerRef = useRef(null);

  const toggleShowDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  useOnClickOutside(DropDownRef, e => {
    if (e.target.id !== 'button-drop-down') {
      toggleShowDropDown();
    }
  });

  const changeSelectedCountry = selected => () => {
    onChangeSelectedCountry(selected);
    toggleShowDropDown();
    inputRef.current.focus();
  };

  const renderListCountries = () => {
    return countries.map(country => {
      const isCountrySelected = selectedCountry.id === country.id;

      return (
        <ItemDropDown key={country.id} onClick={changeSelectedCountry(country)}>
          <ContainerName>
            <Box>
              <Icon
                as={country.icon}
                width="medium"
                height="medium"
                marginRight={4}
              />
            </Box>
            <Text.Small
              fw={isCountrySelected ? 'medium' : 'regular'}
              color={isCountrySelected ? 'primary' : 'secondary'}
            >
              {country.name}
            </Text.Small>
          </ContainerName>
          {isCountrySelected && (
            <Icon as={Check} width="medium" height="medium" fill="vibin" />
          )}
        </ItemDropDown>
      );
    });
  };

  return (
    <Wrapper full={full}>
      <Container
        d="flex"
        alignItems="center"
        justifyContent="flex-start"
        ref={containerRef}
        showDropDown={showDropDown}
      >
        <ButtonDropDown
          id="button-drop-down"
          type="button"
          onClick={toggleShowDropDown}
        >
          <Box>
            <Icon
              marginRight={2}
              marginLeft={4}
              as={selectedCountry.icon}
              width="medium"
              height="medium"
            />
          </Box>
          <Icon
            as={showDropDown ? ChevronUp : ChevronDown}
            size="small"
            cursor="pointer"
            mr="xsmall"
            stroke="deep"
          />
          <Divisor />
        </ButtonDropDown>

        <Input
          data-testid="input"
          ref={inputRef}
          value={value}
          placeholder={placeholder}
          {...other}
        />

        <Clear onClick={onClear} type="button">
          <Icon as={Close} size="small" fill="medium" />
        </Clear>
      </Container>

      {showDropDown && (
        <ContainerDropDown
          ref={DropDownRef}
          position={containerRef.current.offsetTop + 50}
          width={containerRef.current.offsetWidth}
          data-testid="dropdown"
        >
          {renderListCountries()}
        </ContainerDropDown>
      )}
    </Wrapper>
  );
};

DropdownInput.propTypes = {
  full: bool,
  placeholder: PropTypes.string.isRequired,
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
    }),
  ).isRequired,
  onClear: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  selectedCountry: PropTypes.string.isRequired,
  onChangeSelectedCountry: PropTypes.func.isRequired,
};

DropdownInput.defaultProps = {
  full: false,
};

export default DropdownInput;
