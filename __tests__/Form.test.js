import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import { TextField } from '../components/Form';

describe('text field tests', () => {
  test('renders the passed label', () => {
    const { getByText, queryByText } = render(<TextField label="Test label" />);
    expect(getByText('Test label')).not.toBeNull();
    expect(queryByText('Some other label')).toBeNull();
  });

  test('forwards props to textInput', () => {
    const onChangeTextMock = jest.fn();

    const { getByTestId } = render(
      <TextField
        label="Test label"
        passedProp="hello"
        onChangeText={onChangeTextMock}
      />,
    );
    expect(getByTestId('Form.TextInput').props).toEqual(
      expect.objectContaining({
        passedProp: 'hello',
      }),
    );
    fireEvent.changeText(getByTestId('Form.TextInput'), 'hi!');
    expect(onChangeTextMock).toHaveBeenCalled();
    expect(onChangeTextMock).toHaveBeenCalledWith('hi!');
    expect(onChangeTextMock).not.toHaveBeenCalledWith('another thing');
  });

  test('fires changeText function when text is changed', () => {
    const onChangeTextMock = jest.fn();

    const { getByTestId } = render(
      <TextField label="Test label" onChangeText={onChangeTextMock} />,
    );

    fireEvent.changeText(getByTestId('Form.TextInput'), 'hi!');
    expect(onChangeTextMock).toHaveBeenCalled();
    expect(onChangeTextMock).toHaveBeenCalledWith('hi!');
    expect(onChangeTextMock).not.toHaveBeenCalledWith('another thing');
  });
});
