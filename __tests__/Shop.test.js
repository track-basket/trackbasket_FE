import React from 'react';
import Shop from '../screens/Shop';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Shop />).toJSON();
  expect(tree).toMatchSnapshot();
});
