import React from 'react';
import ChangeStatusModal from '../screens/ChangeStatusModal';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<ChangeStatusModal />).toJSON();
  expect(tree).toMatchSnapshot();
});
