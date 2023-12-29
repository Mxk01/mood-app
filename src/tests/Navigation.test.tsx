import React from 'react'
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import Navigation from '../navigation/Navigation';
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
      push: jest.fn(),
    }),
  }));
  
  describe('Navigation', () => {
    it('renders correctly', () => {
      const tree = renderer.create(<Navigation />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });