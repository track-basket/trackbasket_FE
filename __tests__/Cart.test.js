import React from 'react';
import Cart from '../screens/Cart';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Cart />).toJSON();
  expect(tree).toMatchSnapshot();
});
