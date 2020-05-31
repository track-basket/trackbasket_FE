import React from 'react';
import AtRiskTabs from '../screens/AtRiskTabs';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<AtRiskTabs />).toJSON();
  expect(tree).toMatchSnapshot();
});
