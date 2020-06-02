import React from 'react';
import VolunteerLoginModal from '../screens/VolunteerLoginModal';
import renderer from 'react-test-renderer';

test('renders correctly', async () => {
  const tree = renderer.create(<VolunteerLoginModal />).toJSON();
  expect(tree).toMatchSnapshot();
});
