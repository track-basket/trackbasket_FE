import React from 'react';
import VolunteerShop from '../screens/VolunteerShop';
import renderer from 'react-test-renderer';

test('renders correctly', async () => {
  const tree = renderer.create(<VolunteerShop />).toJSON();
  expect(tree).toMatchSnapshot();
});
