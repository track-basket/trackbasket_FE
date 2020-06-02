import React from 'react';
import ConfirmList from '../screens/ConfirmList';
import renderer from 'react-test-renderer';

test('renders correctly', async () => {
  const tree = renderer.create(<ConfirmList />).toJSON();
  expect(tree).toMatchSnapshot();
});
