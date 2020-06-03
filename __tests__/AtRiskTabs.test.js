import React from 'react';
import AtRiskTabs from '../screens/AtRiskTabs';
import renderer from 'react-test-renderer';
import { NavigationContainer } from '@react-navigation/native';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <NavigationContainer>
        <AtRiskTabs />
      </NavigationContainer>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
