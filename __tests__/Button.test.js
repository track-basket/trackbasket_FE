import React from 'react';

import { Button } from '../components/Button';
import { render, fireEvent } from 'react-native-testing-library';

test('can press a button', () => {
  const onPressMock = jest.fn();
  const { getByText } = render(<Button text="Testing" onPress={onPressMock} />);
  fireEvent.press(getByText('Testing'));
  expect(onPressMock).toHaveBeenCalled();
  fireEvent.press(getByText('Testing'));
  expect(onPressMock.mock.calls.length).toBe(2);
});
