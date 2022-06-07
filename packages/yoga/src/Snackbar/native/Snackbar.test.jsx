import React, { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import * as RN from 'react-native';

import { CheckedFull } from '@gympass/yoga-icons';
import { ThemeProvider, Snackbar } from '../..';
import { Button } from '../../Card/web/PlanCard/Actions';

RN.Animated.timing = jest.fn().mockReturnValue({
  start: jest.fn(),
});

const Component = overrideProps => {
  const snackbarRef = useRef();

  return (
    <ThemeProvider>
      <Button
        onPress={() => {
          snackbarRef.current.open();
        }}
      >
        Tap to open snackbar
      </Button>
      <Snackbar
        ref={snackbarRef}
        message="Feedback Message"
        {...overrideProps}
      />
    </ThemeProvider>
  );
};

describe('<Snackbar />', () => {
  it('should match snapshot when snackbar is default', () => {
    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when have an icon and action', () => {
    const overrideProps = {
      icon: CheckedFull,
      actionLabel: 'Action',
      onAction: () => {},
    };

    const { container } = render(<Component {...overrideProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when have a long text', () => {
    const overrideProps = {
      message: 'Lorem Ipsum is simply dummy text of the printing and types.',
      icon: CheckedFull,
      actionLabel: 'Action',
      onAction: () => {},
    };

    const { container } = render(<Component {...overrideProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when have a variant informative or attention prop', () => {
    const overrideProps = {
      variant: 'informative',
    };

    const { container } = render(<Component {...overrideProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should show and hide snackbar when the open and close Animation function is called', () => {
    const overrideProps = {
      onSnackbarClose: jest.fn(),
      actionLabel: 'Action',
      onAction: jest.fn(),
    };

    const { getByText } = render(<Component {...overrideProps} />);

    fireEvent.press(getByText('Tap to open snackbar'));

    expect(RN.Animated.timing.mock.calls[0][1]).toMatchObject({
      toValue: 1,
      duration: 225,
      useNativeDriver: true,
    });

    fireEvent.press(getByText('Action'));

    expect(RN.Animated.timing.mock.calls[1][1]).toMatchObject({
      toValue: 0,
      duration: 195,
      useNativeDriver: true,
    });
  });
});
