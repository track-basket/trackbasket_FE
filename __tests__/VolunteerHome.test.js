import React from 'react';
import VolunteerHome from '../screens/VolunteerHome';
import renderer from 'react-test-renderer';

test('renders correctly', async () => {
  const tree = renderer
    .create(<VolunteerHome assignedLists={[false]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
