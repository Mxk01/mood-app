import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Home from '../screens/Home'
test('renders Home component', () => {
  const { getByText, getByTestId } = render(<Home />);
  
  // Check if the component renders correctly
  expect(getByText('HELLO Testing hsit')).toBeTruthy();

  // Check if the LottieView components are rendered
  expect(getByTestId('penguinLottie')).toBeTruthy();
  expect(getByTestId('astronautLottie')).toBeTruthy();
});

test('changes page on button press', () => {
  const { getByTestId } = render(<Home />);

  // Check if the initial page is 0
  expect(getByTestId('paginationDot-0')).toHaveStyle({ backgroundColor: '#e74c3c' });
  expect(getByTestId('paginationDot-1')).toHaveStyle({ backgroundColor: 'lightgray' });

  // Simulate button press to change the page
  fireEvent.press(getByTestId('paginationDot-1'));

  // Check if the page has changed
  expect(getByTestId('paginationDot-0')).toHaveStyle({ backgroundColor: 'lightgray' });
  expect(getByTestId('paginationDot-1')).toHaveStyle({ backgroundColor: '#e74c3c' });
});

test('renders Login component', () => {
  const { getByTestId } = render(<Home />);

  // Check if the Login component is rendered
  expect(getByTestId('loginComponent')).toBeTruthy();
});
