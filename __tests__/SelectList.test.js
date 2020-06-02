import React from 'react';
import SelectList from '../screens/SelectList';
import renderer from 'react-test-renderer';

test('renders correctly', async () => {
  const tree = renderer.create(<SelectList />).toJSON();
  expect(tree).toMatchSnapshot();
});
