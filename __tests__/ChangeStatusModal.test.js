import React from 'react';
import ChangeStatusModal from '../screens/ChangeStatusModal';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <ChangeStatusModal
        item={jest.fn()}
        route={{ params: jest.fn() }}
        navigation={{ goBack: jest.fn() }}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
